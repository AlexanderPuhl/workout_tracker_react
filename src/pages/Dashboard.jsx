import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useWorkoutLogsApi from "../hooks/useWorkoutLogsApi";
import WorkoutCard from "../components/workoutCard.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import WorkoutModal from "../components/workoutModal.jsx";

import findWithAttr from "../utils/findIndex";

const DashboardStyles = styled.section``;

export default function DashboardPage() {
  const { deleteAWorkoutLog, getAllWorkoutLogs } = useWorkoutLogsApi();
  const [allWorkoutLogs, setWorkoutLogs] = useState(null);

  const [loading, setLoading] = useState(true);
  const [workoutModalVisible, setWorkoutModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(async () => {
    const getAllEffect = async () => {
      try {
        const workoutLogsData = await getAllWorkoutLogs();
        setWorkoutLogs(workoutLogsData);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAllEffect();
  }, []);

  useEffect(() => {
    if (allWorkoutLogs) {
      setLoading(false);
    }
  }, [allWorkoutLogs]);

  function toggleModalHandler(workoutLogID) {
    const index = findWithAttr(allWorkoutLogs, "workout_log_id", workoutLogID);
    setSelectedWorkout(index);
    setWorkoutModal(!workoutModalVisible);
  }

  async function deleteWorkoutLogHandler(workoutLogID) {
    try {
      await deleteAWorkoutLog(workoutLogID);
      const workoutLogsData = await getAllWorkoutLogs();
      setWorkoutLogs(workoutLogsData);
    } catch (e) {
      console.log(e.message);
    }
  }

  let workoutLogsList;
  if (loading) {
    workoutLogsList = null;
  } else {
    workoutLogsList = (
      <div>
        {allWorkoutLogs.map((workoutLog) => (
          <WorkoutCard
            key={workoutLog.workout_log_id}
            deleteWorkoutLog={deleteWorkoutLogHandler}
            toggleWorkoutModal={toggleModalHandler}
            workoutLog={workoutLog}
          />
        ))}
      </div>
    );
  }

  let workoutModal = null;
  let modalOverlay = null;
  if (workoutModalVisible) {
    workoutModal = (
      <WorkoutModal toggleWorkoutModal={toggleModalHandler} workoutLog={allWorkoutLogs[selectedWorkout]} />
    );
    modalOverlay = (
      <div className="modal-overlay" onKeyUp={toggleModalHandler} onClick={() => toggleModalHandler(0)} role="none" />
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
