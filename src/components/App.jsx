import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthenticateRoute from "./AuthenticateRoute.jsx";
import LandingPage from "../pages/Landing.jsx";
import DashboardPage from "../pages/Dashboard.jsx";
import ProfilePage from "../pages/Profile.jsx";
import { useAuthenticated } from "../context/auth-context.jsx";
import "../styles/reset.css";
import "../styles/normalize.css";
import GlobalStyles from "../styles/GlobalStyles";

function App() {
  const { isAuthenticated } = useAuthenticated();
  const authedRedirect = (Component) =>
    isAuthenticated ? <Redirect to="/dashboard" /> : <Component />;
  return (
    <>
      <GlobalStyles />

      <main>
        <Switch>
          <Route path="/" exact>
            {authedRedirect(LandingPage)}
          </Route>
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
