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
    margin-block: 1rem;
`;

const StyledDescription = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;

/* eslint-disable react/prop-types */
function Podcasts() {
    const [podcasts, setPodcasts] = useState([]);
    const [options, setOptions] = useState([]);
    const [regions, setRegions] = useState({});
    const [region, setRegion] = useState('ca');

    const getRegions = useFetch('regions');
    const getBestPodcasts = useFetch(`best_podcasts?region=${region}`);

    useEffect(() => {
        if (getRegions) {
            const { regions } = getRegions;
            let options = [];
            for (const region in regions) {
                options.push({
                    name: regions[region],
                    region,
                });
            }
            options.sort((a, b) => (a.name > b.name ? 1 : -1));
            setOptions(options);
            setRegions(regions);
        }
    }, [getRegions]);

    useEffect(() => {
        // let isMounted = true;
        if (getBestPodcasts) setPodcasts(getBestPodcasts.podcasts);
        // return () => (isMounted = false);
    }, [getBestPodcasts]);

    function stripHtml(htmlString) {
        const string = new DOMParser().parseFromString(htmlString, 'text/html');
        return string.body.textContent || '';
    }

    return (
        <main>
            <StyledHeading>Best Podcasts - {regions[region]}</StyledHeading>
            {/* <form onSubmit={event => event.preventDefault()}> */}
            <form>
                <label htmlFor="region">Region</label>
                <select
                    id="region"
                    value={region}
                    onChange={event => setRegion(event.target.value)}
                >
                    {options.map(({ name, region }) => (
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
                {podcasts.map(({ id, thumbnail, title, publisher, description }) => (
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
                        <StyledDescription>{stripHtml(description)}</StyledDescription>
                    </StyledCard>
                ))}
            </StyledContainer>
        </main>
    );
}

export default Podcasts;
