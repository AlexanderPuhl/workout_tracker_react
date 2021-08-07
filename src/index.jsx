import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/auth-context.jsx";
import App from "./components/App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
