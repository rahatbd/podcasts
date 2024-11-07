import useLoadingTimeout from '../hooks/useLoadingTimeout';
import Loading from './Loading';
import styled from 'styled-components';

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
    opacity: ${({ $isBestPodcastsLoading }) => ($isBestPodcastsLoading ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
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
    inline-size: max(190px, 100%);
    text-overflow: ellipsis;
    cursor: pointer;
    padding-block: 0.5rem;
    padding-inline: 1rem 4rem;

    &:focus {
        outline: calc(1rem / 16) solid;
        outline-offset: 0; //safari fix
        filter: drop-shadow(0 0 calc(1rem / 16));
    }
`;

const StyledSmall = styled.small`
    font-weight: 300;
    font-variation-settings: 'opsz' 25;
`;

function Form({ regions, region, setRegion, isBestPodcastsLoading }) {
    const isLoading = useLoadingTimeout(isBestPodcastsLoading);

    return (
        <StyledFormDiv className="blur">
            {isLoading && (
                <StyledPodcastsLoadingDiv $isBestPodcastsLoading={isBestPodcastsLoading}>
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
                        {regions.map(({ name, region }) => (
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
            <StyledSmall>Please note that podcasts that are &quot;best&quot; in a country may not be produced in that country.</StyledSmall>
        </StyledFormDiv>
    );
}

export default Form;
