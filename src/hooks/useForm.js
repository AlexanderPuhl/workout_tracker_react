import { useState } from "react";

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  function updateValue(event) {
    // check if its a number and convert
    let { value } = event.target;
    if (event.target.type === "number") {
      value = parseInt(event.target.value, 10);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [event.target.name]: value,
    });
  }
  return { values, updateValue };
};

export default useForm;
