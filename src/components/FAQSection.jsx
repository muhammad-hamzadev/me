import { motion as Motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { useState } from 'react';

const faqs = [
  {
    id: 'faq-opportunities',
    question: 'What kind of opportunities are you open to?',
    answer:
      "I'm open to software engineering roles, internships, and selected freelance or contract work. My best fit is full-stack web development, Python backend work, or a product that uses AI in a practical way.",
  },
  {
    id: 'faq-work',
    question: 'What do you usually build?',
    answer:
      'Most of my recent work has been web platforms for education and public-sector teams. That includes the HED college ranking system, AiVerse for an IELTS academy, and Quizior for running and evaluating quizzes.',
  },
  {
    id: 'faq-skills',
    question: 'Which technologies do you work with?',
    answer:
      'For web work, I mainly use React or Next.js on the frontend and Python, FastAPI, Flask, or PHP on the backend. I work with PostgreSQL, MySQL, and SQLite, and I also have experience with Kotlin, Firebase, testing, automation, and AI integrations.',
  },
  {
    id: 'faq-real-projects',
    question: 'Have you worked on real-world projects?',
    answer:
      'Yes. I built a QAC-based ranking system for the Higher Education Department, Government of Khyber Pakhtunkhwa, and developed AiVerse for an IELTS academy. I also work on Quizior as its main developer.',
  },
  {
    id: 'faq-existing-code',
    question: 'Can you work with an existing codebase?',
    answer:
      "Yes. I can pick up an existing project, understand how it is structured, fix issues, and add features without rewriting everything. I prefer to first understand the current setup and the reason behind the requested change.",
  },
  {
    id: 'faq-location',
    question: 'Where are you based, and do you work remotely?',
    answer:
      "I'm based in Peshawar, Pakistan, and I'm open to remote opportunities. If a role needs on-site or hybrid work, we can discuss the location and timing.",
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      aria-label="Frequently Asked Questions about Muhammad Hamza"
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <Motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Frequently Asked{' '}
            <span className="text-brand-600 dark:text-brand-400">Questions</span>
          </h2>
          <p className="text-secondary">
            Short answers to a few things employers and clients usually want to know.
          </p>
        </Motion.div>

        {/* FAQ Items */}
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-3"
        >
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <Motion.div
                key={faq.id}
                variants={staggerItem}
                className="glass rounded-xl overflow-hidden border border-transparent hover:border-brand-500/20 transition-all"
              >
                <button
                  id={faq.id}
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-answer`}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className="font-semibold text-primary group-hover:text-brand-500 transition-colors">
                    {faq.question}
                  </span>
                  {/* Chevron */}
                  <svg
                    className={`w-5 h-5 text-brand-500 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Answer Panel */}
                <div
                  id={`${faq.id}-answer`}
                  role="region"
                  aria-labelledby={faq.id}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              </Motion.div>
            );
          })}
        </Motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
