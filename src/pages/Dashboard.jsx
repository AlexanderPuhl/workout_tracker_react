import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useGetAllApi from "../hooks/useGetAllApi";
import WorkoutCard from "../components/workoutCard.jsx";
import WorkoutModal from "../components/workoutModal.jsx";

const DashboardStyles = styled.section``;

export default function DashboardPage() {
  const { getAllApi } = useGetAllApi();
  const [allworkouts, setAllWorkouts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(async () => {
    const getAllEffect = async () => {
      try {
        const data = await getAllApi();
        setAllWorkouts(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAllEffect();
  }, []);

  useEffect(() => {
    if (allworkouts) {
      setLoading(false);
    }
  }, [allworkouts]);

  function toggleModalHandler(index) {
    setSelectedWorkout(index);
    setModal(!modalVisible);
  }

  let workoutLogsList;
  if (loading) {
    workoutLogsList = null;
  } else {
    workoutLogsList = (
      <div>
        {allworkouts.map((workoutLog) => (
          <WorkoutCard key={workoutLog.set_id} toggleModal={toggleModalHandler} workoutLog={workoutLog} />
        ))}
      </div>
    );
  }

  let workoutModal = null;
  let modalOverlay = null;
  if (modalVisible) {
    workoutModal = <WorkoutModal toggleModal={toggleModalHandler} workoutLog={allworkouts[selectedWorkout - 1]} />;
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
