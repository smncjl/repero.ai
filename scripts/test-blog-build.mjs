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
const rssFeed = readFile('fr/rss.xml');
const sitemap = readFile('sitemap.xml');

assertIncludes(blogIndex, 'Le blog Repero AI', 'blog index title');
assertIncludes(blogIndex, 'ChatGPT, Claude et les autres', 'blog index post listing');

assertIncludes(articlePage, 'ChatGPT, Claude et les autres', 'article title');
assertIncludes(articlePage, 'application/ld+json', 'article structured data');
assertIncludes(articlePage, 'article:published_time', 'article published time metadata');
assertIncludes(articlePage, 'Retour au blog', 'article back link');

assertIncludes(rssFeed, '<rss', 'rss root');
assertIncludes(rssFeed, '<title>Repero AI Blog (FR)</title>', 'rss title');
assertIncludes(rssFeed, 'chatgpt-claude-conversations-bordel', 'rss item slug');

assertIncludes(sitemap, '/fr/blog', 'sitemap blog index');
assertIncludes(sitemap, '/fr/blog/chatgpt-claude-conversations-bordel', 'sitemap article');

console.log('Blog build output assertions passed.');
