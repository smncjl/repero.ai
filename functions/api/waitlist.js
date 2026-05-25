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

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function responseRedirect(language, request) {
  const target = language === 'fr' ? '/fr/liste-attente?submitted=1' : '/en/waitlist?submitted=1';
  return Response.redirect(new URL(target, request.url), 303);
}

async function signEmailWorkerRequest(secret, timestamp, body) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${body}`));
  return toHex(signature);
}

async function notifyEmailWorker(env, payload) {
  if (!env.EMAIL_WORKER_URL) {
    return;
  }

  if (!env.EMAIL_WORKER_SECRET) {
    console.warn('[waitlist] EMAIL_WORKER_URL is set but EMAIL_WORKER_SECRET is missing');
    return;
  }

  const body = JSON.stringify({
    waitlistEntryId: payload.id,
    email: payload.email,
    language: payload.language,
    profile: payload.profile,
    intendedUse: payload.intendedUse,
    message: payload.message,
    sourcePage: payload.sourcePage
  });
  const timestamp = String(Date.now());
  const signature = await signEmailWorkerRequest(env.EMAIL_WORKER_SECRET, timestamp, body);

  const response = await fetch(env.EMAIL_WORKER_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-email-worker-signature': signature,
      'x-email-worker-timestamp': timestamp
    },
    body
  });

  if (!response.ok) {
    throw new Error(`Email worker returned ${response.status}`);
  }
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

  if (inserted && env.EMAIL_WORKER_URL) {
    const sendConfirmation = notifyEmailWorker(env, payload).catch((error) => {
      console.error('[waitlist] confirmation email failed', error);
    });

    if (context.waitUntil) {
      context.waitUntil(sendConfirmation);
    } else {
      await sendConfirmation;
    }
  }

  return responseRedirect(language, request);
}
