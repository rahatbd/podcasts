import styled, { useTheme } from 'styled-components';
import listenNotesBlack from '../assets/listen-notes-black.png';
import listenNotesWhite from '../assets/listen-notes-white.png';

const StyledCopyrightLinksDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space);
    text-align: center;
`;

const StyledP = styled.p`
    font-weight: 350;
`;

const StyledUl = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space);
`;

const StyledLi = styled.li`
    list-style-type: none;
`;

const StyledLinksA = styled.a`
    position: relative;
    text-decoration-line: none;

    &::before,
    &::after {
        content: '';
        position: absolute;
        inset-inline-start: 0;
        inset-block-end: calc(-2rem / 16);
        display: block;
        inline-size: 100%;
        block-size: calc(1rem / 16);
        background-color: ${({ theme }) => theme.textColour};
        transition: transform 1.25s cubic-bezier(0.19, 1, 0.22, 1);

        @media (prefers-reduced-motion: reduce) {
            transition-duration: 3.5s;
        }
    }

    &::before {
        transform: scaleX(0);
        transform-origin: left;
    }

    &::after {
        transform-origin: right;
        transition-delay: 0.25s;
    }

    &:visited {
        color: color-mix(in oklab, currentColor, ${({ theme }) => theme.visitedColour});

        &::before,
        &::after {
            background-color: color-mix(in oklab, currentColor, ${({ theme }) => theme.visitedColour});
        }
    }

    /* @media (any-hover: hover) {} */
    &:hover {
        &::before {
            transform: scaleX(1);
            transition-delay: 0.25s;
        }

        &::after {
            transform: scaleX(0);
            transition-delay: 0s;
        }
    }

    &:focus-visible {
        &::before,
        &::after {
            content: none;
        }
    }

    ${StyledLi}:has(&:where(:hover, :focus-visible)) + ${StyledLi} &,
    ${StyledLi}:has(+ ${StyledLi} &:where(:hover, :focus-visible)) & {
        opacity: 0.65;
    }

    &:active {
        color: ActiveText;
        font-style: italic;

        &::before,
        &::after {
            background-color: ActiveText;
        }
    }
`;

const StyledSvg = styled.svg`
    position: relative;
    inset-block-end: calc(-1rem / 16);
    inline-size: 0.75lh;
    margin-inline-start: 0.25rem;
`;

const StyledListenNotesDiv = styled.div`
    text-align: center;
    margin-block-start: var(--space);
`;

const StyledListenNotesA = styled.a`
    display: inline-block;

    &:hover {
        rotate: ${Math.random() < 0.5 ? -1 : 1}deg;
    }
`;

const StyledListenNotesImg = styled.img`
    inline-size: calc(175rem / 16);
    aspect-ratio: 10;
`;

function Footer() {
    const theme = useTheme();

    return (
        <footer>
            <div className="wrapper">
                <StyledCopyrightLinksDiv>
                    <StyledP>&copy; Rahat Rahman 2024</StyledP>
                    <StyledUl>
                        <StyledLi>
                            <StyledLinksA href="/">Portfolio</StyledLinksA>
                        </StyledLi>
                        <StyledLi>
                            <StyledLinksA
                                href="https://github.com/rahatbd/podcasts"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                                <StyledSvg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    aria-label="open in a new tab"
                                    role="img"
                                    fill="currentColor"
                                    width={16}
                                >
                                    <title>New Tab</title>
                                    <g>
                                        <path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z" />
                                        <path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z" />
                                    </g>
                                    <polygon points="26 6 26 2 24 2 24 6 20 6 20 8 24 8 24 12 26 12 26 8 30 8 30 6 26 6" />
                                </StyledSvg>
                            </StyledLinksA>
                        </StyledLi>
                    </StyledUl>
                </StyledCopyrightLinksDiv>
                <StyledListenNotesDiv>
                    <StyledListenNotesA
                        aria-label="Listen Notes API"
                        href="https://www.listennotes.com/api"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <StyledListenNotesImg
                            src={theme.name === 'dark' ? listenNotesWhite : listenNotesBlack}
                            alt="powered by LISTEN NOTES"
                        />
                    </StyledListenNotesA>
                </StyledListenNotesDiv>
            </div>
        </footer>
    );
}

export default Footer;
