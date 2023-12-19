import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Podcasts from './components/Podcasts';
import Footer from './components/Footer';

const theme = {
    darkTheme: {
        backgroundColour: '#0f0f0f',
        colour: '#fffbf5',
        borderColour: '#776b5d',
    },
    // css MQ
    lightTheme: {
        backgroundColour: '#fffbf5',
        colour: '#0f0f0f',
    },
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
