import styled, { useTheme } from 'styled-components';
import newTabIcon from '../assets/new-tab.svg';
import listenNotesBlack from '../assets/listen-notes-black.png';
import listenNotesWhite from '../assets/listen-notes-white.png';

const StyledCopyrightLinksDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space);
    text-align: center;
`;

const StyledSmall = styled.small`
    font-size: 100%;
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

    &:first-child::after {
        content: '|';
        display: inline-block;
        vertical-align: middle;
        rotate: 15deg;
        margin-inline-start: var(--space);
    }
`;

const StyledLinksA = styled.a`
    text-underline-offset: 0.25rem;

    &:visited {
        color: ${({ theme }) => theme.visitedColour};
    }

    /* @media (any-hover: hover) {} */
    &:hover {
        text-decoration-style: wavy;
    }

    /* global */
    &:focus-visible {
        outline: calc(2rem / 16) solid;
        outline-offset: 0.25rem;
        border-radius: 0.25rem;
        text-decoration-line: none;
    }

    ${StyledLi}:has(&:where(:hover, :focus-visible)) + ${StyledLi} &,
    ${StyledLi}:has(+ ${StyledLi} &:where(:hover, :focus-visible)) & {
        opacity: 0.65;
    }

    &:active {
        font-style: italic;
    }
`;

const StyledNewTabImg = styled.img`
    inline-size: 0.75lh;
    margin-inline-start: calc(var(--space) / 2);
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

    &:focus-visible {
        outline: calc(2rem / 16) dashed;
        outline-offset: 0.25rem;
        border-radius: 0.25rem;
    }
`;

const StyledListenNotesImg = styled.img`
    inline-size: calc(250rem / 16);
    aspect-ratio: 10;
`;

function Footer() {
    const theme = useTheme();

    return (
        <footer>
            <div className="wrapper">
                <StyledCopyrightLinksDiv>
                    <StyledSmall>&copy; Rahat Rahman 2024</StyledSmall>
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
                            </StyledLinksA>
                            <StyledNewTabImg
                                src={newTabIcon}
                                alt="new tab icon"
                            />
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
