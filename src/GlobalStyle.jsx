import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/*----------------------------------------------------------------------------------------------------------------------------*/
/*                                                        SETUP STYLES                                                        */
/*----------------------------------------------------------------------------------------------------------------------------*/

/* modern-normalize v2.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */
@layer{*,::before,::after{box-sizing:border-box}html{font-family:system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";line-height:1.15;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4}hr{height:0;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}}

/* minireset v0.0.6 | MIT License | https://github.com/jgthms/minireset.css */
html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}

/*----------------------------------------------------------------------------------------------------------------------------*/
/*                                                        BASE STYLES                                                         */
/*----------------------------------------------------------------------------------------------------------------------------*/

@font-face {
    font-family: Decovar;
    font-display: swap;
    src: url(Decovar.woff2) format(woff2) tech(variations);
}

@font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(InterVariable-v4.woff2) format(woff2) tech(variations);
}

@font-face {
    font-family: Inter;
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url(InterVariableItalic-v4.woff2) format(woff2) tech(variations);
}

body {
    font-family: Inter, ui-sans-serif, system-ui, sans-serif, "Twemoji Mozilla", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-feature-settings: "cv06", "cv11", "ss01", "ss03", "ss04";
    background-color: ${({ theme }) => theme.backgroundColour};
    color: ${({ theme }) => theme.textColour};
}

#root {
    --space: 1rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: [full-width-start] 1fr [wrapper-start] min(1250px, 100% - 2 * var(--space)) [wrapper-end] 1fr [full-width-end];
    gap: var(--space);
    min-block-size: 100svb;
}

header, footer {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: full-width;
    background-color: ${({ theme }) => theme.accentColour};
    padding-block: var(--space);
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
}

p {
    text-wrap: pretty;
}

a {
    color: inherit;
}

::selection {
    background-color: ${({ theme }) => theme.textColour};
    color: ${({ theme }) => theme.backgroundColour};
}
`;

export default GlobalStyle;
