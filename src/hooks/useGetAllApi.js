import { useState } from "react";
import { loadAuthToken } from "../utils/local-storage";
import API_BASE_URL from "../config";

export default function useGetAllApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getAllApi() {
    setLoading(true);
    setError(false);

    const authToken = loadAuthToken();

    return fetch(`${API_BASE_URL}/get_all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        setLoading(false);
        setError(true);
        return err;
      });
  }
  function getOneApi(workoutLogID) {
    setLoading(true);
    setError(false);

    const authToken = loadAuthToken();

    return fetch(`${API_BASE_URL}/get_all/${workoutLogID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        setLoading(false);
        setError(true);
        return err;
      });
  }
  return {
    error,
    loading,
    getAllApi,
    getOneApi,
  };
}
