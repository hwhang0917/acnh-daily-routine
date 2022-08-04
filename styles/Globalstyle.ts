import { createGlobalStyle } from "styled-components";
import ResetCSS from "./ResetCSS";

const GlobalStyle = createGlobalStyle`
    ${ResetCSS}
    @font-face {
        font-family: 'CookieRun-Regular';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'CookieRun-Regular';
    }
`;

export default GlobalStyle;
