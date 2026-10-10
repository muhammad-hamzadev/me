import { motion as Motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const About = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
            <div className="max-w-7xl mx-auto">
                <Motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* Photo */}
                    <Motion.div variants={fadeInUp} className="flex justify-center">
                        <div className="relative w-[78vw] max-w-[300px]">
                            {/* Decorative Background Shadows */}
                            <div className="absolute inset-0 bg-brand-500/10 rounded-[2rem] rotate-6 shadow-md scale-100 translate-x-2 translate-y-2"></div>
                            <div className="absolute inset-0 bg-brand-500/10 rounded-[2rem] -rotate-6 shadow-md scale-100 -translate-x-2 -translate-y-2"></div>
                            {/* picture element: WebP for modern browsers, PNG fallback */}
                            <picture>
                                <source
                                    srcSet="/images/muhammadhamza.webp"
                                    type="image/webp"
                                />
                                <img
                                    src="/images/muhammadhamza.jpg"
                                    alt="Muhammad Hamza - Software Engineer from Peshawar, Pakistan"
                                    fetchPriority="high"
                                    decoding="async"
                                    width="450"
                                    height="800"
                                    className="relative z-10 w-full h-auto rounded-[2rem] shadow-xl border-2 border-brand-500/20 transform-gpu"
                                    style={{
                                        imageRendering: '-webkit-optimize-contrast',
                                        backfaceVisibility: 'hidden'
                                    }}
                                />
                            </picture>
                        </div>
                    </Motion.div>

                    {/* Content */}
                    <Motion.div variants={fadeInUp}>
                        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                            About <span className="text-brand-500">Me</span>
                        </h2>
                        <div className="space-y-4 text-secondary text-md leading-relaxed">
                            <p>
                                I'm Muhammad Hamza, a software engineer based in Peshawar. I enjoy taking a rough idea, understanding the real problem behind it, and turning it into software people can actually use. My work spans full-stack web development, Python backends, Android development, automation, and practical AI integrations.
                            </p>
                            <p>
                                Recently, I built a QAC-based college ranking system for the Higher Education Department, Government of Khyber Pakhtunkhwa. I'm also the main developer of <a href="https://quizior.live" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Quizior</a>, and I created AiVerse for an IELTS academy to bring AI-assisted learning tools into one web platform.
                            </p>
                            <p>
                                As Co-Founder of <a href="https://www.solvia.codes" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Solvia Codes</a>, I work on products from planning and system design through development, testing, and deployment. I care about straightforward user experiences, maintainable code, and making sensible technical decisions instead of adding complexity for its own sake.
                            </p>
                            <p>
                                I'm currently focused on growing deeper in scalable backend systems, Next.js, PostgreSQL, and agent-based AI workflows while continuing to ship useful software for education, government, and business teams.
                            </p>
                        </div>
                    </Motion.div>
                </Motion.div>
            </div>
        </section>
    );
};

export default About;
