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
`;

const StyledFormDiv = styled.div`
    position: relative;
    margin-block: var(--space) 2rem;
`;

const StyledPodcastsLoadingDiv = styled.div`
    display: grid;
    justify-items: center;
    position: absolute;
    inset-block-start: -1.4rem;
    inline-size: 100%;
`;

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
    text-align: center;
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
    --inline-size: 250px;
    appearance: none;
    background-color: ${({ theme }) => theme.accentColour};
    border: none;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 1.25rem;
    font-weight: 800;
    inline-size: max(var(--inline-size), 100%);
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:focus {
        outline: calc(1rem / 16) solid;
        filter: drop-shadow(0 0 calc(1rem / 16));
    }
`;

const StyledP = styled.p`
    font-size: small;
    font-style: italic;
    font-weight: 250;
    font-variation-settings: 'opsz' 25;
    text-align: center;
    margin-block-start: 0.5rem;
`;

function Main({ isReducedMotion }) {
    const [options, setOptions] = useState([]);
    const [region, setRegion] = useLocalStorage('ca', 'country');
    const [getRegions] = useFetch('regions');
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
            {errorBestPodcasts ? (
                <Error error={errorBestPodcasts} />
            ) : (
                <>
                    {Boolean(!options.length || !getBestPodcasts?.podcasts.length) && (
                        <StyledLoadingDiv>
                            <CircleLoader
                                aria-label="loading"
                                color={theme.textColour}
                                size={150}
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
                                            size={15}
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
                                <StyledP>
                                    Please note that podcasts that are &quot;best&quot; in a country may not be
                                    produced in that country.
                                </StyledP>
                            </StyledFormDiv>
                            <Podcasts
                                bestPodcasts={getBestPodcasts}
                                options={options}
                            />
                        </>
                    )}
                </>
            )}
        </main>
    );
}

export default Main;
