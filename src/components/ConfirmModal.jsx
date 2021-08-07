import React from "react";
import styled from "styled-components";
import XIcon from "./SVG/XIcon.jsx";

const ConfirmModalStyles = styled.div`
  text-align: center;
  .button-wrapper button {
    background-color: white;
    border-radius: 5px;
    color: black;
    margin: 1.5rem 1rem;
    transition: background-color 0.2s;
    &:hover {
      background-color: gray;
      color: white;
    }
  }
  .close-modal {
    margin: 1rem;
    position: fixed;
    right: 0;
    top: 0;
    svg {
      transition: width 0.2s;
      width: 20px;
      &:hover {
        width: 25px;
      }
    }
  }
`;

export default function confirmModal({ deleteWorkoutLog, toggleConfirmModal, workoutLog }) {
  const ID = workoutLog.workout_log_id;
  return (
    <ConfirmModalStyles className="modal">
      <h1>Confirm Modal</h1>
      <p>Are you sure you want to delete workout log {ID}?</p>
      <div className="button-wrapper">
        <button onClick={() => deleteWorkoutLog(ID)} type="button">
          Confirm
        </button>
        <button onClick={() => toggleConfirmModal(0)} type="button">
          No
        </button>
      </div>
      <button className="close-modal" onClick={() => toggleConfirmModal(0)} type="button">
        <XIcon />
      </button>
    </ConfirmModalStyles>
  );
}
