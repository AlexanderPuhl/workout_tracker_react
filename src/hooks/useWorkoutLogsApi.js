import { useState } from "react";
import { loadAuthToken } from "../utils/local-storage";
import API_BASE_URL from "../config";

export default function useWorkoutLogsApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getAllWorkoutLogs() {
    setLoading(true);
    setError(false);

    const authToken = loadAuthToken();

    return fetch(`${API_BASE_URL}/workoutlog`, {
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
    getAllWorkoutLogs,
  };
}
