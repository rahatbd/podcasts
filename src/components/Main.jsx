import { useState, useEffect } from 'react';
import { CircleLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';
import useLocalStorage from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import Error from './Error';
import Podcasts from './Podcasts';

const StyledLoadingDiv = styled.div`
    display: grid;
    place-items: center;
    block-size: 100%;
    cursor: progress;
`;

const StyledFormDiv = styled.div`
    position: relative;
    text-align: center;
    margin-block: 1rem 2rem;
`;

const StyledPodcastsLoadingDiv = styled.div`
    position: absolute;
    inset-block-start: -1.5rem;
    display: flex;
    justify-content: center;
    inline-size: 100%;
`;

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-block-end: 0.25rem;
`;

const StyledLabel = styled.label`
    font-size: 1.5rem;
    font-weight: 550;
    text-shadow: 0 0 calc(1rem / 16);
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

    &:has(select:disabled)::after {
        border-block-start-color: GrayText;
    }
`;

const StyledSelect = styled.select`
    appearance: none;
    background-color: ${({ theme }) => theme.accentColour};
    border: none;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 1.25rem;
    font-weight: 800;
    inline-size: max(250px, 100%);
    cursor: pointer;
    padding-block: 0.5em;
    padding-inline: 1em 2em;

    &:focus {
        outline: calc(1rem / 16) solid;
        filter: drop-shadow(0 0 calc(1rem / 16));
    }

    &:disabled {
        cursor: progress;
    }
`;

const StyledSmall = styled.small`
    font-weight: 250;
    font-variation-settings: 'opsz' 25;
`;

function Main({ isReducedMotion }) {
    const [options, setOptions] = useState([]);
    const [region, setRegion] = useLocalStorage('country', 'ca');
    const [getRegions, errorRegions] = useFetch('regions');
    const [getBestPodcasts, errorBestPodcasts, isBestPodcastsLoading] = useFetch(`best_podcasts?region=${region}`);
    const theme = useTheme();

    useEffect(() => {
        if (!getRegions) return;
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
    }, [getRegions]);

    return (
        <main className="wrapper">
            {errorRegions || errorBestPodcasts ? (
                <Error error={errorRegions || errorBestPodcasts} />
            ) : (
                <>
                    {Boolean(!options.length || !getBestPodcasts?.podcasts.length) && (
                        <StyledLoadingDiv>
                            <CircleLoader
                                aria-label="loading"
                                color={theme.textColour}
                                size="12rem"
                                speedMultiplier={isReducedMotion ? 0.25 : 1}
                            />
                        </StyledLoadingDiv>
                    )}
                    {Boolean(options.length && getBestPodcasts?.podcasts.length) && (
                        <>
                            <StyledFormDiv>
                                {isBestPodcastsLoading && (
                                    <StyledPodcastsLoadingDiv>
                                        <CircleLoader
                                            aria-label="podcasts loading"
                                            color={theme.textColour}
                                            size="1rem"
                                            speedMultiplier={isReducedMotion ? 0.25 : 1}
                                        />
                                    </StyledPodcastsLoadingDiv>
                                )}
                                <StyledForm>
                                    <StyledLabel htmlFor="region">Best Podcasts</StyledLabel>
                                    <StyledArrowDiv>
                                        <StyledSelect
                                            autoComplete="on"
                                            id="region"
                                            value={region}
                                            onChange={event => setRegion(event.target.value)}
                                            disabled={isBestPodcastsLoading}
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
                                <StyledSmall>
                                    Please note that podcasts that are &quot;best&quot; in a country may not be produced
                                    in that country.
                                </StyledSmall>
                            </StyledFormDiv>
                            <Podcasts
                                options={options}
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
