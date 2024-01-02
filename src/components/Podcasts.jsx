import { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import styled from 'styled-components';

const StyledHeading = styled.h2`
    text-align: center;
    margin-block-end: 1rem;
`;

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(calc(400rem / 16), 100%), 1fr));
    gap: 0.5rem;
`;

const StyledCard = styled.article`
    line-height: 1.5;
    border: 1px solid ${({ theme }) => theme.darkTheme.borderColour};
    padding: 1rem;

    & > *:not(p) {
        text-align: center;
    }
`;

const StyledImageContainer = styled.div`
    /* display: grid;
    place-items: center; */
    margin-block: 1rem;
`;

/* eslint-disable react/prop-types */
function Podcasts() {
    const [podcasts, setPodcasts] = useState([]);
    const [regions, setRegions] = useState({});
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('ca');

    const getRegions = useFetch('regions');
    const getBestPodcasts = useFetch(
        `best_podcasts?${new URLSearchParams({ region: selectedRegion })}`
    );

    useEffect(() => {
        if (getRegions) {
            const { regions } = getRegions;
            let options = [];
            for (const region in regions) {
                options.push({
                    region,
                    name: regions[region],
                });
            }
            options.sort((a, b) => (a.name > b.name ? 1 : -1));
            setRegions(regions);
            setSelectOptions(options);
        }
    }, [getRegions]);

    useEffect(() => {
        // let isMounted = true;
        if (getBestPodcasts) {
            setPodcasts(getBestPodcasts.podcasts);
        }
        //cleanup
        // return () => (isMounted = false);
    }, [getBestPodcasts]);

    function stripHtml(htmlString) {
        const string = new DOMParser().parseFromString(htmlString, 'text/html');
        return string.body.textContent || '';
    }

    return (
        <main>
            <StyledHeading>Best Podcasts - {regions[selectedRegion]}</StyledHeading>
            {/* <form onSubmit={event => event.preventDefault()}> */}
            <form>
                <label htmlFor="region">Region</label>
                <select
                    id="region"
                    value={selectedRegion}
                    onChange={event => setSelectedRegion(event.target.value)}
                >
                    {selectOptions.map(({ region, name }) => (
                        <option
                            key={region}
                            value={region}
                        >
                            {name}
                        </option>
                    ))}
                </select>
            </form>
            <StyledContainer>
                {Boolean(podcasts.length) &&
                    podcasts.map(({ id, thumbnail, title, publisher, description }) => (
                        <StyledCard key={id}>
                            <h3>{title}</h3>
                            <h4>by {publisher}</h4>
                            <StyledImageContainer>
                                <img
                                    src={thumbnail}
                                    alt={`${title} cover art`}
                                    width="300"
                                    height="300"
                                    loading="lazy"
                                />
                            </StyledImageContainer>
                            <p>{stripHtml(description)}</p>
                        </StyledCard>
                    ))}
            </StyledContainer>
        </main>
    );
}

export default Podcasts;
