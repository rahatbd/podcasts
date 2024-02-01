import styled from 'styled-components';

const StyledH1 = styled.h1`
    --text-shadow: 0 0 0.25rem;
    font-family: Decovar, Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 2.5rem;
    font-weight: 500;
    letter-spacing: calc(2rem / 16);
    text-align: center;
    text-shadow: var(--text-shadow);
    text-transform: uppercase;
    /* https://caniuse.com/?search=overflow-inline */
    overflow-x: auto;
    overflow-inline: auto;

    /* https://caniuse.com/?search=overflow-inline */
    /* @supports not (overflow-inline: auto) {
        overflow-x: auto;
    } */

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
`;

function Header() {
    return (
        <header>
            <div className="wrapper">
                <StyledH1>Podcasts</StyledH1>
            </div>
        </header>
    );
}

export default Header;
