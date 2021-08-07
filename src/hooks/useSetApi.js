import { useState } from "react";
import { loadAuthToken } from "../utils/local-storage";
import API_BASE_URL from "../config";

export default function useSetApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getAllSets() {
    setLoading(true);
    setError(false);
    const authToken = loadAuthToken();
    return fetch(`${API_BASE_URL}/set`, {
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

  function getASet(setID) {
    setLoading(true);
    setError(false);
    const authToken = loadAuthToken();
    return fetch(`${API_BASE_URL}/set/${setID}`, {
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

    async function deleteASet(setID) {
      setLoading(true);
      setError(false);
      const authToken = loadAuthToken();
      return fetch(`${API_BASE_URL}/workoutlog/${setID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.status)
        .then(() => "Success")
        .catch((err) => {
          setLoading(false);
          setError(true);
          return err;
        });
    }

  return {
    error,
    loading,
    getAllSets,
    getASet,
    deleteASet,
  };
}
