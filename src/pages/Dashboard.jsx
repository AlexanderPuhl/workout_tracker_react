import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ConfirmModal from "../components/ConfirmModal.jsx";
import WorkoutModal from "../components/workoutModal.jsx";
import useWorkoutApi from "../hooks/useWorkoutApi";
import useWorkoutLogsApi from "../hooks/useWorkoutLogsApi";
import useFetchApi from "../hooks/useFetchAPI";

import findWithAttr from "../utils/findIndex";

const DashboardStyles = styled.section`
  h1 {
    margin: 1rem 0 0;
  }
  .profile-section {
    display: flex;
    padding: 2rem 0;
    img {
      border-radius: 50%;
      margin-right: 1.5rem;
      width: 75px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    p {
      text-transform: capitalize;
    }
  }
`;

export default function DashboardPage() {
  const { deleteAWorkoutLog, getAllWorkoutLogs } = useWorkoutLogsApi();
  const { getAllWorkouts } = useWorkoutApi();
  const { crudData } = useFetchApi("/user/get_data", "Get");
  const [userData, setUserData] = useState(null);
  const [allWorkoutLogs, setWorkoutLogs] = useState(null);
  const [allWorkouts, setWorkouts] = useState(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [confirmModalVisible, setConfirmModal] = useState(false);
  const [workoutModalVisible, setWorkoutModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getAllEffect = async () => {
      try {
        const data = await crudData("/user/get_data", "Get");
        const userInfo = data[0];
        setUserData(userInfo);
        const workoutLogsData = await getAllWorkoutLogs();
        const workoutsData = await getAllWorkouts();
        setWorkoutLogs(workoutLogsData);
        setWorkouts(workoutsData);
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

  let profileCard = null;
  let confirmModal = null;
  let modalOverlay = null;
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
        workouts={filteredWorkouts}
        workoutLog={allWorkoutLogs[selectedWorkout]}
      />
    );
    modalOverlay = <div className="modal-overlay" onClick={() => toggleModalHandler(0)} role="none" />;
  }

  if (loading) {
    profileCard = null;
  } else {
    const imageSource = `./images/${userData.username}.png`;
    profileCard = (
      <div className="profile-section">
        <img src={imageSource} alt="profile pic" />
        <div>
          <p>{userData.username}</p>
          <p>2 workouts</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardStyles>
      <h1>Profile</h1>
      {profileCard}
      <h2>Dashboard</h2>
      {confirmModal}
      {workoutModal}
      {modalOverlay}
    </DashboardStyles>
  );
}
