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
      'Muhammad Hamza - Software Engineer from Peshawar, Pakistan. Developer of HED Ranking System and Quizior, and Co-Founder at Solvia Codes.',
  },
  about: {
    title: 'About Muhammad Hamza | Software Engineer, Peshawar',
    description:
      'Learn about Muhammad Hamza — Software Engineer from Peshawar, Pakistan, specializing in Python, FastAPI, AI/ML, and full-stack web development.',
  },
  skills: {
    title: 'Skills | Muhammad Hamza — Software Engineer & AI Developer',
    description:
      'Technologies and skills of Muhammad Hamza: Python, FastAPI, React, Next.js, PostgreSQL, Kotlin, automation, and practical AI integration.',
  },
  projects: {
    title: 'Projects by Muhammad Hamza | HED Ranking, AiVerse & Quizior',
    description:
      'Explore Muhammad Hamza\'s work, including the HED College Ranking System, AiVerse, Quizior, and other software and AI projects.',
  },
  contact: {
    title: 'Contact Muhammad Hamza | Software Engineer, Peshawar',
    description:
      'Get in touch with Muhammad Hamza — Software Engineer from Peshawar, Pakistan. Available for freelance work and collaboration.',
  },
  faq: {
    title: 'FAQ | Muhammad Hamza — Software Engineer & AI Developer',
    description:
      'Answers to frequently asked questions about Muhammad Hamza — creator of Quizior, Software Engineer from Peshawar, Pakistan. Available for freelance work globally.',
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
