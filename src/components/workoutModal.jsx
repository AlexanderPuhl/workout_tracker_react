import React from "react";
import styled from "styled-components";
import WorkoutCard from "./workoutCard.jsx";
import XIcon from "./SVG/XIcon.jsx";
import returnDateTime from "../utils/dateTime";

const WorkoutModalStyles = styled.div`
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
`;

export default function workoutModal({ toggleWorkoutModal, workouts, workoutLog }) {
  console.log(workouts);
  const setDateTime = returnDateTime(workoutLog.modified_on);
  return (
    <WorkoutModalStyles key={workoutLog.workout_log_id} className="modal">
      <h1>Workout Modal</h1>
      <p>workoutLog Log ID: {workoutLog.workout_log_id}</p>
      <p>
        Date and Time: {setDateTime.date} {setDateTime.time}
      </p>
      <p>WorkoutLog Note: {workoutLog.set_note}</p>
      {workouts.map((workout) => (
        <WorkoutCard key={workout.workout_id} workout={workout} />
      ))}
      <button className="close-modal" onClick={() => toggleWorkoutModal(0)} type="button">
        <XIcon />
      </button>
    </WorkoutModalStyles>
  );
}
