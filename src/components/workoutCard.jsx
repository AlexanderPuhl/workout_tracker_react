import React from "react";
import styled from "styled-components";
import SetCard from "./SetCard.jsx";
import returnDateTime from "../utils/dateTime";

const WorkoutCardStyles = styled.div`
  border: 1px solid white;
  padding: 1rem;
  margin: 1rem;
  span {
    font-weight: bold;
  }
`;

export default function WorkoutCard({ workout, sets }) {
  const setDateTime = returnDateTime(workout.modified_on);
  const filteredSets = sets.filter((set) => set.workout_id === workout.workout_id);
  return (
    <WorkoutCardStyles>
      <p>
        <span>Workout ID:</span> {workout.workout_id}
      </p>
      <p>
        <span>Date and Time:</span> {setDateTime.date} {setDateTime.time}
      </p>
      {filteredSets.map((set) => (
        <SetCard key={set.set_id} set={set}>
          {set.set_id}
        </SetCard>
      ))}
      <p>
        <span>Workout Note:</span> {workout.note}
      </p>
    </WorkoutCardStyles>
  );
}
