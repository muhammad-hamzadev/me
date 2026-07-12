import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useSEO from './hooks/useSEO';

function App() {
  useSEO();
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-main transition-theme overflow-x-hidden">
        <Navbar />
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
