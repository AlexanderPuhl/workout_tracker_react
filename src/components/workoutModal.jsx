import React from "react";
import styled from "styled-components";
import returnDateTime from "../utils/dateTime";

const WorkoutModalStyles = styled.div`
  background-color: var(--main-bg-color);
  border: 1px solid var(--gray);
  color: var(--white);
  left: 50%;
  max-width: 1280px;
  padding: 1rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 101;
  .close-modal {
    cursor: pointer;
    margin: 1rem;
    position: fixed;
    right: 0;
    top: 0;
    transition: width 0.3s;
    width: 20px;
    &:hover {
      width: 25px;
    }
  }
`;

export default function workoutModal({ toggleModal, workoutLog }) {
  const setDateTime = returnDateTime(workoutLog.set_date_time);
  return (
    <WorkoutModalStyles>
      <h1>Workout Modal</h1>
      <p>Username: {workoutLog.username}</p>
      <p>workout Set ID: {workoutLog.set_id}</p>
      <p>Exercise: {workoutLog.exercise}</p>
      <p>
        {workoutLog.number_of_sets} sets of {workoutLog.number_of_reps} at {workoutLog.weight}lbs
      </p>
      <p>
        Date and Time: {setDateTime.date} {setDateTime.time}
      </p>
      <p>Note: {workoutLog.set_note}</p>
      <svg
        className="close-modal"
        fill="#f2f2f2"
        onClick={() => toggleModal(0)}
        viewBox="0 0 329.26933 329"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
      </svg>
    </WorkoutModalStyles>
  );
}
