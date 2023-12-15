import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Podcasts from './components/Podcasts';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Podcasts
                param="best_podcasts"
                region="ca"
            />
            <Footer />
        </>
    );
}

export default App;
