import { useState, useEffect } from 'react';

function useFetch(param) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        (async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    //** NETLIFY **//
                    `.netlify/functions/fetch?param=${param}`,
                    { signal }
                    //** DEVELOPMENT **//
                    // `https://listen-api-test.listennotes.com/api/v2/${param}`,
                    // { signal }
                    //** PRODUCTION **//
                    // `https://listen-api.listennotes.com/api/v2/${param}`,
                    // {
                    //     headers: {
                    //         'X-ListenAPI-Key': import.meta.env.VITE_API_KEY,
                    //     },
                    //     signal,
                    // }
                );
                const { ok, status, statusText } = response;
                if (!ok) throw Error(`Status: ${status} ${statusText}`);
                const data = await response.json();
                setData(data);
                setError(null);
            } catch (error) {
                if (!signal.aborted) {
                    console.error(error);
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();

        return () => abortController.abort();
    }, [param]);

    return [data, error, isLoading];
}

export default useFetch;
