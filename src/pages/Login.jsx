import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { useAuthenticated } from "../context/auth-context.jsx";
import useForm from "../hooks/useForm";

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
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleClick}>
        <fieldset>
          <label htmlFor="username">
            username:
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
    </div>
  );
}

export default withRouter(LoginPage);
