import React from "react";
import styled from "styled-components";
import WorkoutCard from "./workoutCard.jsx";
import XIcon from "./SVG/XIcon.jsx";
import returnDateTime from "../utils/dateTime";

const WorkoutModalStyles = styled.div`
  header {
    border-bottom: 1px solid white;
    padding: 0.5rem 1rem;
    h1 {
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
      padding: 0 1rem;
    }
    .workouts {
      height: 500px;
      overflow-y: scroll;
      padding: 0.5rem 0;
    }
  }
`;

export default function workoutModal({ toggleWorkoutModal, workoutLog, workouts, sets }) {
  const setDateTime = returnDateTime(workoutLog.modified_on);
  return (
    <WorkoutModalStyles key={workoutLog.workout_log_id} className="modal">
      <header>
        <h1>Workout Modal</h1>
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
            <WorkoutCard key={workout.workout_id} workout={workout} sets={sets} />
          ))}
        </div>
      </div>
    </WorkoutModalStyles>
  );
}
