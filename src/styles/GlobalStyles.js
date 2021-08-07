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
  }
  main {
    margin: 0 auto;
    max-width: 1440px;
    padding: 1rem;
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

  /* *****MODAL STYLINGS***** */
  .modal {
    background-color: var(--main-bg-color);
    border: 1px solid var(--gray);
    border-radius: 5px;
    color: var(--white);
    left: 50%;
    max-width: 1280px;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    z-index: 101;
  }
  /* *****END MODAL-OVERLAY STYLINGS***** */

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

  @media (min-width: 600px) {
    main {
      padding: 1rem 1.5rem;
    }
  }
`;

export default GlobalStyles;
