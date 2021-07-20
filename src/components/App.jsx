import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthenticateRoute from "./AuthenticateRoute.jsx";
import Header from "./Header.jsx";
import LoginPage from "../pages/Login.jsx";
import RegistrationPage from "../pages/Registration.jsx";

import LandingPage from "../pages/Landing.jsx";
import DashboardPage from "../pages/Dashboard.jsx";
import ProfilePage from "../pages/Profile.jsx";
import { useAuthenticated } from "../context/auth-context.jsx";

function App() {
  const { isAuthenticated } = useAuthenticated();
  const authedRedirect = (Component) =>
    isAuthenticated ? <Redirect to="/dashboard" /> : <Component />;
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            {authedRedirect(LandingPage)}
          </Route>
          <Route path="/login">{authedRedirect(LoginPage)}</Route>
          <Route path="/register">{authedRedirect(RegistrationPage)}</Route>
          <AuthenticateRoute path="/dashboard">
            <DashboardPage />
          </AuthenticateRoute>
          <AuthenticateRoute path="/profile">
            <ProfilePage />
          </AuthenticateRoute>
        </Switch>
      </main>
    </>
  );
}

export default App;
