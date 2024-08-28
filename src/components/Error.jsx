import styled from 'styled-components';

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

const StyledSvg = styled.svg`
    inline-size: var(--inline-size);

    @media (prefers-reduced-motion: no-preference) {
        --stroke-length: 66;
        stroke-dasharray: var(--stroke-length);
        animation: stroke-dash 10s linear infinite alternate;

        @keyframes stroke-dash {
            from {
                stroke-dashoffset: var(--stroke-length);
            }
            to {
                stroke-dashoffset: 0;
            }
        }
    }
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
        <section
            aria-labelledby="error-heading"
            className="centre"
        >
            <div className="border">
                <StyledHeadingDiv>
                    {/* 
                    Author: basicons
                    Collection: Basicons Interface Line Icons
                    License: MIT License
                    Link: https://www.svgrepo.com/svg/379924/alert-octagon-error

                    Author: Konstantin Filatov
                    Collection: Gentlecons Interface Icons
                    License: CC Attribution License
                    Link: https://www.svgrepo.com/svg/521590/cross
                    */}
                    <StyledSvg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        fill="none"
                        width="1.75rem"
                    >
                        <title>Error</title>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 2H8L2 8V16L8 22H16L22 16V8L16 2Z"
                        />
                        <path
                            fill="currentColor"
                            d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                        />
                    </StyledSvg>
                    <StyledH2 id="error-heading">Error</StyledH2>
                </StyledHeadingDiv>
                <StyledMessageDiv>
                    <p>Whoops! Something didn&apos;t go as planned! 😬</p>
                    <StyledErrorP>{statusCode ? statusCode.message : 'An unhandled exception occurred.'}</StyledErrorP>
                    <p>{error.trim()}</p>
                </StyledMessageDiv>
            </div>
        </section>
    );
}

export default Error;
