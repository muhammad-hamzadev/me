import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/hamzax-logo.png';
import { pushPath } from '../utils/history';

const SunIcon = () => (
    <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-6 h-6 text-slate-700 dark:text-slate-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        let sectionPositions = [];
        const updatePositions = () => {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            sectionPositions = sections.map((id) => {
                const element = document.getElementById(id);
                if (!element) return null;
                return { id, top: element.offsetTop, height: element.offsetHeight };
            }).filter(Boolean);
        };

        const timer = setTimeout(updatePositions, 500);
        window.addEventListener('resize', updatePositions);

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    setScrolled(scrollY > 20);

                    const scrollPosition = scrollY + 100;
                    for (const section of sectionPositions) {
                        if (scrollPosition >= section.top && scrollPosition < section.top + section.height) {
                            setActiveSection(section.id);
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePositions);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home', isSection: true },
        { name: 'About', href: '#about', isSection: true },
        { name: 'Skills', href: '#skills', isSection: true },
        { name: 'Projects', href: '#projects', isSection: true },
        { name: 'Contact', href: '#contact', isSection: true },
        { name: 'Blog', href: '/blog', isSection: false },
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNavLinkClick = (e, link) => {
        if (link.isSection) {
            if (window.location.pathname !== '/') {
                pushPath('/');
                setTimeout(() => {
                    scrollToSection(e, link.href);
                }, 100);
            } else {
                scrollToSection(e, link.href);
            }
        } else {
            e.preventDefault();
            pushPath(link.href);
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass shadow-lg py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => {
                            if (window.location.pathname !== '/') {
                                e.preventDefault();
                                pushPath('/');
                            } else {
                                scrollToSection(e, '#home');
                            }
                        }}
                        className="flex items-center gap-1 group"
                    >
                        <img
                            src={logo}
                            alt="Muhammad Hamza Logo"
                            width="80"
                            height="80"
                            decoding="async"
                            className="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                        />
                        <span className="text-3xl font-bold text-primary -ml-5">
                            amza
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isBlogActive = window.location.pathname.startsWith('/blog');
                            const isActive = link.isSection
                                ? (activeSection === link.href.substring(1) && window.location.pathname === '/')
                                : isBlogActive;

                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavLinkClick(e, link)}
                                    className={`relative py-2 transition-colors font-bold ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-secondary hover:text-brand-600 dark:hover:text-brand-400'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full transition-all duration-300" />
                                    )}
                                </a>
                            );
                        })}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-brand-500/10 transition-colors text-primary"
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>

                    {/* Mobile Menu Button & Theme Toggle */}
                    <div className="flex md:hidden items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-brand-500/10 transition-colors text-primary"
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-brand-500/10 transition-colors text-primary"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden py-4 glass mt-2 rounded-lg mx-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavLinkClick(e, link)}
                            className="block px-4 py-3 text-secondary hover:text-brand-500 hover:bg-brand-500/10 transition-colors font-bold"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
