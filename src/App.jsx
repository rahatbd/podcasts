import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Podcasts from './components/Podcasts';
import Footer from './components/Footer';

const darkTheme = {
    name: 'dark',
    accentColour: '#1a1a2e',
    backgroundColour: '#0f0f0f',
    textColour: '#fffbf5',
    visitedColour: '#b4b4b8',
};

const lightTheme = {
    name: 'light',
    accentColour: '#f7efe5',
    backgroundColour: darkTheme.textColour,
    textColour: darkTheme.backgroundColour,
    visitedColour: '#643a6b',
};

const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

function App() {
    const [theme, setTheme] = useState(darkMode.matches ? darkTheme : lightTheme);

    useEffect(() => {
        const changeTheme = event => setTheme(event.matches ? darkTheme : lightTheme);
        darkMode.addEventListener('change', changeTheme);
        return () => darkMode.removeEventListener('change', changeTheme);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header />
            <Podcasts />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
