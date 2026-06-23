export function GET() {
  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Comment ca marche | Repero AI</title>
    <link rel="canonical" href="https://repero.ai/fr/comment-ca-marche" />
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <main>
      <h1>Comment ca marche</h1>
      <p>Centraliser le travail dans un projet</p>
      <p>Retrouver documents, web et artefacts</p>
    </main>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
