import { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import useSEO from './hooks/useSEO';
import { getCurrentPath, subscribeToPath } from './utils/history';

// Lazy-load non-critical components to keep initial fold hyper-fast on mobile
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const BlogList = lazy(() => import('./components/BlogList'));
const BlogPost = lazy(() => import('./components/BlogPost'));

function App() {
  useSEO();
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const unsubscribe = subscribeToPath((path) => {
      setCurrentPath(path);
      // Track page views in Google Analytics on SPA path transitions
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-WYXP48MVQ4', {
          page_path: path
        });
      }
    });
    return unsubscribe;
  }, []);

  // Preload non-critical section chunks in background idle time for 100% Desktop performance score
  useEffect(() => {
    const timer = setTimeout(() => {
      import('./components/About');
      import('./components/Skills');
      import('./components/Projects');
      import('./components/Contact');
      import('./components/Footer');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    let normalizedPath = currentPath;
    if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    if (normalizedPath === '/blog') {
      return (
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-primary font-medium">Loading...</div>}>
          <BlogList />
        </Suspense>
      );
    }
    if (normalizedPath.startsWith('/blog/')) {
      const slug = normalizedPath.substring(6);
      return (
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-primary font-medium">Loading...</div>}>
          <BlogPost slug={slug} />
        </Suspense>
      );
    }
    return (
      <>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </>
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-main transition-theme overflow-x-hidden">
        <Navbar />
        <main className="overflow-x-hidden">
          {renderContent()}
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
