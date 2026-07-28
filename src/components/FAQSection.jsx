import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { useState } from 'react';

const faqs = [
  {
    id: 'faq-who-is',
    question: 'Who is Muhammad Hamza?',
    answer:
      'Muhammad Hamza is a Software Engineer and AI Developer from Peshawar, Pakistan. He is the Main Developer of Quizior (quizior.live), an AI-powered exam and quiz evaluation platform. He is also the Co-Founder of Solvia Codes and Co-Lead of Nexior. He studied at City University of Science and Information Technology (CUSIT), Peshawar.',
  },
  {
    id: 'faq-quizior',
    question: 'What is Quizior and who built it?',
    answer:
      'Quizior (quizior.live) is an AI-powered exam and quiz evaluation platform built by Muhammad Hamza. It features real-time invigilation, AI-based subjective grading using Google Gemini and Groq APIs, multi-tenant architecture, and advanced anti-cheating measures including tab-switch detection and fullscreen enforcement.',
  },
  {
    id: 'faq-skills',
    question: 'What technologies does Muhammad Hamza specialize in?',
    answer:
      'Muhammad Hamza primarily works with Python (FastAPI, Flask) for backend, React & Vite for frontend, and AI APIs from Google Gemini and Groq. He also builds native Android apps using Kotlin, Java, and Android Studio. Additionally, he specializes in web scraping (Selenium, BeautifulSoup), test automation (PyTest, Katalon, BrowserStack), and multi-agent AI system design.',
  },
  {
    id: 'faq-freelance',
    question: 'Is Muhammad Hamza available for freelance or contract work?',
    answer:
      'Yes. Muhammad Hamza is open to freelance and contract engagements in software engineering, Python backend, AI/ML integration, and web development. You can reach him via the contact section on this site or at hamza@hamzax.me.',
  },
  {
    id: 'faq-ai-projects',
    question: 'What AI projects has Muhammad Hamza built?',
    answer:
      'Muhammad Hamza has built: Quizior (AI-powered exam platform using Gemini & Groq), an AI UI/UX Feedback System featuring 6 specialized AI agents powered by Gemini 2.5 Flash, a Terminal Chatbot supporting multiple LLM providers (Gemini, DeepSeek, Grok), and JARVIS — a personal AI assistant with a React frontend.',
  },
  {
    id: 'faq-location',
    question: 'Where is Muhammad Hamza located?',
    answer:
      'Muhammad Hamza is based in Peshawar, Khyber Pakhtunkhwa, Pakistan. He is available for remote work globally.',
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions about Muhammad Hamza"
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
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
            Common questions about Muhammad Hamza, his work, and how to collaborate.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-3"
        >
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
