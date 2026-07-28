import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to inline built CSS directly into HTML <style> tag to eliminate render-blocking CSS network requests
function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    transformIndexHtml(html, ctx) {
      if (!ctx || !ctx.bundle) return html;
      let newHtml = html;
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          const cssContent = chunk.source;
          const linkRegex = new RegExp(`<link[^>]*href=["'][^"']*${fileName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}["'][^>]*>`, 'g');
          newHtml = newHtml.replace(linkRegex, `<style>${cssContent}</style>`);
        }
      }
      return newHtml;
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  base: '/',
  build: {
    target: 'es2020',
    esbuild: {
      drop: ['console', 'debugger']
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('marked')) return 'vendor-marked';
            return 'vendor';
          }
        }
      }
    }
  }
})
