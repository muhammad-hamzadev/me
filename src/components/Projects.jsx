import { motion as Motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { HiExternalLink } from 'react-icons/hi';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const projects = [
    {
        title: 'HED College Ranking System',
        image: '/images/projects/hed-ranking.webp',
        description: 'A QAC-based ranking platform built for the Higher Education Department, Government of Khyber Pakhtunkhwa, to evaluate and rank public-sector colleges across the province.',
        tech: ['Government Platform', 'QAC Ranking', 'Data & Reporting'],
        live: 'https://ranking.qac.hed.gkp.pk',
        label: 'HED',
        status: 'Latest project',
    },
    {
        title: 'AiVerse',
        image: '/images/projects/aiverse.webp',
        description: 'A web-based learning platform created for an IELTS academy, bringing AI-assisted tools into the student learning and academy workflow.',
        tech: ['Web Platform', 'AI Integration', 'IELTS Education'],
        live: 'https://aiverse.ehubinstitute.com',
        label: 'AI',
        status: 'New',
    },
    {
        title: 'Quizior',
        description: 'An AI-powered exam and quiz platform with live quizzes, real-time leaderboards, bulk question import, AI-assisted evaluation, and practical tools for teachers and institutions.',
        tech: ['PHP', 'MySQL', 'Python', 'AI APIs', 'Multi-Tenant'],
        image: '/images/blog/quizior-mcq-cover.png',
        live: 'https://quizior.live',
        label: 'QZ',
        status: 'Live',
    },
    {
        title: 'AI UI/UX Feedback System',
        description: 'A multi-agent design auditor with six specialized AI agents for UI/UX, visual design, copy, and conversion feedback in one review workflow.',
        tech: ['Python', 'Flask', 'MySQL', 'Gemini', 'Multi-Agent AI'],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=720&q=70&fm=webp',
        github: 'https://github.com/muhammad-hamzadev/UI_FEEDBACK_SYSTEM.git',
        label: 'UX',
    },
    {
        title: 'Attendance System',
        description: 'A desktop attendance app with teacher login, class selection, color-coded marking, session timeout, automatic sign-out, and local data storage.',
        tech: ['Python', 'Tkinter', 'JSON'],
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=720&q=70&fm=webp',
        github: 'https://github.com/muhammad-hamzadev/Attendane_system_app.git',
        label: 'AT',
    },
    {
        title: 'TODO Web App',
        description: 'A focused Flask task manager with SQLite storage, duplicate prevention, useful feedback messages, and a responsive Bootstrap interface.',
        tech: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
        image: 'https://images.unsplash.com/photo-1598791318878-10e76d178023?auto=format&fit=crop&w=720&q=70&fm=webp',
        github: 'https://github.com/muhammad-hamzadev/Todo_App.git',
        label: 'TD',
    },
    {
        title: 'Terminal Chatbot',
        description: 'A command-line chatbot with a simple interactive flow, conversation logging, clean exit handling, and support for multiple AI providers.',
        tech: ['Python', 'Gemini API', 'AI Integration'],
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=720&q=70&fm=webp',
        github: 'https://github.com/muhammad-hamzadev/terminal_chatbot.git',
        label: 'TC',
    },
];

const ProjectVisual = ({ project }) => (
    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-transparent border-b border-card-border/40">
        {project.image ? (
            <img
                src={project.image}
                alt={`${project.title} project preview`}
                loading="lazy"
                decoding="async"
                width="720"
                height="352"
                className="w-full h-full object-cover"
            />
        ) : (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="absolute w-36 h-36 rounded-full bg-brand-500/15 blur-2xl" />
                <span className="relative text-5xl font-black tracking-tight text-brand-600/70 dark:text-brand-400/70">
                    {project.label}
                </span>
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        {project.status && (
            <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-slate-950/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {project.status}
            </span>
        )}
    </div>
);

const Projects = () => (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
            <Motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
                    Featured <span className="text-brand-600 dark:text-brand-400">Projects</span>
                </h2>
                <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
                    Selected work across government, education, web platforms, automation, and AI.
                </p>
            </Motion.div>

            <Motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                {projects.map((project) => (
                    <Motion.article
                        key={project.title}
                        variants={staggerItem}
                        className="glass rounded-2xl overflow-hidden border border-card-border/50 flex min-h-full flex-col shadow-sm"
                    >
                        <ProjectVisual project={project} />

                        <div className="p-5 sm:p-6 flex flex-1 flex-col">
                            <h3 className="text-xl font-bold text-primary mb-3">
                                {project.title}
                            </h3>
                            <p className="text-secondary text-sm leading-relaxed mb-5 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-5" aria-label={`${project.title} technologies`}>
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 text-xs bg-brand-500/10 text-brand-700 dark:text-brand-300 font-semibold rounded-md border border-brand-500/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-card-border/40">
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
                                    >
                                        <HiExternalLink size={18} aria-hidden="true" />
                                        Live Project
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg border border-card-border/70 px-3.5 py-2 text-sm font-semibold text-secondary hover:text-brand-500 hover:border-brand-500/40 transition-colors"
                                    >
                                        <SiGithub size={17} aria-hidden="true" />
                                        View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </Motion.article>
                ))}
            </Motion.div>
        </div>
    </section>
);

export default Projects;
