// Framer Motion animation variants for scroll reveals
// Device-adaptive: Instant rendering on Mobile (0 CPU overhead), rich stagger on Desktop

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export const fadeIn = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: isMobile ? 0 : 0.4,
            ease: "easeOut"
        }
    }
};

export const fadeInUp = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: isMobile ? 0 : 0.4,
            ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: isMobile ? 0 : 0.08,
            delayChildren: isMobile ? 0 : 0.1
        }
    }
};

export const staggerItem = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: isMobile ? 0 : 0.4,
            ease: "easeOut"
        }
    }
};
