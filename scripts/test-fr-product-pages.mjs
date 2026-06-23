import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function readExpectedFile(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing expected build artifact: ${path}`);
  }

  return readFileSync(path, 'utf8');
}

function assertIncludes(content, needle, label) {
  if (!content.includes(needle)) {
    throw new Error(`Missing "${needle}" in ${label}`);
  }
}

const distDir = join(process.cwd(), 'dist');
const frHomePath = join(distDir, 'fr.html');
const howItWorksPath = join(distDir, 'fr', 'comment-ca-marche.html');

const frHome = readExpectedFile(frHomePath);
const howItWorks = readExpectedFile(howItWorksPath);

assertIncludes(frHome, 'Retrouvez vos artefacts sans perdre le contexte', 'fr homepage');
assertIncludes(frHome, '/fr/comment-ca-marche', 'fr homepage');
assertIncludes(howItWorks, 'Comment ca marche', 'fr how-it-works page');
assertIncludes(howItWorks, 'Centraliser le travail dans un projet', 'fr how-it-works page');
assertIncludes(howItWorks, 'Retrouver documents, web et artefacts', 'fr how-it-works page');

console.log('French homepage and how-it-works build artifacts look valid.');
