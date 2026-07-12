import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import useSEO from './hooks/useSEO';
import { getCurrentPath, subscribeToPath } from './utils/history';

function App() {
  useSEO();
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const unsubscribe = subscribeToPath((path) => {
      setCurrentPath(path);
    });
    return unsubscribe;
  }, []);

  const renderContent = () => {
    let normalizedPath = currentPath;
    if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    if (normalizedPath === '/blog') {
      return <BlogList />;
    }
    if (normalizedPath.startsWith('/blog/')) {
      const slug = normalizedPath.substring(6);
      return <BlogPost slug={slug} />;
    }
    return (
      <>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
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
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
