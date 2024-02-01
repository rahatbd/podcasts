import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Podcasts from './components/Podcasts';
import Footer from './components/Footer';

const theme = {
    darkTheme: {
        accentColour: '#1a1a2e',
        backgroundColour: '#0f0f0f',
        textColour: '#fffbf5',
        visitedColour: '#b3a492',
    },
    // lightTheme: {
    //     backgroundColour: '#fffbf5',
    //     colour: '#0f0f0f',
    // },
};

function App() {
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
