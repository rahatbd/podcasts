import { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import styled from 'styled-components';

const StyledCentre = styled.div`
    display: grid;
    justify-items: center;
`;

const StyledRegions = styled(StyledCentre)`
    row-gap: var(--space);
    margin-block-end: var(--space);
`;

const StyledPodcasts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(calc(400rem / 16), 100%), 1fr));
    gap: var(--space);
`;

const StyledCard = styled.article`
    border: calc(1.5rem / 16) solid ${({ theme }) => theme.darkTheme.borderColour};
    border-radius: 0.5rem;
    line-height: 1.5;
    padding-block-end: var(--space);

    & > *:not(:last-child) {
        text-align: center;
    }
`;

const StyledHeadings = styled.div`
    display: grid;
    align-content: center;
    min-block-size: calc(100rem / 16);
    border-block-end: calc(1.5rem / 16) solid ${({ theme }) => theme.darkTheme.borderColour};
`;

const StyledTitle = styled.h3`
    font-weight: 800;
    text-wrap: balance;
`;

const StyledPublisher = styled.h4`
    font-weight: 400;

    span {
        font-weight: 100;
        font-style: italic;
        font-variation-settings: 'opsz' 32;
    }
`;

const StyledDescription = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-wrap: pretty;
    max-inline-size: 70ch;
    padding-inline: var(--space);
`;

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
        <main className="wrapper">
            <StyledRegions>
                <h2>Best Podcasts: {regions[region]}</h2>
                {/* <form onSubmit={event => event.preventDefault()}> */}
                <form>
                    <label htmlFor="region">Region&nbsp;</label>
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
            </StyledRegions>
            <StyledPodcasts>
                {podcasts.map(({ id, thumbnail, title, publisher, description }) => (
                    <StyledCard key={id}>
                        <StyledHeadings>
                            <StyledTitle>{title}</StyledTitle>
                            <StyledPublisher>
                                <span>by</span> {publisher}
                            </StyledPublisher>
                        </StyledHeadings>
                        <div>
                            <img
                                src={thumbnail}
                                alt={`${title} cover art`}
                                width="300"
                                height="300"
                                // loading="lazy"
                            />
                        </div>
                        <StyledCentre>
                            <StyledDescription>{stripHtml(description)}</StyledDescription>
                        </StyledCentre>
                    </StyledCard>
                ))}
            </StyledPodcasts>
        </main>
    );
}

export default Podcasts;
