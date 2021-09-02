import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "./workoutCard.jsx";
import useFetchApi from "../hooks/useFetchAPI";
import XIcon from "./SVG/XIcon.jsx";

import returnDateTime from "../utils/dateTime";

const WorkoutModalStyles = styled.div`
  header {
    border-bottom: 1px solid white;
    padding: 0.5rem 1rem;
    h2 {
      margin: 0;
    }
    .close-modal {
      margin: 1rem;
      position: fixed;
      right: 0;
      top: 0;
      svg {
        transition: width 0.3s;
        width: 20px;
        &:hover {
          width: 25px;
        }
      }
    }
  }
  .modal-body {
    padding: 0.5rem 0;
    .modal-body-info {
      border-bottom: 1px solid white;
      padding: 1rem;
    }
    .workouts {
      height: 65vh;
      overflow-y: scroll;
      padding: 0.5rem 0;
    }
  }
`;

export default function workoutModal({ toggleWorkoutModal, workoutLog, workouts, sets }) {
  const setDateTime = returnDateTime(workoutLog.modified_on);
  const { crudData } = useFetchApi();
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(async () => {
    const getExercisesEffect = async () => {
      try {
        const data = await crudData("/exercise", "Get");
        const exerciseList = data;
        setExerciseData(exerciseList);
      } catch (error) {
        console.log(error.message);
      }
    };
    getExercisesEffect();
  }, []);

  return (
    <WorkoutModalStyles key={workoutLog.workout_log_id} className="modal">
      <header>
        <h2>Workout Modal</h2>
        <button className="close-modal" onClick={() => toggleWorkoutModal(0)} type="button">
          <XIcon />
        </button>
      </header>
      <div className="modal-body">
        <div className="modal-body-info">
          <p>workoutLog Log ID: {workoutLog.workout_log_id}</p>
          <p>
            Date and Time: {setDateTime.date} {setDateTime.time}
          </p>
          <p>WorkoutLog Note: {workoutLog.set_note}</p>
        </div>
        <div className="workouts">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.workout_id} exercises={exerciseData} workout={workout} sets={sets} />
          ))}
        </div>
      </div>
    </WorkoutModalStyles>
  );
}
