import React from "react";
import { Link } from "react-router-dom";
import { clearAuthToken } from "../utils/local-storage";
import { useAuthenticated } from "../context/auth-context.jsx";

export default function Header() {
  const { setAuthenticated } = useAuthenticated();

  function logout() {
    clearAuthToken();
    setAuthenticated(false);
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </ul>
      </nav>
    </header>
  );
}
