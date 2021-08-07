import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ConfirmModal from "../components/ConfirmModal.jsx";
import WorkoutLogCard from "../components/workoutLogCard.jsx";
import WorkoutModal from "../components/workoutModal.jsx";

import useWorkoutLogsApi from "../hooks/useWorkoutLogsApi";
import useWorkoutApi from "../hooks/useWorkoutApi";
import useSetApi from "../hooks/useSetApi";

import findWithAttr from "../utils/findIndex";

const DashboardStyles = styled.section``;

export default function HistoryPage() {
  const { deleteAWorkoutLog, getAllWorkoutLogs } = useWorkoutLogsApi();
  const { getAllWorkouts } = useWorkoutApi();
  const { getAllSets } = useSetApi();
  const [allWorkoutLogs, setWorkoutLogs] = useState(null);
  const [allWorkouts, setWorkouts] = useState(null);
  const [allSets, setSets] = useState(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [confirmModalVisible, setConfirmModal] = useState(false);
  const [workoutModalVisible, setWorkoutModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getAllEffect = async () => {
      try {
        const workoutLogsData = await getAllWorkoutLogs();
        const workoutsData = await getAllWorkouts();
        const setsData = await getAllSets();
        setWorkoutLogs(workoutLogsData);
        setWorkouts(workoutsData);
        setSets(setsData);
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

  async function deleteWorkoutLogHandler(workoutLogID) {
    try {
      await deleteAWorkoutLog(workoutLogID);
      const workoutLogsData = await getAllWorkoutLogs();
      setConfirmModal(!confirmModalVisible);
      setWorkoutLogs(workoutLogsData);
    } catch (e) {
      console.log(e.message);
    }
  }

  function toggleConfirmModalHandler(workoutLogID) {
    const index = findWithAttr(allWorkoutLogs, "workout_log_id", workoutLogID);
    setSelectedWorkout(index);
    setConfirmModal(!confirmModalVisible);
  }

  function toggleModalHandler(workoutLogID) {
    const index = findWithAttr(allWorkoutLogs, "workout_log_id", workoutLogID);
    setSelectedWorkout(index);
    const filteredList = allWorkouts.filter((workout) => workout.workout_log_id === workoutLogID);
    setFilteredWorkouts(filteredList);
    setWorkoutModal(!workoutModalVisible);
  }

  let confirmModal = null;
  let modalOverlay = null;
  let workoutLogCards = null;
  let workoutModal = null;

  if (confirmModalVisible) {
    confirmModal = (
      <ConfirmModal
        className="model-overlay"
        deleteWorkoutLog={deleteWorkoutLogHandler}
        toggleConfirmModal={toggleConfirmModalHandler}
        workoutLog={allWorkoutLogs[selectedWorkout]}
      />
    );
    modalOverlay = <div className="modal-overlay" onClick={() => toggleConfirmModalHandler(0)} role="none" />;
  }

  if (workoutModalVisible) {
    workoutModal = (
      <WorkoutModal
        toggleWorkoutModal={toggleModalHandler}
        workoutLog={allWorkoutLogs[selectedWorkout]}
        workouts={filteredWorkouts}
        sets={allSets}
      />
    );
    modalOverlay = <div className="modal-overlay" onClick={() => toggleModalHandler(0)} role="none" />;
  }

  if (loading) {
    workoutLogCards = null;
  } else {
    workoutLogCards = (
      <div>
        {allWorkoutLogs.map((workoutLog) => (
          <WorkoutLogCard
            key={workoutLog.workout_log_id}
            deleteWorkoutLog={toggleConfirmModalHandler}
            toggleWorkoutModal={toggleModalHandler}
            workoutLog={workoutLog}
          />
        ))}
      </div>
    );
  }
  return (
    <DashboardStyles>
      <h1>History</h1>
      {workoutLogCards}
      {confirmModal}
      {workoutModal}
      {modalOverlay}
    </DashboardStyles>
  );
}
