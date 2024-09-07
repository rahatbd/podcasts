import { useState, useEffect } from 'react';

function useLoadingTimeout(loading) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timeout;
        if (loading) setIsLoading(true);
        else timeout = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timeout);
    }, [loading]);

    return isLoading;
}

export default useLoadingTimeout;
