import { useState, useEffect } from 'react';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useTheme } from '../contexts/ThemeContext';


const Hero = () => {
    const { theme } = useTheme();
    const [displayText, setDisplayText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    const roles = [
        'Software Engineer',
        'Python Engineer',
        'Web Scrapper',
        'Web Developer',
        'Android App Developer'
    ];

    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setHasStarted(true), 1000);
        return () => clearTimeout(startTimer);
    }, []);

    useEffect(() => {
        if (!hasStarted) return;
        const typingSpeed = isDeleting ? 50 : 100;
        const currentRole = roles[roleIndex];

        const timer = setTimeout(() => {
            if (!isDeleting && charIndex < currentRole.length) {
                // Typing
                setDisplayText(prev => prev + currentRole[charIndex]);
                setCharIndex(prev => prev + 1);
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                setDisplayText(prev => prev.slice(0, -1));
                setCharIndex(prev => prev - 1);
            } else if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of typing
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && charIndex === 0) {
                // Move to next role
                setIsDeleting(false);
                setRoleIndex(prev => (prev + 1) % roles.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex, hasStarted]);

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isLight = theme !== 'dark';

    return (
        <section id="home" className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
            {/* Background Glow Effect */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[1000px] sm:h-[1000px] rounded-full blur-[60px] sm:blur-[140px] pointer-events-none transition-colors duration-500 ${isLight ? 'bg-brand-500/25' : 'bg-brand-500/20'
                }`}></div>

            {/* Inner Center Radial Light Source */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
                style={{
                    background: isLight
                        ? 'radial-gradient(circle at 50% 45%, rgba(15, 118, 110, 0.25) 0%, rgba(17, 94, 89, 0.08) 50%, transparent 75%)'
                        : 'radial-gradient(circle at 50% 45%, rgba(15, 118, 110, 0.22) 0%, rgba(13, 92, 86, 0.08) 45%, transparent 70%)'
                }}
            ></div>

            {/* Vertically Centered Hero Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-12 py-20 flex flex-col items-center text-center my-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary mb-4">
                    <span className="text-brand-600 dark:text-brand-400">Muhammad</span>{' '}Hamza
                </h1>

                <p className="text-sm sm:text-base text-muted font-medium mb-4 max-w-xl mx-auto tracking-wide text-center">
                    Software Engineer&nbsp;&bull;&nbsp;Main Developer,&nbsp;<a href="https://quizior.live" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline decoration-brand-500/60 underline-offset-2 hover:decoration-brand-500 font-semibold">Quizior</a>&nbsp;&bull;&nbsp;Co-Founder,&nbsp;Solvia Codes&nbsp;&bull;&nbsp;Co-Lead,&nbsp;Nexior
                </p>

                <h2 className="text-2xl sm:text-3xl mb-8 h-10 flex items-center justify-center font-mono">
                    <span className="text-primary font-medium">{displayText}</span>
                    <span className="w-[2px] h-8 bg-brand-500 ml-1 animate-pulse"></span>
                </h2>

                <p className="text-lg sm:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
                    Building reliable, maintainable software with Python & FastAPI.
                    Exploring AI/ML and developing products that solve real problems.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={() => window.open('/MUHAMMAD HAMZA.pdf', '_blank')}
                        className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-brand-500/30"
                    >
                        Download Resume
                        <svg className="w-5 h-5 ml-1 inline-block" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollToSection('#contact')}
                        className="px-8 py-4 glass hover:bg-brand-500/10 text-primary rounded-lg font-medium transition-all hover:scale-105"
                    >
                        Get in Touch
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
