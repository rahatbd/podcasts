import { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import styled from 'styled-components';

const StyledCentreDiv = styled.div`
    display: grid;
    justify-items: center;
    padding-inline: var(--space);
`;

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space);
    margin-block-end: var(--space);

    @media (width <= calc(450rem / 16)) {
        flex-direction: column;
    }
`;

const StyledLabel = styled.label`
    font-size: 1.5rem;
    font-weight: 550;
`;

const StyledArrowDiv = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    &::after {
        --border-inline-size: calc(7rem / 16);
        content: '';
        position: absolute;
        right: 5%;
        border-block-start: var(--border-inline-size) solid;
        border-inline: var(--border-inline-size) solid transparent;
        pointer-events: none;
    }
`;

const StyledSelect = styled.select`
    appearance: none;
    background-color: ${({ theme }) => theme.darkTheme.accentColour};
    border: none;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 1.25rem;
    font-weight: 800;
    min-inline-size: calc(250rem / 16);
    padding: 0.5rem 1rem;

    @media (any-hover: hover) {
        &:focus-visible {
            outline: calc(1rem / 16) solid;
            filter: drop-shadow(0 0 calc(2rem / 16));
        }
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

const StyledHeadingsDiv = styled(StyledCentreDiv)`
    align-content: center;
    text-align: center;
    text-wrap: balance;
    min-block-size: calc(110rem / 16);
    border-block-end: var(--border-inline-size) solid ${({ theme }) => theme.darkTheme.accentColour};
`;

const StyledTitleH2 = styled.h2`
    font-size: 1.1rem;
    font-weight: 800;
`;

const StyledPublisherH3 = styled.h3`
    font-size: 1rem;
    font-weight: 300;
`;

const StyledBySpan = styled.span`
    font-style: italic;
    font-weight: 100;
    font-variation-settings: 'opsz' 32;
`;

const StyledImageDiv = styled(StyledCentreDiv)`
    --size: calc(300rem / 16);
    min-block-size: var(--size);
    border-block-end: var(--border-inline-size) solid ${({ theme }) => theme.darkTheme.accentColour};

    @media (width <= calc(400rem / 16)) {
        padding-inline: 0;
    }
`;

const StyledImg = styled.img`
    inline-size: var(--size);
    block-size: var(--size);
`;

const StyledDescriptionDiv = styled(StyledCentreDiv)`
    margin-block: var(--space);
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
                {podcasts.map(({ id, thumbnail, title, publisher, description }) => (
                    <StyledArticle key={id}>
                        <StyledHeadingsDiv>
                            <StyledTitleH2>{title}</StyledTitleH2>
                            <StyledPublisherH3>
                                <StyledBySpan>by</StyledBySpan> {publisher}
                            </StyledPublisherH3>
                        </StyledHeadingsDiv>
                        <StyledImageDiv>
                            <StyledImg
                                src={thumbnail}
                                alt={`${title} cover art`}
                                width="300" //url value
                                height="300"
                                // loading="lazy"
                            />
                        </StyledImageDiv>
                        <StyledDescriptionDiv>
                            <StyledDescriptionP>{stripHtml(description)}</StyledDescriptionP>
                        </StyledDescriptionDiv>
                    </StyledArticle>
                ))}
            </StyledPodcastsDiv>
        </main>
    );
}

export default Podcasts;
