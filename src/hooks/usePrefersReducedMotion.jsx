import { useState, useEffect } from 'react';

const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');

/**
 * Custom hook to determine if the user prefers reduced motion
 * @link https://www.joshwcomeau.com/react/prefers-reduced-motion
 * @returns {boolean} returns true if the user prefers reduced motion, otherwise false
 */
function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(!mediaQuery.matches);

    useEffect(() => {
        const handleChange = event => setPrefersReducedMotion(!event.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}

export default usePrefersReducedMotion;
