import { useState } from "react";
import { API_BASE_URL } from "../config";
import { saveAuthToken } from "../utils/local-storage";

const storeAuthInfo = (accessToken) => {
  saveAuthToken(accessToken);
};

export default function useAuthentication({ values }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitLogin(values) {
    setLoading(true);
    setError(false);

    return fetch(`${API_BASE_URL}/authentication`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        strategy: "local",
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(({ accessToken, user }) => {
        storeAuthInfo(accessToken);
        return user;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function submitRegistration(e) {
    setLoading(true);
    setError(false);

    await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        roleId: 1,
      }),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
      });

    return fetch(`${API_BASE_URL}/authentication`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        strategy: "local",
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(({ accessToken, user }) => {
        storeAuthInfo(accessToken);
        return user;
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
