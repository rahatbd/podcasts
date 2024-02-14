import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Regions from './components/Regions';
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

function App() {
    const [theme, setTheme] = useState(darkMode.matches ? appearance.dark : appearance.light);

    useEffect(() => {
        const changeTheme = event => setTheme(event.matches ? appearance.dark : appearance.light);
        darkMode.addEventListener('change', changeTheme);
        return () => darkMode.removeEventListener('change', changeTheme);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header />
            <Regions />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
