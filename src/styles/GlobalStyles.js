import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #2e2e2e;
    --gray: #e3e3e3;
    --white: #fff;
  }
  html {
    font-size: 10px;
  }
  body {
    font-size: 1.6rem;
    margin: 0 auto;
    max-width: 1440px;
  }
  a {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem 1.5rem;
    text-decoration: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }

  /* *****FORM STYLINGS***** */
  fieldset {
    align-items: center;
    border: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  label {
    align-items: flex-end;
    display: flex;
    max-width: 600px;
    width: 100%;
  }
  input {
    border-radius: 5px;
    padding: 1.5rem 2rem;
    margin: 1rem 0;
    width: 100%;
  }
  button {
    cursor: pointer;
    padding: 1rem 1.5rem;
    margin: 1rem 0;
    max-width: 600px;
    width: 100%;
  }
`;

export default GlobalStyles;