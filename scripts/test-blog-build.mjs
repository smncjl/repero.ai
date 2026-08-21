import fs from 'node:fs';
import path from 'node:path';

function readFile(relativePath) {
  const filePath = path.join(process.cwd(), 'dist', relativePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing build artifact: dist/${relativePath}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}

function assertIncludes(content, expected, label) {
  if (!content.includes(expected)) {
    throw new Error(`Expected ${label} to include: ${expected}`);
  }
}

const blogIndex = readFile('fr/blog.html');
const articlePage = readFile('fr/blog/chatgpt-claude-conversations-bordel.html');
const societyArticlePage = readFile('fr/blog/faut-il-avoir-peur-ia.html');
const rssFeed = readFile('fr/rss.xml');
const sitemap = readFile('sitemap.xml');
const englishBlogIndex = readFile('en/blog.html');
const englishArticlePage = readFile('en/blog/should-we-be-afraid-of-ai.html');

assertIncludes(blogIndex, 'Le blog Repero AI', 'blog index title');
assertIncludes(blogIndex, 'ChatGPT, Claude et les autres', 'blog index post listing');
assertIncludes(blogIndex, 'Faut-il avoir peur de l’IA', 'society article blog index listing');

assertIncludes(articlePage, 'ChatGPT, Claude et les autres', 'article title');
assertIncludes(articlePage, 'application/ld+json', 'article structured data');
assertIncludes(articlePage, 'article:published_time', 'article published time metadata');
assertIncludes(articlePage, 'Retour au blog', 'article back link');
assertIncludes(societyArticlePage, 'Le progrès technique ne garantit pas le progrès social', 'society article content');
assertIncludes(societyArticlePage, 'Société et IA', 'society article category');

assertIncludes(rssFeed, '<rss', 'rss root');
assertIncludes(rssFeed, '<title>Repero AI Blog (FR)</title>', 'rss title');
assertIncludes(rssFeed, 'chatgpt-claude-conversations-bordel', 'rss item slug');

assertIncludes(sitemap, '/fr/blog', 'sitemap blog index');
assertIncludes(sitemap, '/fr/blog/chatgpt-claude-conversations-bordel', 'sitemap article');
assertIncludes(sitemap, '/fr/blog/faut-il-avoir-peur-ia', 'sitemap society article');
assertIncludes(englishBlogIndex, 'The Repero AI blog', 'English blog index title');
assertIncludes(englishBlogIndex, 'Translated and adapted from French by AI.', 'English blog translation notice');
assertIncludes(englishArticlePage, 'Why I remain enthusiastic', 'English article content');
assertIncludes(englishArticlePage, 'hreflang="fr"', 'English article French alternate');
assertIncludes(sitemap, '/en/blog/should-we-be-afraid-of-ai', 'sitemap English article');

console.log('Blog build output assertions passed.');
