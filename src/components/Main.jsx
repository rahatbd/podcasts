import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import Error from './Error';
import Loading from './Loading';
import Form from './Form';
import Podcasts from './Podcasts';

function Main() {
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useLocalStorage('country', 'ca');
    const [getRegions, errorRegions] = useFetch('regions');
    const [getBestPodcasts, errorBestPodcasts, isBestPodcastsLoading] = useFetch(`best_podcasts?region=${region}`);

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
            {errorRegions || errorBestPodcasts ? (
                <Error error={errorRegions || errorBestPodcasts} />
            ) : (
                <>
                    {Boolean(!regions.length || !getBestPodcasts?.podcasts.length) && (
                        <div className="centre">
                            <Loading size={225} />
                        </div>
                    )}
                    {Boolean(regions.length && getBestPodcasts?.podcasts.length) && (
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
                </>
            )}
        </main>
    );
}

export default Main;
