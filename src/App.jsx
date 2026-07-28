import { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DeferredSection from './components/DeferredSection';
import useSEO from './hooks/useSEO';
import { getCurrentPath, subscribeToPath } from './utils/history';

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
        <DeferredSection id="about" minHeight="500px">
          <About />
        </DeferredSection>
        <DeferredSection id="skills" minHeight="600px">
          <Skills />
        </DeferredSection>
        <DeferredSection id="projects" minHeight="600px">
          <Projects />
        </DeferredSection>
        <DeferredSection id="contact" minHeight="500px">
          <Contact />
        </DeferredSection>
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
        <DeferredSection minHeight="200px">
          <Footer />
        </DeferredSection>
      </div>
    </ThemeProvider>
  );
}

export default App;
