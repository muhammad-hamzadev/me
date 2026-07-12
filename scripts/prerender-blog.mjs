import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const POSTS_DIR = path.join(__dirname, '..', 'src', 'posts');

function prerender() {
  console.log('🚀 Prerendering Blog Pages for 200 OK Crawler & SEO Compatibility...');

  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found! Run vite build first.');
    return;
  }
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');

  // 1. Create dist/blog/index.html
  const blogDir = path.join(DIST_DIR, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  fs.writeFileSync(path.join(blogDir, 'index.html'), indexHtml, 'utf-8');
  console.log('✅ Prerendered dist/blog/index.html');

  // 2. Read slugs from src/posts and create dist/blog/[slug]/index.html
  if (!fs.existsSync(POSTS_DIR)) return;
  const files = fs.readdirSync(POSTS_DIR);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const fileContent = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const match = fileContent.match(/slug:\s*["']?([^"'\r\n]+)["']?/);
      if (match && match[1]) {
        const slug = match[1].trim();
        const postDir = path.join(blogDir, slug);
        if (!fs.existsSync(postDir)) {
          fs.mkdirSync(postDir, { recursive: true });
        }
        fs.writeFileSync(path.join(postDir, 'index.html'), indexHtml, 'utf-8');
        console.log(`✅ Prerendered dist/blog/${slug}/index.html`);
      }
    }
  });
}

prerender();
