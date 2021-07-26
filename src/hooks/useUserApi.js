import { useState } from "react";
import { loadAuthToken } from "../utils/local-storage";
import API_BASE_URL from "../config";

export default function useUserApi() {
  // define error state set it to false
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  function getUserData() {
    setLoading(true);
    setError(false);

    const authToken = loadAuthToken();

    return fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(() => setLoading(false))
    .catch(err => {
      setError(true);
      return err;
    })
  }
  return {
    error,
    loading,
    getUserData
  }
}