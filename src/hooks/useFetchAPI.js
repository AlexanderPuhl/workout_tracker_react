import { useState } from "react";
import { loadAuthToken } from "../utils/local-storage";
import API_BASE_URL from "../config";

export default function fetchApi(urlRoute, methodType, bodyObj) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function CrudData() {
    const authToken = loadAuthToken();
    try {
      let response;
      if (methodType.toUpperCase() === "GET") {
        response = await fetch(`${API_BASE_URL}${urlRoute}`, {
          method: `${methodType}`,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`
          }
        })
      }
      else {
        response = await fetch(`${API_BASE_URL}${urlRoute}`, {
          method: `${methodType}`,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
          body: bodyObj
        })
      }
      const resData = await response.json();
      setLoading(false);
      return resData;
    }
    catch (err) {
      setLoading(false);
      setError(true);
      return err;
    }
  }

  return {
    error,
    loading,
    CrudData
  };
}