import reactIcon from '../assets/react.svg';
import styledComponentsIcon from '../assets/styled-components.svg';
import viteIcon from '../assets/vite.svg';
import netlifyIcon from '../assets/netlify.svg';
import listenNotesBlack from '../assets/listen-notes-black.png';
import listenNotesWhite from '../assets/listen-notes-white.png';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    /* https://css-generators.com/custom-borders */
    mask: radial-gradient(2.24rem at 50% 3rem, #000 99%, #0000 101%) calc(50% - 2rem) 0/4rem 100%,
        radial-gradient(2.24rem at 50% -2rem, #0000 99%, #000 101%) 50% 1rem/4rem 100% repeat-x;
    padding-block: 2rem 1rem;
`;

const StyledCentreDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--gap);
`;

const StyledP = styled.p`
    font-weight: 350;
    text-align: center;
`;

const StyledLi = styled.li`
    list-style-type: none;
`;

const StyledLinksA = styled.a`
    position: relative;
    text-decoration-line: none;
    white-space: nowrap;

    &::before,
    &::after {
        content: '';
        position: absolute;
        inset-inline-start: 0;
        inset-block-end: calc(-2rem / 16);
        display: block;
        inline-size: 100%;
        block-size: calc(1rem / 16);
        background-color: light-dark(var(--dark-colour), var(--light-colour));
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
        color: var(--visited-colour);

        &::before,
        &::after {
            background-color: var(--visited-colour);
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

    &:focus-visible,
    &:active,
    ${StyledLi}:has(&:where(:hover, :focus-visible)) + ${StyledLi} &,
    ${StyledLi}:has(+ ${StyledLi} &:where(:hover, :focus-visible)) & {
        &::before,
        &::after {
            content: none;
        }
    }

    ${StyledLi}:has(&:where(:hover, :focus-visible)) + ${StyledLi} &,
    ${StyledLi}:has(+ ${StyledLi} &:where(:hover, :focus-visible)) & {
        filter: blur(calc(1rem / 16));
    }

    &:active {
        opacity: 0.8;
    }
`;

const StyledSvg = styled.svg`
    inline-size: 0.75lh;
    transform: translateY(calc(1.5rem / 16));
    margin-inline-start: 0.25rem;
`;

const StyledIconsDiv = styled(StyledCentreDiv)`
    margin-block: 0.5rem;
`;

const StyledIconImg = styled.img`
    aspect-ratio: 1;
`;

const StyledReactImg = styled(StyledIconImg)`
    inline-size: 1.5rem;
`;

const StyledComponentsImg = styled(StyledIconImg)`
    inline-size: 3rem;
`;

const StyledViteImg = styled(StyledIconImg)`
    inline-size: 1.5rem;
`;

const StyledNetlifyImg = styled(StyledIconImg)`
    inline-size: 2rem;
`;

const StyledListenNotesDiv = styled.div`
    text-align: center;
`;

const StyledListenNotesA = styled.a`
    display: inline-block;

    &:hover {
        rotate: ${Math.random() < 0.5 ? -1 : 1}deg;
    }
`;

const StyledListenNotesImg = styled.img`
    inline-size: calc(250rem / 16);
    aspect-ratio: 10;
`;

function Footer() {
    return (
        <StyledFooter>
            <div className="wrapper">
                <StyledCentreDiv>
                    <StyledP>&copy; Rahat Rahman 2024</StyledP>
                    <StyledCentreDiv as="ul">
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
                                {/*
                                Author: Carbon Design
                                Collection: Carbon Design Line Icons
                                License: Apache License
                                Link: https://www.svgrepo.com/svg/340719/new-tab
                                */}
                                <StyledSvg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    aria-labelledby="title"
                                    role="img"
                                    fill="currentColor"
                                    width="0.75lh"
                                >
                                    <title id="title">New Tab</title>
                                    <g>
                                        <path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z" />
                                        <path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z" />
                                    </g>
                                    <polygon points="26 6 26 2 24 2 24 6 20 6 20 8 24 8 24 12 26 12 26 8 30 8 30 6 26 6" />
                                </StyledSvg>
                            </StyledLinksA>
                        </StyledLi>
                    </StyledCentreDiv>
                </StyledCentreDiv>
                <StyledIconsDiv>
                    <StyledReactImg
                        alt="React icon"
                        src={reactIcon}
                        title="React"
                        width={24}
                        height={24}
                        loading="lazy"
                    />
                    <StyledComponentsImg
                        alt="styled-components icon"
                        src={styledComponentsIcon}
                        title="styled-components"
                        width={48}
                        height={48}
                        loading="lazy"
                    />
                    <StyledViteImg
                        alt="Vite icon"
                        src={viteIcon}
                        title="Vite"
                        width={24}
                        height={24}
                        loading="lazy"
                    />
                    <StyledNetlifyImg
                        alt="Netlify icon"
                        src={netlifyIcon}
                        title="Netlify"
                        width={32}
                        height={32}
                        loading="lazy"
                    />
                </StyledIconsDiv>
                <StyledListenNotesDiv>
                    <StyledListenNotesA
                        aria-label="Listen Notes API"
                        href="https://www.listennotes.com/api"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <picture>
                            <source
                                srcSet={listenNotesBlack}
                                media="(prefers-color-scheme: light)"
                            />
                            <StyledListenNotesImg
                                alt="powered by LISTEN NOTES"
                                src={listenNotesWhite}
                                width={250}
                                height={25}
                                loading="lazy"
                            />
                        </picture>
                    </StyledListenNotesA>
                </StyledListenNotesDiv>
            </div>
        </StyledFooter>
    );
}

export default Footer;
