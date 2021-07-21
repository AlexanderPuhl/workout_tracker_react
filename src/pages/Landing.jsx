import React, { useState } from "react";
import Login from "../components/Login.jsx";
import Registration from "../components/Registration.jsx";

export default function LandingPage() {
  const [form, setForm] = useState(true);
  let userForm;
  if (form) {
    userForm = <Login />;
  } else {
    userForm = <Registration />;
  }
  return (
    <div>
      <h1>Landing Page</h1>
      <h2>Welcome to the workout tracker App</h2>
      {userForm}
      <button type="button" onClick={() => setForm(!form)}>
        {form ? "Register" : "Login"}
      </button>
    </div>
  );
}
