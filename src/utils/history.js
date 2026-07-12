// Simple custom history utility for SPA routing
const listeners = new Set();

export const getCurrentPath = () => {
    return window.location.pathname;
};

export const pushPath = (path) => {
    if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
        listeners.forEach(listener => listener(path));
    }
};

export const subscribeToPath = (listener) => {
    listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
        listeners.delete(listener);
    };
};

// Listen to popstate event (e.g. browser back/forward buttons)
if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
        listeners.forEach(listener => listener(window.location.pathname));
    });
}
