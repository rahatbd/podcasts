import { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import Flag from 'react-world-flags';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space);
    margin-block-end: var(--space);
`;

const StyledLabel = styled.label`
    font-size: 1.5rem;
    font-weight: 550;
    text-shadow: 0 0 calc(2rem / 16);
`;

const StyledArrowDiv = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    &::after {
        --border-inline-size: calc(7rem / 16);
        content: '';
        position: absolute;
        inset-inline-end: 5%;
        border-block-start: var(--border-inline-size) solid;
        border-inline: var(--border-inline-size) solid transparent;
        pointer-events: none;
    }
`;

const StyledSelect = styled.select`
    --inline-size: 250px;
    appearance: none;
    background-color: ${({ theme }) => theme.darkTheme.accentColour};
    border: none;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 1.25rem;
    font-weight: 800;
    min-inline-size: var(--inline-size);
    inline-size: max(var(--inline-size), 100%);
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:focus {
        outline: calc(1rem / 16) solid;
        filter: drop-shadow(0 0 calc(2rem / 16));
    }
`;

const StyledPodcastsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(calc(400rem / 16), 100%), 1fr));
    gap: var(--space);
`;

const StyledArticle = styled.article`
    --border-inline-size: calc(1.5rem / 16);
    border: var(--border-inline-size) solid ${({ theme }) => theme.darkTheme.accentColour};
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.darkTheme.accentColour};
    line-height: 1.5;
`;

const StyledCentreDiv = styled.div`
    display: grid;
    place-content: center;
    border-block-end: var(--border-inline-size) solid ${({ theme }) => theme.darkTheme.accentColour};
    padding-inline: var(--space);
`;

const StyledHeadingsDiv = styled(StyledCentreDiv)`
    text-align: center;
    text-wrap: balance;
    min-block-size: calc(110rem / 16);
`;

const StyledH2 = styled.h2`
    font-size: 1.1rem;
    font-weight: 800;
`;

const StyledH3 = styled.h3`
    font-size: 1rem;
    font-weight: 300;
`;

const StyledSpan = styled.span`
    font-style: italic;
    font-weight: 100;
    font-variation-settings: 'opsz' 32;
`;

const StyledImg = styled.img`
    inline-size: calc(300rem / 16);
    aspect-ratio: 1;
`;

const StyledDescriptionDiv = styled(StyledCentreDiv)`
    min-block-size: calc(130rem / 16);
    padding-block: var(--space);
`;

const StyledDescriptionP = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    font-weight: 450;
    text-wrap: pretty;
    max-inline-size: 70ch;
`;

const StyledCountryP = styled.p`
    font-weight: 250;
    text-align: center;
    padding: calc(var(--space) / 2) var(--space);

    img {
        position: relative;
        inset-block-start: calc(1rem / 16);
        inline-size: 1.5rem;
    }
`;

function Podcasts() {
    const [podcasts, setPodcasts] = useState([]);
    const [options, setOptions] = useState([]);
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

    function findRegion(country) {
        const { region } = options.length && options.find(({ name }) => name === country);
        return region;
    }

    return (
        <main className="wrapper">
            {/* <form onSubmit={event => event.preventDefault()}> */}
            <StyledForm>
                <StyledLabel htmlFor="region">Top Podcasts:</StyledLabel>
                <StyledArrowDiv>
                    <StyledSelect
                        id="region"
                        value={region}
                        onChange={event => setRegion(event.target.value)}
                        // autoComplete="on"
                    >
                        {options.map(({ name, region }) => (
                            <option
                                key={region}
                                value={region}
                            >
                                {name}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledArrowDiv>
            </StyledForm>
            <StyledPodcastsDiv>
                {podcasts.map(({ id, title, publisher, thumbnail, description, country }) => (
                    <StyledArticle key={id}>
                        <StyledHeadingsDiv>
                            <StyledH2>{title}</StyledH2>
                            <StyledH3>
                                <StyledSpan>by</StyledSpan> {publisher}
                            </StyledH3>
                        </StyledHeadingsDiv>
                        <StyledCentreDiv>
                            <StyledImg
                                src={thumbnail}
                                alt={`${title} cover art`}
                                width="300" //url value
                                height="300"
                                // loading="lazy"
                            />
                        </StyledCentreDiv>
                        <StyledDescriptionDiv>
                            <StyledDescriptionP>{stripHtml(description)}</StyledDescriptionP>
                        </StyledDescriptionDiv>
                        <StyledCountryP>
                            Country: {country}{' '}
                            <Flag
                                code={findRegion(country)}
                                // width="24"
                                alt={`${country} flag`}
                            />
                        </StyledCountryP>
                    </StyledArticle>
                ))}
            </StyledPodcastsDiv>
        </main>
    );
}

export default Podcasts;
