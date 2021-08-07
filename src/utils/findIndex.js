// This will find the position in an array of whatever you're looking for using an ID of some sort.
// You give this an array of objects, the key to look for like workout_id, and then the value of whatever ID is being passed in.

// Example: 

// import findWithAttr from "../utils/findIndex";
// const index = findWithAttr(allWorkoutLogs, "workout_log_id", workoutLogID);

export default function findWithAttr(array, attr, value) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}
