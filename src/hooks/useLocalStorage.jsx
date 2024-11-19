import { useState, useEffect } from 'react';

/**
 * Custom hook to persist React state in localStorage
 * @link https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage
 * @param {string}                 key          key used to store and retrieve the value from localStorage
 * @param {string}                 defaultValue default value if no value is found in localStorage
 * @returns {[string, Function]}                returns an array containing the current value and a setter function that updates the value and syncs it to localStorage
 */
function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const localStorageValue = window.localStorage.getItem(key);
        return localStorageValue === null ? defaultValue : JSON.parse(localStorageValue);
    });

    useEffect(() => window.localStorage.setItem(key, JSON.stringify(value)), [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
