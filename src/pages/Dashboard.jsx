import React, { useEffect, useState } from "react";
import useWorkoutApi from "../hooks/useWorkoutApi";
import useWorkoutLogsApi from "../hooks/useWorkoutLogsApi";

export default function DashboardPage() {
  const { getAllWorkouts } = useWorkoutApi();
  const { getAllWorkoutLogs } = useWorkoutLogsApi();
  const [workouts, setWorkouts] = useState(null);
  const [workoutLogs, setWorkoutLogs] = useState(null);
  const { loading, setLoading } = useState(true);

  useEffect(async () => {
    const getAllWorkoutsEffect = async () => {
      try {
        const data = await getAllWorkouts();
        console.log(data);
        setWorkouts(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    const getAllWorkoutLogsEffect = async () => {
      try {
        const data = await getAllWorkoutLogs();
        console.log(data);
        setWorkoutLogs(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAllWorkoutsEffect();
    getAllWorkoutLogsEffect();
  }, []);

  return (
    <section>
      <h1>Dashboard Page</h1>
    </section>
  );
}
