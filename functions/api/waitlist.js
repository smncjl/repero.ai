const TABLE_SQL = `
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL,
  profile TEXT NOT NULL,
  intended_use TEXT NOT NULL,
  message TEXT,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

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

export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();
  const email = normalizeEmail(formData.get('email'));
  const language = text(formData.get('language')) === 'fr' ? 'fr' : 'en';
  const profile = text(formData.get('profile'));
  const intendedUse = text(formData.get('intendedUse'));
  const message = text(formData.get('message'));

  if (!email || !profile || !intendedUse) {
    return new Response('Missing required fields.', { status: 400 });
  }

  await env.DB.exec(TABLE_SQL);

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

  return responseRedirect(language, request);
}
