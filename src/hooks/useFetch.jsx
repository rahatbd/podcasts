import { useState, useEffect } from 'react';

// const urlProxy = 'https://proxy.junocollege.com';
// const urlBase = 'https://listen-api.listennotes.com/api/v2';
const urlTest = 'https://listen-api-test.listennotes.com/api/v2';

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
                    // `${urlBase}/${param}`,
                    // {
                    //     headers: {
                    //         'X-ListenAPI-Key': `${key}`,
                    //     },
                    //     signal,
                    // }
                    `${urlTest}/${param}`,
                    { signal }
                );
                if (!response.ok) throw Error(`Status: ${response.status} ${response.statusText}`);
                const data = await response.json();
                if (!data) throw Error('No data found!');
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
