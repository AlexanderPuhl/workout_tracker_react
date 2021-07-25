import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import useAuthentication from "../hooks/useAuthentication";
import { useAuthenticated } from "../context/auth-context.jsx";
import useForm from "../hooks/useForm";

const LoginPageStyles = styled.div``;

function LoginPage() {
  const { setAuthenticated } = useAuthenticated();
  const history = useHistory();
  const { values, updateValue } = useForm({
    username: "alex",
    password: "thinkful123",
  });

  const { error, loading, submitLogin } = useAuthentication({
    values,
  });

  async function handleClick(e) {
    e.preventDefault();
    const authToken = await submitLogin(values);
    if (authToken) {
      setAuthenticated(true);
      history.push("/dashboard");
    }
  }

  return (
    <LoginPageStyles>
      <form onSubmit={handleClick}>
        <fieldset>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={values.username}
              onChange={updateValue}
              required
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={updateValue}
              required
            />
          </label>
          {error && (
            <div>
              <p>Error: {error}</p>
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Login"}
          </button>
        </fieldset>
      </form>
    </LoginPageStyles>
  );
}

export default withRouter(LoginPage);
