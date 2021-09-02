import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useFetchApi from "../hooks/useFetchAPI";
import useForm from "../hooks/useForm";
import XIcon from "./SVG/XIcon.jsx";

const AddWorkoutStyles = styled.div`
  header {
    border-bottom: 1px solid white;
    padding: 0.5rem 1rem;
    h2 {
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
  }
`;

export default function AddWorkout({ toggleAddWorkoutModal }) {
  const { crudData } = useFetchApi();
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(async () => {
    try {
      const exerciseList = await crudData("/exercise", "Get");
      setExerciseData(exerciseList);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const { values, updateValue } = useForm({
    date: "",
    time: "",
    exercise: "",
  });

  let exerciseList = null;

  if (exerciseData) {
    exerciseList = exerciseData.map((exercise) => <option key={exercise.exercise_id}>{exercise.exercise}</option>);
  }

  return (
    <AddWorkoutStyles className="modal">
      <header>
        <h2>Add Workout!</h2>
        <button className="close-modal" onClick={() => toggleAddWorkoutModal()} type="button">
          <XIcon />
        </button>
      </header>
      <div className="modal-body">
        <form>
          <fieldset>
            <label htmlFor="date">
              Date:
              <input id="date" name="date" onChange={updateValue} required type="date" value={values.date} />
            </label>
            <label htmlFor="time">
              Time:
              <input id="time" name="time" onChange={updateValue} required type="time" value={values.time} />
            </label>
            <label htmlFor="exercise">
              Exercise:
              <select>{exerciseList}</select>
            </label>
          </fieldset>
        </form>
      </div>
    </AddWorkoutStyles>
  );
}
