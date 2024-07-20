import { CircleLoader } from 'react-spinners';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

function Loading({ size }) {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <CircleLoader
            aria-label="loading"
            color="currentColor"
            size={size}
            speedMultiplier={prefersReducedMotion ? 0.25 : 1}
        />
    );
}

export default Loading;
