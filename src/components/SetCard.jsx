import React from "react";
import styled from "styled-components";

const SetCardStyles = styled.div`
  margin: 1rem 0;
`;

export default function SetCard({ set }) {
  return (
    <SetCardStyles>
      <p>
        {set.number_of_sets} sets of {set.number_of_reps} at {set.weight}lbs
      </p>
    </SetCardStyles>
  );
}
