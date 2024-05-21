import { useState, useEffect } from 'react';

/**
 * Persisting React State in localStorage
 * @link https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage
 * @param {string}             key          localStorage key
 * @param {string}             defaultValue default value
 * @returns {string, function}              default or localStorage value and value setter function
 */
function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const localStorageValue = window.localStorage.getItem(key);
        return localStorageValue === null ? defaultValue : JSON.parse(localStorageValue);
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
