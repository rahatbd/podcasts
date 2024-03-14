import errorIcon from '../assets/error.svg';
import styled from 'styled-components';

const StyledSection = styled.section`
    display: grid;
    place-content: center;
    block-size: 100%;
`;

const StyledHeadingDiv = styled.div`
    --inline-size: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    border-block-end: var(--border-inline-size) solid ${({ theme }) => theme.accentColour};
    padding-block: var(--space);
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
    font-weight: 200;
    line-height: 1.5;
    text-align: center;
    padding: var(--space) 2rem;
`;

const StyledErrorP = styled.p`
    font-style: italic;
    font-weight: 700;
    margin-block: 0.5rem;
`;

function Error({ error }) {
    return (
        <StyledSection aria-labelledby="error-heading">
            <div className="border">
                <StyledHeadingDiv>
                    <StyledImg
                        src={errorIcon}
                        alt="error icon"
                    />
                    <StyledH2 id="error-heading">Error</StyledH2>
                </StyledHeadingDiv>
                <StyledMessageDiv>
                    <p>An unexpected error occurred while processing your request.</p>
                    {error.includes('400') && <StyledErrorP>Missing required parameters.</StyledErrorP>}
                    {error.includes('401') && <StyledErrorP>Wrong API key.</StyledErrorP>}
                    {error.includes('404') && <StyledErrorP>Endpoint, podcast or episode do not exist.</StyledErrorP>}
                    {error.includes('429') && <StyledErrorP>The API quota limit has been reached.</StyledErrorP>}
                    {error.includes('500') && <StyledErrorP>Internal Server Error.</StyledErrorP>}
                    <p>{error.trim()}</p>
                </StyledMessageDiv>
            </div>
        </StyledSection>
    );
}

export default Error;
