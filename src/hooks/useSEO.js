import { useEffect } from 'react';

/**
 * useSEO — Dynamic title & meta description per scroll section.
 *
 * Uses IntersectionObserver to detect which section is currently most
 * visible and updates document.title + meta description accordingly.
 * This gives each "page" of the SPA its own unique SEO metadata.
 */

const SEO_CONFIG = {
  home: {
    title: 'Muhammad Hamza | Software Engineer & AI Developer | Peshawar, Pakistan',
    description:
      'Muhammad Hamza — Software Engineer from Peshawar, Pakistan. Main Developer of Quizior, Co-Founder at Solvia Codes, Co-Lead at Nexior. Specializing in Python/FastAPI and AI/ML.',
  },
  about: {
    title: 'About Muhammad Hamza | Software Engineer, Peshawar',
    description:
      'Learn about Muhammad Hamza — Software Engineer from Peshawar, Pakistan, specializing in Python, FastAPI, AI/ML, and full-stack web development.',
  },
  skills: {
    title: 'Skills | Muhammad Hamza — Software Engineer & AI Developer',
    description:
      'Technologies and skills of Muhammad Hamza: Python, FastAPI, React, web scraping, test automation, AI/ML, and more.',
  },
  projects: {
    title: 'Projects by Muhammad Hamza | Quizior, AI & More',
    description:
      'Explore projects by Muhammad Hamza including Quizior (AI-powered exam evaluation platform), AI UI/UX Feedback System, Terminal Chatbot, and more.',
  },
  contact: {
    title: 'Contact Muhammad Hamza | Software Engineer, Peshawar',
    description:
      'Get in touch with Muhammad Hamza — Software Engineer from Peshawar, Pakistan. Available for freelance work and collaboration.',
  },
};

/**
 * Updates the <meta name="description"> tag content.
 * @param {string} description
 */
function updateMetaDescription(description) {
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }
}

/**
 * useSEO hook — call once in App.jsx to activate dynamic SEO.
 */
export default function useSEO() {
  useEffect(() => {
    const sectionIds = Object.keys(SEO_CONFIG);
    const observers = [];

    // Track which section has the largest intersection ratio
    const ratios = {};
    sectionIds.forEach((id) => { ratios[id] = 0; });

    let activeSection = 'home';

    const updateSEO = () => {
      // Find the section with the highest intersection ratio
      const best = sectionIds.reduce((prev, cur) =>
        ratios[cur] > ratios[prev] ? cur : prev
      , 'home');

      if (best !== activeSection) {
        activeSection = best;
        const config = SEO_CONFIG[activeSection];
        document.title = config.title;
        updateMetaDescription(config.description);
      }
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratios[id] = entry.intersectionRatio;
          });
          updateSEO();
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
          rootMargin: '-64px 0px 0px 0px', // account for fixed navbar height
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Set initial SEO on mount
    document.title = SEO_CONFIG.home.title;
    updateMetaDescription(SEO_CONFIG.home.description);

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);
}
