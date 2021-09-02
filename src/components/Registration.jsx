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

  async function handleClick(event) {
    event.preventDefault();
    const authToken = await submitRegistration(values);
    if (authToken) {
      setAuthenticated(true);
      history.push("/dashboard");
    }
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <fieldset>
          <label htmlFor="username">
            <input
              id="username"
              name="username"
              onChange={updateValue}
              placeholder="Username"
              required
              type="text"
              value={values.username}
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              onChange={updateValue}
              placeholder="Password"
              required
              type="password"
              value={values.password}
            />
          </label>
          <label htmlFor="confirmPassword">
            <input
              id="confirmPassword"
              name="confirmPassword"
              onChange={updateValue}
              placeholder="Confirm Password"
              required
              type="password"
              value={values.confirmPassword}
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
