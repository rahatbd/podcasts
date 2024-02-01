import { flexCentre } from '../GlobalStyle';
import newTabIcon from '../assets/new-tab.svg';
import listenNotes from '../assets/listen-notes-white.png';
import styled from 'styled-components';

// const StyledCopyrightLinksDiv = styled.div`
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: var(--space);
//     text-align: center;
// `;

const StyledCopyrightLinksDiv = styled.div`
    ${flexCentre}
`;

const StyledSmall = styled.small`
    font-size: 100%;
    font-weight: 300;
`;

const StyledUl = styled.ul`
    /* flex */
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: calc(var(--space) / 2);
`;

const StyledLi = styled.li`
    list-style-type: none;

    &:first-child::after {
        content: '|';
        display: inline-block;
        vertical-align: middle;
        rotate: 15deg;
        margin-inline-start: calc(var(--space) / 2);
    }
`;

const StyledLinksA = styled.a`
    text-underline-offset: 0.25rem;

    &:visited {
        color: ${({ theme }) => theme.darkTheme.visitedColour};
    }

    /* @media (any-hover: hover) {} */
    &:hover {
        text-decoration-style: wavy;
    }

    &:focus-visible {
        outline: calc(1rem / 16) dashed;
        outline-offset: 0.25rem;
        border-radius: 0.25rem;
        text-decoration-line: none;
    }

    &:active {
        font-weight: 450;
    }

    ${StyledLi}:has(&:where(:hover, :focus-visible)) + ${StyledLi} &,
    ${StyledLi}:has(+ * &:where(:hover, :focus-visible)) & {
        opacity: 0.5;
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
        outline: calc(1rem / 16) dashed;
        outline-offset: 0.5rem;
        border-radius: 0.25rem;
    }
`;

const StyledListenNotesImg = styled.img`
    inline-size: calc(300rem / 16);
    aspect-ratio: 10;
`;

function Footer() {
    return (
        <footer>
            <div className="wrapper">
                <StyledCopyrightLinksDiv>
                    <p>
                        <StyledSmall>&copy; Rahat Rahman 2024</StyledSmall>
                    </p>
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
                            src={listenNotes}
                            alt="powered by LISTEN NOTES"
                        />
                    </StyledListenNotesA>
                </StyledListenNotesDiv>
            </div>
        </footer>
    );
}

export default Footer;
