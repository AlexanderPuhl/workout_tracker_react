import React from "react";
import styled from "styled-components";

import returnDateTime from "../utils/dateTime";

const WorkoutLogStyles = styled.div`
  border: 2px solid var(--gray);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  p:nth-child(1) {
    border-bottom: 1px solid var(--white);
    margin-bottom: 1rem;
  }
`;

export default function WorkoutLog({ workoutLog, toggleModal }) {
  const dateAndTime = returnDateTime(workoutLog.created_on);
  return (
    <WorkoutLogStyles onClick={toggleModal}>
      <p>
        {dateAndTime.date} {dateAndTime.time}
      </p>
      <p>Notes: {workoutLog.note}</p>
    </WorkoutLogStyles>
  );
}
