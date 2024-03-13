import errorIcon from '../assets/error.svg';
import styled from 'styled-components';

const StyledSection = styled.section`
    display: grid;
    place-content: center;
    row-gap: 0.5rem;
    block-size: 100%;
`;

const StyledHeadingDiv = styled.div`
    --inline-size: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 0.5rem;
`;

const StyledImg = styled.img`
    inline-size: var(--inline-size);
`;

const StyledH2 = styled.h2`
    font-size: var(--inline-size);
    text-transform: uppercase;
    letter-spacing: calc(3rem / 16);
`;

const StyledMessageDiv = styled.div`
    font-size: 1.25rem;
    line-height: 1.5;
    text-align: center;
`;

function Error({ error }) {
    return (
        <StyledSection aria-labelledby="error-heading">
            <StyledHeadingDiv>
                <StyledImg
                    src={errorIcon}
                    alt="error icon"
                />
                <StyledH2 id="error-heading">Error</StyledH2>
            </StyledHeadingDiv>
            <StyledMessageDiv>
                <p>An unexpected error occurred while processing your request.</p>
                {error.includes('400') && <p>Missing required parameters.</p>}
                {error.includes('401') && <p>Wrong API key.</p>}
                {error.includes('404') && <p>Endpoint, podcast or episode do not exist.</p>}
                {error.includes('429') && <p>The API quota limit has been reached.</p>}
                {error.includes('500') && <p>Internal Server Error.</p>}
                <p>{error.trim()}</p>
            </StyledMessageDiv>
        </StyledSection>
    );
}

export default Error;
