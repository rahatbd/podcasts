import styled from 'styled-components';

const StyledHeader = styled.header`
    @media screen {
        /* https://css-generators.com/custom-borders */
        mask: radial-gradient(2.24rem at 50% calc(100% - 3rem), #000 99%, #0000 101%) calc(50% - 2rem) 0/4rem 100%, radial-gradient(2.24rem at 50% calc(100% + 2rem), #0000 99%, #000 101%) 50% calc(100% - 1rem) / 4rem 100% repeat-x;
        padding-block: 1rem 2rem;
    }
`;

const StyledH1 = styled.h1`
    font-family: Decovar, Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(2rem, 1.8rem + 1vi, 3rem);
    font-weight: 500;
    letter-spacing: calc(2rem / 16);
    text-align: center;
    text-transform: uppercase;

    @media screen {
        --text-shadow: 0 0 calc(2rem / 16);
        text-shadow: var(--text-shadow);

        @media (prefers-reduced-motion: no-preference) {
            animation: worm 8s linear infinite alternate;

            @keyframes worm {
                from {
                    font-variation-settings: 'SWRM' 0, 'TWRM' 0;
                    text-shadow: none;
                }
                to {
                    font-variation-settings: 'SWRM' 1000, 'TWRM' 1000;
                    text-shadow: var(--text-shadow);
                }
            }
        }
    }

    @media print {
        transform: translateY(0.25rem);
    }
`;

function Header() {
    return (
        <StyledHeader className="blur">
            <div className="wrapper">
                <StyledH1>Podcasts</StyledH1>
            </div>
        </StyledHeader>
    );
}

export default Header;
