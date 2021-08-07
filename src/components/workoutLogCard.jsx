import React from "react";
import styled from "styled-components";
import returnDateTime from "../utils/dateTime";
import EyeIcon from "./SVG/EyeIcon.jsx";
import TrashIcon from "./SVG/TrashIcon.jsx";

const WorkoutLogStyles = styled.div`
  border: 2px solid var(--gray);
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 800px;
  position: relative;
  .icon {
    margin: 0 1rem;
    padding: 0;
    position: absolute;
    svg {
      width: 2.5rem;
    }
  }
  .view-icon {
    right: 50px;
  }
  .trash-icon {
    right: 10px;
  }
  p:nth-child(1) {
    border-bottom: 1px solid var(--white);
    margin-bottom: 1rem;
  }
`;

export default function WorkoutLogCard({ deleteWorkoutLog, workoutLog, toggleWorkoutModal }) {
  const dateAndTime = returnDateTime(workoutLog.modified_on);
  return (
    <WorkoutLogStyles id={workoutLog.workout_log_id}>
      <button className="icon view-icon" onClick={() => toggleWorkoutModal(workoutLog.workout_log_id)} type="button">
        <EyeIcon />
      </button>
      <button className="icon trash-icon" onClick={() => deleteWorkoutLog(workoutLog.workout_log_id)} type="button">
        <TrashIcon />
      </button>
      <p>{dateAndTime.date}</p>
      <p>Workout Log ID: {workoutLog.workout_log_id}</p>
      <p>Notes: {workoutLog.note}</p>
    </WorkoutLogStyles>
  );
}
