import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import heroPhotoWebp from '../assets/muhammad-hamza-profile.webp';
import heroPhotoPng from '../assets/muhammad-hamza-profile.png';

const About = () => {
    return (
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* Photo */}
                    <motion.div variants={fadeInUp} className="flex justify-center">
                        <div className="relative w-full max-w-[420px]">
                            {/* Decorative Background Shadows */}
                            <div className="absolute inset-0 bg-brand-500/10 rounded-[2rem] rotate-6 shadow-md scale-100 translate-x-2 translate-y-2"></div>
                            <div className="absolute inset-0 bg-brand-500/10 rounded-[2rem] -rotate-6 shadow-md scale-100 -translate-x-2 -translate-y-2"></div>
                            {/* picture element: WebP for modern browsers, PNG fallback */}
                            <picture>
                                <source
                                    srcSet={heroPhotoWebp}
                                    type="image/webp"
                                />
                                <img
                                    src={heroPhotoPng}
                                    alt="Muhammad Hamza - Software Engineer from Peshawar, Pakistan"
                                    loading="lazy"
                                    decoding="async"
                                    width="1200"
                                    height="675"
                                    className="relative z-10 w-full h-auto rounded-[2rem] shadow-xl border-2 border-brand-500/20 transform-gpu"
                                    style={{
                                        imageRendering: '-webkit-optimize-contrast',
                                        backfaceVisibility: 'hidden'
                                    }}
                                />
                            </picture>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                            About <span className="text-brand-500">Me</span>
                        </h2>
                        <div className="space-y-4 text-secondary text-md">
                            <p>
                                I'm Muhammad Hamza, a Software Engineer based in Peshawar, Pakistan, with experience in Python-based development, web technologies, and software testing. I focus on building reliable, maintainable applications and automating workflows that improve efficiency and reduce manual effort. I enjoy writing clean, well-structured code and paying close attention to performance, usability, and long-term maintainability.
                            </p>
                            <p>
                                I'm the Main Developer of Quizior, an AI-powered exam and quiz evaluation platform, Co-Founder at Solvia Codes, and Co-Lead at Nexior — where I work on building software products with real-world impact.
                            </p>
                            <p>
                                My current skill set includes Python development, web development, web scraping, and test automation. I have hands-on experience with tools and frameworks such as PyTest, JUnit, Katalon, and BrowserStack, along with handling structured data formats like JSON. I'm comfortable designing and testing web solutions, ensuring functionality, reliability, and cross-browser compatibility.
                            </p>
                            <p>
                                I'm actively expanding my expertise into Android application development, advanced automation, and intelligent systems. I have a growing interest in artificial intelligence and am currently exploring AI concepts, agent-based systems, and their practical applications in real-world software solutions — with a focus on continuous learning and experimentation.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
