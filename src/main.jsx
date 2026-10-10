import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.onerror = function(message, source, lineno, colno, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding: 20px; color: red;">
      <h1>Runtime Error</h1>
      <p>${message}</p>
      <p>Source: ${source}:${lineno}:${colno}</p>
      <pre>${error ? error.stack : ''}</pre>
    </div>`;
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Restore a directly opened section URL after the SPA and any static-host redirect have settled.
const restoreInitialSection = () => {
  const sectionId = window.location.pathname.replace(/^\//, '');
  if (!['home', 'about', 'skills', 'projects', 'faq', 'contact'].includes(sectionId)) return;

  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior: 'auto', block: 'start' });
  if (sectionId !== 'home') {
    window.scrollBy({ top: -72, behavior: 'auto' });
  }
};

[300, 900, 1600].forEach((delay) => {
  window.setTimeout(restoreInitialSection, delay);
});
