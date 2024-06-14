import { useState, useEffect } from 'react';

/**
 * Custom hook to persist React state in localStorage
 * @link https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage
 * @param {string}                 key          key under which the value is stored in localStorage
 * @param {*}                      defaultValue default value if the localStorage key does not exist
 * @returns {Array<any, Function>}              returns an array with the current state and a function to update it
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
