import { useState } from "react";
import { saveAuthToken } from "../utils/local-storage";
import API_BASE_URL from "../config";

const storeAuthInfo = (accessToken) => {
  saveAuthToken(accessToken);
};

export default function useAuthentication({ values }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function submitLogin(loginValues) {
    setLoading(true);
    setError(false);
    return fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        strategy: "local",
        username: loginValues.username,
        password: loginValues.password,
      }),
    })
      .then((res) => res.json())
      .then(({ authToken }) => {
        storeAuthInfo(authToken);
        return authToken;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function submitRegistration(registerValues) {
    setLoading(true);
    setError(false);

    await fetch(`${API_BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: registerValues.username,
        password: registerValues.password,
        roleId: 1,
      }),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
      });

    return fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        strategy: "local",
        username: values.username,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(({ authToken }) => {
        storeAuthInfo(authToken);
        return authToken;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return {
    error,
    loading,
    submitLogin,
    submitRegistration,
  };
}
