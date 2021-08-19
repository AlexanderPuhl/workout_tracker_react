import React, { useEffect, useState } from "react";
import useFetchApi from "../hooks/useFetchAPI";

export default function AddWorkout() {
  const { crudData } = useFetchApi();
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getExercisesEffect = async () => {
      try {
        const exerciseData = await crudData("/exercise", "Get");
        setExercises(exerciseData);
      } catch (e) {
        console.log(e.message);
      }
    };
    getExercisesEffect();
  }, []);

  useEffect(() => {
    if (exercises) {
      setLoading(false);
    }
  }, [exercises]);

  let exerciseDropdown;

  if (loading) {
    exerciseDropdown = null;
  } else {
    exerciseDropdown = exercises.map((exercise) => <option key={exercise.exercise_id}>{exercise.exercise}</option>);
  }
  return (
    <section>
      <h1>Add Workouts</h1>
      <form>
        <fieldset>
          <label htmlFor="date">
            Date:
            <input id="date" type="date" min="1900-01-01" />
          </label>
          <label htmlFor="time">
            Time:
            <input id="time" type="time" />
          </label>
          <label htmlFor="exercises">
            Exercises:
            <select name="exercises" id="exercises">
              {exerciseDropdown}
            </select>
          </label>
        </fieldset>
      </form>
    </section>
  );
}
