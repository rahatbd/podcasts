import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/*----------------------------------------------------------------------------------------------------------------------------*/
/*                                                        SETUP STYLES                                                        */
/*----------------------------------------------------------------------------------------------------------------------------*/

/* modern-normalize v3.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */
@layer{*,::before,::after{box-sizing:border-box}html{font-family:system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';line-height:1.15;-webkit-text-size-adjust:100%;tab-size:4}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-color:currentcolor}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,[type='button'],[type='reset'],[type='submit']{-webkit-appearance:button}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type='search']{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}}

/* minireset v0.0.6 | MIT License | https://github.com/jgthms/minireset.css */
html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}

/*----------------------------------------------------------------------------------------------------------------------------*/
/*                                                        BASE STYLES                                                         */
/*----------------------------------------------------------------------------------------------------------------------------*/

@page {
    size: letter portrait;
}

@font-face {
    font-family: Decovar;
    font-display: swap;
    src: url("fonts/Decovar.woff2") format(woff2) tech(variations);
}

@font-face {
    font-family: Inter;
    font-display: swap;
    font-style: normal;
    font-weight: 100 900;
    src: url("fonts/InterVariable-v4.1.woff2") format(woff2) tech(variations);
}

@font-face {
    font-family: Inter;
    font-display: swap;
    font-style: italic;
    font-weight: 100 900;
    src: url("fonts/InterVariableItalic-v4.1.woff2") format(woff2) tech(variations);
}

html {
    --dark-colour: oklch(16.84% 0 0);
    --dark-colour-accent: oklch(22.84% 0.038 282.93);
    --dark-colour-visited: oklch(59.99% 0 0);
    --light-colour: oklch(98.95% 0.009 78.28);
    --light-colour-accent: oklch(95.56% 0.016 73.68);
    --light-colour-visited: oklch(64.01% 0.155 294.18);
    --visited-colour: color-mix(in oklab, currentColor, light-dark(var(--light-colour-visited), var(--dark-colour-visited)) 55%);
    --gap: 1rem;
    scrollbar-color: light-dark(oklch(from var(--dark-colour) 65% c h), oklch(from var(--light-colour) 65% c h)) light-dark(var(--light-colour-accent), var(--dark-colour-accent));
}

body {
    font-family: Inter, ui-sans-serif, system-ui, sans-serif, "Twemoji Mozilla", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-feature-settings: "cv06", "cv11", "ss01", "ss03", "ss04";
    background-color: light-dark(var(--light-colour), var(--dark-colour));
    color: light-dark(var(--dark-colour), var(--light-colour));

    &:has([aria-label="loading"]) {
        cursor: progress;
    }
}

#root {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: [full-width-start] 1fr [wrapper-start] min(1250px, 100% - 2 * var(--gap)) [wrapper-end] 1fr [full-width-end];
    gap: var(--gap);
    min-block-size: 100svb;
}

header,
footer {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: full-width;
    background-color: light-dark(var(--light-colour-accent), var(--dark-colour-accent));
    padding-block: 1rem;
}

.wrapper {
    grid-column: wrapper;
}

img {
    max-inline-size: 100%;
    block-size: auto;
    vertical-align: middle;

    &[alt] {
        font-style: italic;
        font-weight: 200;
    }

    @media (prefers-color-scheme: dark) {
        filter: brightness(85%);
    }
}

a {
    color: inherit;

    &:focus-visible {
        outline: calc(1rem / 16) solid;
        outline-offset: 0.25rem;
        border-radius: 0.25rem;
    }
}

p {
    text-wrap: pretty;
}

.border {
    --border-inline-size: calc(1.5rem / 16);
    border: var(--border-inline-size) solid light-dark(var(--light-colour-accent), var(--dark-colour-accent));
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem light-dark(var(--light-colour-accent), var(--dark-colour-accent));
}

.blur {
    filter: revert;
    transition: filter 0.5s ease-in;

    @starting-style {
        filter: blur(2px);
    }
}

.centre {
    display: grid;
    place-items: center;
    block-size: 100%;
}

::selection {
    background-color: light-dark(var(--dark-colour), var(--light-colour));
    color: light-dark(var(--light-colour), var(--dark-colour));
}
`;

export default GlobalStyle;
