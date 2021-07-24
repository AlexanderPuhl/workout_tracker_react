import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearAuthToken } from "../utils/local-storage";
import { useAuthenticated } from "../context/auth-context.jsx";

const HeaderStyles = styled.header`
  background-color: var(--gray);
  padding: 1rem;
  ul {
    display: flex;
    li {
      list-style: none;
    }
  }
`;

export default function Header() {
  const { isAuthenticated, setAuthenticated } = useAuthenticated();

  function logout() {
    clearAuthToken();
    setAuthenticated(false);
  }
  let homeButton = <Link to="/">Home</Link>;
  let profile = null;
  let logoutButton = null;
  if (isAuthenticated) {
    homeButton = (
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    );
    profile = (
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    );
    logoutButton = (
      <li>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </li>
    );
  }

  return (
    <HeaderStyles>
      <nav>
        <ul>
          {homeButton}
          {profile}
          {logoutButton}
        </ul>
      </nav>
    </HeaderStyles>
  );
}
