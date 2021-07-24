import React from "react";
import styled from "styled-components";

import returnDateTime from "../utils/dateTime";

const WorkoutLogStyles = styled.div`
  border: 1px solid var(--black);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export default function WorkoutLog({ workoutLog }) {
  const dateAndTime = returnDateTime(workoutLog.created_on);
  console.log(`dateAndTime: ${dateAndTime}`);
  return (
    <WorkoutLogStyles>
      <p>
        {dateAndTime.date} {dateAndTime.time}
      </p>
      <p>Notes: {workoutLog.note}</p>
    </WorkoutLogStyles>
  );
}
