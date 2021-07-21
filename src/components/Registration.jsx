import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { useAuthenticated } from "../context/auth-context.jsx";
import useForm from "../hooks/useForm";

function RegistrationPage() {
  const { setAuthenticated } = useAuthenticated();
  const history = useHistory();
  const { values, updateValue } = useForm({
    username: "testUser",
    password: "supersecret",
    confirmPassword: "supersecret",
  });

  const { error, loading, submitRegistration } = useAuthentication({ values });

  async function handleClick(e) {
    e.preventDefault();
    const authToken = await submitRegistration(values);
    if (authToken) {
      setAuthenticated(true);
      history.push("/dashboard");
    }
  }

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleClick}>
        <fieldset>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={updateValue}
              required
            />
          </label>
          <label htmlFor="password">
            password:
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={updateValue}
              required
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm password:
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={updateValue}
              required
            />
          </label>
          {error ? <p>Error: {error}</p> : ""}
          <button type="submit" disabled={loading}>
            {loading ? "Registering" : "Register"}
          </button>{" "}
        </fieldset>
      </form>
    </div>
  );
}

export default withRouter(RegistrationPage);
