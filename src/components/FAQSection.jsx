import { motion as Motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { useState } from 'react';

const faqs = [
  {
    id: 'faq-who-is',
    question: 'Who is Muhammad Hamza?',
    answer:
      'Muhammad Hamza is a Software Engineer and AI Developer from Peshawar, Pakistan. He is the Main Developer of Quizior (quizior.live), the developer behind a QAC-based college ranking system for the Higher Education Department, Government of Khyber Pakhtunkhwa, and Co-Founder of Solvia Codes.',
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
      'Muhammad Hamza primarily works with Python (FastAPI, Flask), PostgreSQL and MySQL for backend development, and React, Next.js, and Vite for frontend work. He also builds native Android apps using Kotlin and Android Studio, and works with web scraping, test automation, and multi-agent AI systems.',
  },
  {
    id: 'faq-freelance',
    question: 'Is Muhammad Hamza available for freelance or contract work?',
    answer:
      'Yes. Muhammad Hamza is open to freelance and contract engagements in software engineering, Python backend, AI/ML integration, and web development. You can reach him via the contact section on this site or at contact@hamzax.me.',
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
            Common questions about Muhammad Hamza, his work, and how to collaborate.
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
