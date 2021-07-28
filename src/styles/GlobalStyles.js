import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #2e2e2e;
    --gray: #e3e3e3;
    --main-bg-color: #3E3B39;
    --secondary-bg-color: #525c6e;
    --white: #F2F2F2;
  }
  html {
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
  }
  body {
    background-color: var(--main-bg-color);
    color: var(--white);
    font-size: 1.6rem;
    margin: 0 auto;
    max-width: 1440px;
  }
  main {
    padding: 1rem;
  }
  h1,h2,h3,h4,h5,h6 {
    text-align: center;
  }
  a {
    color: var(--white);
    padding: 1rem 1.5rem;
    text-decoration: none;
  }
  ul {
    margin: 0;
    padding: 0;
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
    margin: 1rem 0;
    padding: 1.5rem 2rem;
    width: 100%;
  }
  button {
    background: transparent;
    border: none;
    color: var(--white);
    cursor: pointer;
    margin: 0;
    padding: 1rem 1.5rem;
  }
  /* *****END FORM STYLINGS***** */

  /* *****MODAL-OVERLAY STYLINGS***** */
  .modal-overlay {
    background-color: #000;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: .7;
    position: fixed;
    z-index: 100;
  }
  /* *****END MODAL-OVERLAY STYLINGS***** */
`;

export default GlobalStyles;
