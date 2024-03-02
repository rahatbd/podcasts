import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const appearance = {
    dark: {
        name: 'dark',
        accentColour: '#1a1a2e',
        backgroundColour: '#0f0f0f',
        textColour: '#fffbf5',
        visitedColour: '#b4b4b8',
    },
    light: {
        name: 'light',
        accentColour: '#f7efe5',
        backgroundColour: '#fffbf5',
        textColour: '#0f0f0f',
        visitedColour: '#643a6b',
    },
};

const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');

function App() {
    const [theme, setTheme] = useState(darkMode.matches ? appearance.dark : appearance.light);
    const [isReducedMotion, setIsReducedMotion] = useState(!reducedMotion.matches);

    useEffect(() => {
        const changeTheme = event => setTheme(event.matches ? appearance.dark : appearance.light);
        darkMode.addEventListener('change', changeTheme);
        return () => darkMode.removeEventListener('change', changeTheme);
    }, []);

    useEffect(() => {
        const changeReducedMotion = event => setIsReducedMotion(!event.matches);
        reducedMotion.addEventListener('change', changeReducedMotion);
        return () => reducedMotion.removeEventListener('change', changeReducedMotion);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header />
            <Main isReducedMotion={isReducedMotion} />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
