import errorIcon from '../assets/error.svg';
import styled from 'styled-components';

const StyledSection = styled.section`
    display: grid;
    place-items: center;
    block-size: 100%;
`;

const StyledHeadingDiv = styled.div`
    --inline-size: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    border-block-end: var(--border-inline-size) solid light-dark(var(--light-colour-accent), var(--dark-colour-accent));
    padding: 1rem;
`;

const StyledImg = styled.img`
    inline-size: var(--inline-size);
`;

const StyledH2 = styled.h2`
    font-size: var(--inline-size);
    text-transform: uppercase;
    letter-spacing: calc(3rem / 16);
    text-shadow: 0 0 calc(1rem / 16);
`;

const StyledMessageDiv = styled.div`
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.5;
    text-align: center;
    padding: 1rem 2rem;
`;

const StyledErrorP = styled.p`
    font-size: 1.35rem;
    font-weight: 700;
    text-shadow: 0 0 calc(0.5rem / 16);
    margin-block: 0.5rem;
`;

function Error({ error }) {
    const statusCodes = [
        { status: '400', message: 'Missing required parameters.' },
        { status: '401', message: 'Wrong API key.' },
        { status: '404', message: 'Endpoint, podcast or episode do not exist.' },
        { status: '429', message: 'The API quota limit has been reached.' },
        { status: '500', message: 'An unexpected server error occurred.' },
        { status: 'timed out', message: 'The server took too long to respond.' },
    ];
    const statusCode = statusCodes.find(({ status }) => error.includes(status));

    return (
        <StyledSection aria-labelledby="error-heading">
            <div className="border">
                <StyledHeadingDiv>
                    <StyledImg
                        alt="error icon"
                        src={errorIcon}
                        width={28}
                    />
                    <StyledH2 id="error-heading">Error</StyledH2>
                </StyledHeadingDiv>
                <StyledMessageDiv>
                    <p>Whoops! Something didn&apos;t go as planned! 😬</p>
                    <StyledErrorP>{statusCode ? statusCode.message : 'An unhandled exception occurred.'}</StyledErrorP>
                    <p>{error.trim()}</p>
                </StyledMessageDiv>
            </div>
        </StyledSection>
    );
}

export default Error;
