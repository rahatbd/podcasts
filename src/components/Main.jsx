import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import Error from './Error';
import Loading from './Loading';
import Podcasts from './Podcasts';
import styled from 'styled-components';

const StyledLoadingDiv = styled.div`
    display: grid;
    place-items: center;
    block-size: 100%;
`;

const StyledFormDiv = styled.div`
    position: relative;
    text-align: center;
    margin-block-end: 2rem;
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
    font-size: 1.3rem;
    font-weight: 500;
    text-shadow: 0 0 calc(1rem / 16);
`;

const StyledArrowDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    &::before {
        content: '\\00a0';
        position: absolute;
        inset-inline-end: 15%;
        border-inline-start: calc(1rem / 16) solid GrayText;
        z-index: 1;
        pointer-events: none;
    }

    &::after {
        --border-inline-size: 0.5rem;
        --border-radius: 0.125rem;
        content: '';
        position: absolute;
        inset-inline-end: 5%;
        border-block-start: var(--border-inline-size) solid;
        border-inline: var(--border-inline-size) solid transparent;
        border-start-start-radius: var(--border-radius);
        border-start-end-radius: var(--border-radius);
        pointer-events: none;
    }

    &:has(select:disabled)::after {
        border-block-start-color: GrayText;
    }
`;

const StyledSelect = styled.select`
    appearance: none;
    background-color: light-dark(var(--light-colour-accent), var(--dark-colour-accent));
    border: none;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 1.15rem;
    font-weight: 700;
    inline-size: max(250px, 100%);
    text-overflow: ellipsis;
    cursor: pointer;
    padding-block: 0.5rem;
    padding-inline: 1rem 4rem;

    &:focus {
        outline: calc(1rem / 16) solid;
        filter: drop-shadow(0 0 calc(1rem / 16));
    }
`;

const StyledSmall = styled.small`
    font-weight: 300;
    font-variation-settings: 'opsz' 25;
`;

function Main() {
    const [options, setOptions] = useState([]);
    const [region, setRegion] = useLocalStorage('country', 'ca');
    const [getRegions, errorRegions] = useFetch('regions');
    const [getBestPodcasts, errorBestPodcasts, isBestPodcastsLoading] = useFetch(`best_podcasts?region=${region}`);

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
                            <Loading size={225} />
                        </StyledLoadingDiv>
                    )}
                    {Boolean(options.length && getBestPodcasts?.podcasts.length) && (
                        <>
                            <StyledFormDiv>
                                {isBestPodcastsLoading && (
                                    <StyledPodcastsLoadingDiv>
                                        <Loading size="1rem" />
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
                                    Please note that podcasts that are &quot;best&quot; in a country may not be produced in that country.
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
