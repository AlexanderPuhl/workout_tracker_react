import React, { useState } from "react";
import styled from "styled-components";

import Login from "../components/Login.jsx";
import Registration from "../components/Registration.jsx";

const LandingPageStyles = styled.section`
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 1rem 2rem;
  margin: 1rem auto 0;
  max-width: 630px;
  text-align: center;
  h1 {
    font-size: 2.5rem;
    margin: 0;
  }
  .or-wrapper {
    border-top: 1px solid var(--gray);
    margin: 2rem 0 0;
    position: relative;
    span {
      background-color: var(--main-bg-color);
      padding: 0 0.5rem;
      position: relative;
      top: -1.4rem;
    }
  }
  button {
    background-color: var(--white);
    border: 1px solid var(--white);
    border-radius: 5px;
    color: var(--black);
    margin: 1rem 0;
    width: 100%;
  }
`;

export default function LandingPage() {
  const [form, setForm] = useState(true);
  let userForm;
  if (form) {
    userForm = <Login />;
  } else {
    userForm = <Registration />;
  }
  return (
    <LandingPageStyles>
      <h1>Welcome to the workout tracker App</h1>
      {userForm}
      <div className="or-wrapper">
        <span>or</span>
      </div>
      <button type="button" onClick={() => setForm(!form)}>
        {form ? "Register" : "Login"}
      </button>
    </LandingPageStyles>
  );
}
