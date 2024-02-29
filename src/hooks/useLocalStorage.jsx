import { useState, useEffect } from 'react';

/**
 * Persisting React State in localStorage
 * @link https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage
 * @param {string} defaultValue default value
 * @param {string} key          localStorage key name
 * @returns {string, function}  localStorage or default value and setter function
 */
function useLocalStorage(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const localStorageValue = window.localStorage.getItem(key);
        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
