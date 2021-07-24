import React, { useState } from "react";
import styled from "styled-components";

import Login from "../components/Login.jsx";
import Registration from "../components/Registration.jsx";

const LandingPageStyles = styled.section`
  border: 1px solid black;
  border-radius: 5px;
  padding: 2rem 6rem;
  margin: 10rem auto 0;
  max-width: 630px;
  text-align: center;
  .or-wrapper {
    border-top: 1px solid #cbd2d6;
    margin: 2rem 0 1rem;
    position: relative;
    span {
      background-color: #fff;
      padding: 0 0.5rem;
      position: relative;
      top: -1.4rem;
    }
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
