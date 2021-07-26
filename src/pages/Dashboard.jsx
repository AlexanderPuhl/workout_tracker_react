import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useWorkoutApi from "../hooks/useWorkoutApi";
import useWorkoutLogsApi from "../hooks/useWorkoutLogsApi";
import WorkoutCard from "../components/workoutCard.jsx";
import WorkoutModal from "../components/workoutModal.jsx";

const DashboardStyles = styled.section``;

export default function DashboardPage() {
  const { getAllWorkouts } = useWorkoutApi();
  const { getAllWorkoutLogs } = useWorkoutLogsApi();
  const [workouts, setWorkouts] = useState(null);
  const [workoutLogs, setWorkoutLogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModal] = useState(false);

  useEffect(async () => {
    const getAllWorkoutsEffect = async () => {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    const getAllWorkoutLogsEffect = async () => {
      try {
        const data = await getAllWorkoutLogs();
        setWorkoutLogs(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAllWorkoutsEffect();
    getAllWorkoutLogsEffect();
  }, []);

  useEffect(() => {
    if (workoutLogs) {
      setLoading(false);
    }
  }, [workoutLogs]);

  function toggleModalHandler() {
    console.log(modalVisible);
    setModal(!modalVisible);
  }

  let workoutLogsList;
  if (loading) {
    workoutLogsList = null;
  } else {
    workoutLogsList = (
      <div>
        {workoutLogs.map((workoutLog) => (
          <WorkoutCard
            key={workoutLog.workout_log_id}
            toggleModal={toggleModalHandler}
            workoutLog={workoutLog}
          />
        ))}
      </div>
    );
  }

  let workoutModal = null;
  let modalOverlay = null;
  if (modalVisible) {
    workoutModal = <WorkoutModal toggleModal={toggleModalHandler} />;
    modalOverlay = (
      <div
        className="modal-overlay"
        onKeyUp={toggleModalHandler}
        onClick={toggleModalHandler}
        role="none"
      />
    );
  }
  return (
    <DashboardStyles>
      <h1>Workouts</h1>
      {workoutLogsList}
      {workoutModal}
      {modalOverlay}
    </DashboardStyles>
  );
}
