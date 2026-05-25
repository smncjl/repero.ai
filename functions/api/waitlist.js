const TABLE_SQL = 'CREATE TABLE IF NOT EXISTS "waitlist_entries" ("id" TEXT PRIMARY KEY, "email" TEXT NOT NULL UNIQUE, "language" TEXT NOT NULL, "profile" TEXT NOT NULL, "intended_use" TEXT NOT NULL, "message" TEXT, "source_page" TEXT, "status" TEXT NOT NULL DEFAULT \'new\', "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);';

async function ensureWaitlistTable(env) {
  try {
    await env.DB.prepare(TABLE_SQL).run();
  } catch (error) {
    console.error('[waitlist] failed to ensure schema', error);
    throw new Error('Failed to initialize waitlist storage.');
  }
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function text(value) {
  return String(value || '').trim();
}

function responseRedirect(language, request) {
  const target = language === 'fr' ? '/fr/liste-attente?submitted=1' : '/en/waitlist?submitted=1';
  return Response.redirect(new URL(target, request.url), 303);
}

function emailSubject(language) {
  return language === 'fr' ? 'Confirmation de votre inscription Repero AI' : 'Repero AI waitlist confirmation';
}

function emailHtml(language) {
  if (language === 'fr') {
    return `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; color: #0f172a; line-height: 1.6">
        <h1 style="margin: 0 0 12px; font-size: 24px;">Confirmation de votre inscription.</h1>
        <p style="margin: 0 0 12px;">Nous avons bien reçu votre inscription à Repero AI.</p>
        <p style="margin: 0 0 12px;">Nous allons revenir vers vous dès que nous ouvrirons les prochains accès.</p>
        <p style="margin: 0; color: #475569;">Repero AI</p>
      </div>
    `;
  }

  return `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; color: #0f172a; line-height: 1.6">
      <h1 style="margin: 0 0 12px; font-size: 24px;">Waitlist confirmation.</h1>
      <p style="margin: 0 0 12px;">We’ve received your Repero AI signup.</p>
      <p style="margin: 0 0 12px;">We’ll be in touch when the next spots open.</p>
      <p style="margin: 0; color: #475569;">Repero AI</p>
    </div>
  `;
}

function emailText(language) {
  if (language === 'fr') {
    return [
      'Merci, vous êtes sur la liste d’attente.',
      'Nous avons bien reçu votre inscription à Repero AI.',
      'Nous reviendrons vers vous dès que nous ouvrirons les prochains accès.',
      'Repero AI'
    ].join('\n\n');
  }

  return [
    'Thanks, you’re on the waitlist.',
    'We’ve received your Repero AI signup.',
    'We’ll be in touch when the next spots open.',
    'Repero AI'
  ].join('\n\n');
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();
  const email = normalizeEmail(formData.get('email'));
  const language = text(formData.get('language')) === 'fr' ? 'fr' : 'en';
  const profile = text(formData.get('profile'));
  const intendedUse = text(formData.get('intendedUse'));
  const message = text(formData.get('message'));
  const website = text(formData.get('website'));

  if (website) {
    return responseRedirect(language, request);
  }

  if (!email || !profile || !intendedUse) {
    return new Response('Missing required fields.', { status: 400 });
  }

  if (!env.DB) {
    console.error('[waitlist] missing DB binding');
    return new Response('Waitlist storage is not configured.', { status: 500 });
  }

  await ensureWaitlistTable(env);

  const payload = {
    id: crypto.randomUUID(),
    email,
    language,
    profile,
    intendedUse,
    message,
    sourcePage: request.headers.get('referer') || ''
  };

  const result = await env.DB.prepare(
    `INSERT OR IGNORE INTO waitlist_entries
      (id, email, language, profile, intended_use, message, source_page)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
  )
    .bind(payload.id, payload.email, payload.language, payload.profile, payload.intendedUse, payload.message || null, payload.sourcePage)
    .run();

  const inserted = Number(result?.meta?.changes || 0) > 0;

  if (inserted && env.WAITLIST_QUEUE && context.waitUntil) {
    context.waitUntil(env.WAITLIST_QUEUE.send(JSON.stringify(payload)));
  }

  if (inserted && env.EMAIL && env.WAITLIST_FROM_EMAIL) {
    const sendConfirmation = env.EMAIL.send({
      to: email,
      from: env.WAITLIST_FROM_EMAIL,
      subject: emailSubject(language),
      html: emailHtml(language),
      text: emailText(language)
    });

    if (context.waitUntil) {
      context.waitUntil(sendConfirmation.catch((error) => {
        console.error('[waitlist] confirmation email failed', error);
      }));
    } else {
      await sendConfirmation.catch((error) => {
        console.error('[waitlist] confirmation email failed', error);
      });
    }
  }

  return responseRedirect(language, request);
}
