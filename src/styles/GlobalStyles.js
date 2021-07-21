import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #2e2e2e;
    --gray: #efefef;
    --white: #fff;
  }
  html {
    font-size: 10px;
  }
  body {
    font-size: 1.6rem;
  }
`;

export default GlobalStyles;