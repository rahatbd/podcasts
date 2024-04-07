import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const theme = {
    dark: {
        name: 'dark',
        accentColour: 'oklch(22.84% 0.038 282.93)',
        backgroundColour: 'oklch(16.84% 0 0)',
        textColour: 'oklch(98.95% 0.009 78.28)',
        visitedColour: 'oklch(59.99% 0 0)',
    },
    light: {
        name: 'light',
        accentColour: 'oklch(95.56% 0.016 73.68)',
        backgroundColour: 'oklch(98.95% 0.009 78.28)',
        textColour: 'oklch(16.84% 0 0)',
        visitedColour: 'oklch(64.01% 0.155 294.18)',
    },
};

const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');

function App() {
    const [currentTheme, setCurrentTheme] = useState(darkMode.matches ? theme.dark : theme.light);
    const [isReducedMotion, setIsReducedMotion] = useState(!reducedMotion.matches);

    useEffect(() => {
        const changeCurrentTheme = event => setCurrentTheme(event.matches ? theme.dark : theme.light);
        darkMode.addEventListener('change', changeCurrentTheme);
        return () => darkMode.removeEventListener('change', changeCurrentTheme);
    }, []);

    useEffect(() => {
        const changeReducedMotion = event => setIsReducedMotion(!event.matches);
        reducedMotion.addEventListener('change', changeReducedMotion);
        return () => reducedMotion.removeEventListener('change', changeReducedMotion);
    }, []);

    return (
        <ThemeProvider theme={currentTheme}>
            <GlobalStyle />
            <Header />
            <Main isReducedMotion={isReducedMotion} />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
