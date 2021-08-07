import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearAuthToken } from "../utils/local-storage";
import { useAuthenticated } from "../context/auth-context.jsx";

const HeaderStyles = styled.header`
  align-items: center;
  background-color: var(--secondary-bg-color);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  position: relative;
  .header-logo {
    padding: 0;
    svg {
      width: 5rem;
    }
  }
  nav {
    align-items: center;
    background-color: var(--secondary-bg-color);
    display: flex;
    flex-direction: column;
    left: 0;
    padding: 0 0 1rem;
    position: absolute;
    transform: translateY(-210%);
    transition: transform 0.3s ease-out;
    top: 59px;
    width: 100%;
    &.active {
      transform: translateY(0px);
      z-index: 1;
    }
  }
  .hamburger-icon {
    background-color: transparent;
    border-color: transparent;
    margin: 0;
    padding-right: 1.2rem;
    width: auto;
    &:hover {
      cursor: pointer;
    }

    div {
      background-color: var(--white);
      border-radius: 5px;
      height: 5px;
      margin: 6px 0;
      transition: 0.4s;
      width: 35px;
      &.active {
        &.bar1 {
          transform: rotate(-45deg) translate(-9px, 6px);
        }
        &.bar2 {
          opacity: 0;
        }
        &.bar3 {
          transform: rotate(45deg) translate(-8px, -8px);
        }
      }
    }
  }
  @media (min-width: 600px) {
    padding: 0 1.5rem;
  }
`;

export default function Header() {
  const { isAuthenticated, setAuthenticated } = useAuthenticated();
  const [navActive, setNav] = useState(false);

  function clickHamburger() {
    setNav(!navActive);
  }

  function logout() {
    setNav(false);
    clearAuthToken();
    setAuthenticated(false);
  }
  let homeButton = (
    <Link onClick={() => setNav(!navActive)} to="/">
      Home
    </Link>
  );
  let history = null;
  let profile = null;
  let logoutButton = null;
  if (isAuthenticated) {
    homeButton = (
      <Link onClick={() => setNav(!navActive)} to="/dashboard">
        Dashboard
      </Link>
    );
    history = (
      <Link onClick={() => setNav(!navActive)} to="/history">
        History
      </Link>
    );
    profile = (
      <Link onClick={() => setNav(!navActive)} to="/profile">
        Profile
      </Link>
    );
    logoutButton = (
      <button type="button" onClick={logout}>
        Logout
      </button>
    );
  }

  return (
    <HeaderStyles>
      <Link className="header-logo" to="/dashboard">
        <svg fill="white" id="Outline" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M472,224V152a31.978,31.978,0,0,0-48.2-27.577A32,32,0,0,0,360,128v96H152V128a32,32,0,0,0-63.795-3.577A31.978,31.978,0,0,0,40,152v72a32,32,0,0,0,0,64v72a31.978,31.978,0,0,0,48.205,27.577A32,32,0,0,0,152,384V288H360v96a32,32,0,0,0,63.8,3.577A31.978,31.978,0,0,0,472,360V288a32,32,0,0,0,0-64ZM40,272a16,16,0,0,1,0-32ZM72,376a16.019,16.019,0,0,1-16-16V152a16,16,0,0,1,32,0V360A16.019,16.019,0,0,1,72,376Zm64,8a16,16,0,0,1-32,0V128a16,16,0,0,1,32,0Zm16-112V240H360v32ZM408,384a16,16,0,0,1-32,0V128a16,16,0,0,1,32,0Zm48-24a16,16,0,0,1-32,0V152a16,16,0,0,1,32,0Zm16-88V240a16,16,0,0,1,0,32Z" />
        </svg>
      </Link>
      <nav className={`${navActive ? "active" : ""}`}>
        {homeButton}
        {history}
        {profile}
        {logoutButton}
      </nav>
      <button className="hamburger-icon" id="navbar-toggle" onClick={() => clickHamburger()} type="button">
        <div className={`bar1 ${navActive ? "active" : ""}`} />
        <div className={`bar2 ${navActive ? "active" : ""}`} />
        <div className={`bar3 ${navActive ? "active" : ""}`} />
      </button>
    </HeaderStyles>
  );
}
