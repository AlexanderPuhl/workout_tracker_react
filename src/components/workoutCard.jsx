import React from "react";
import styled from "styled-components";
import returnDateTime from "../utils/dateTime";

const WorkoutCardStyles = styled.div`
  border: 1px solid white;
  padding: 1rem;
  margin: 1rem 0;
  span {
    font-weight: bold;
  }
`;

export default function WorkoutCard({ workout }) {
  const setDateTime = returnDateTime(workout.modified_on);

  return (
    <WorkoutCardStyles>
      <p>
        <span>Workout ID:</span> {workout.workout_id}
      </p>
      <p>
        <span>Date and Time:</span> {setDateTime.date} {setDateTime.time}
      </p>
      <p>
        <span>Workout Note:</span> {workout.note}
      </p>
    </WorkoutCardStyles>
  );
}
