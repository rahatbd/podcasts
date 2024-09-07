import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import useLoadingTimeout from '../hooks/useLoadingTimeout';
import Loading from './Loading';
import Error from './Error';
import Form from './Form';
import Podcasts from './Podcasts';
import styled from 'styled-components';

const StyledLoadingDiv = styled.div`
    opacity: ${({ $isLoading }) => ($isLoading ? 1 : 0.5)};
    transition: opacity 0.5s ease-out;
`;

function Main() {
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useLocalStorage('country', 'ca');
    const [getRegions, errorRegions] = useFetch('regions');
    const [getBestPodcasts, errorBestPodcasts, isBestPodcastsLoading] = useFetch(`best_podcasts?region=${region}`);
    const loading = !(regions.length && getBestPodcasts?.podcasts.length);
    const error = errorRegions || errorBestPodcasts;
    const isLoading = useLoadingTimeout(loading && !error);

    useEffect(() => {
        // sort regions alphabetically
        if (!getRegions) return;
        const regions = Object.entries(getRegions.regions)
            .map(([region, name]) => ({ region, name }))
            .sort((a, b) => a.name.localeCompare(b.name));
        setRegions(regions);
    }, [getRegions]);

    return (
        <main className="wrapper">
            {isLoading ? (
                <StyledLoadingDiv
                    className="centre"
                    $isLoading={loading && !error}
                >
                    <Loading size={225} />
                </StyledLoadingDiv>
            ) : error ? (
                <Error error={error} />
            ) : (
                <>
                    <Form
                        regions={regions}
                        region={region}
                        setRegion={setRegion}
                        isBestPodcastsLoading={isBestPodcastsLoading}
                    />
                    <Podcasts
                        regions={regions}
                        bestPodcasts={getBestPodcasts}
                    />
                </>
            )}
        </main>
    );
}

export default Main;
