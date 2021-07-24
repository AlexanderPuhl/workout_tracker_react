import React, { useEffect, useState } from "react";
// import useWorkoutApi from "../hooks/useWorkoutApi";
import useWorkoutLogsApi from "../hooks/useWorkoutLogsApi";
import WorkoutCard from "../components/workoutCard.jsx";

export default function DashboardPage() {
  // const { getAllWorkouts } = useWorkoutApi();
  const { getAllWorkoutLogs } = useWorkoutLogsApi();
  // const [workouts, setWorkouts] = useState(null);
  const [workoutLogs, setWorkoutLogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // const getAllWorkoutsEffect = async () => {
    //   try {
    //     const data = await getAllWorkouts();
    //     setWorkouts(data);
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // };
    const getAllWorkoutLogsEffect = async () => {
      try {
        const data = await getAllWorkoutLogs();
        setWorkoutLogs(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    // getAllWorkoutsEffect();
    getAllWorkoutLogsEffect();
  }, []);

  useEffect(() => {
    if (workoutLogs) {
      setLoading(false);
    }
  }, [workoutLogs]);

  let WorkoutLogsList;
  if (loading) {
    WorkoutLogsList = null;
  } else {
    WorkoutLogsList = (
      <div>
        {workoutLogs.map((workoutLog) => (
          <WorkoutCard
            workoutLog={workoutLog}
            key={workoutLog.workout_log_id}
          />
        ))}
      </div>
    );
  }
  return (
    <section>
      <h1>Dashboard Page</h1>
      {WorkoutLogsList}
    </section>
  );
}
