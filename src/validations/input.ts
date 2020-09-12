const validator = require("validator").default;
import { isEmpty } from "./is-Empty"

export const validateInput = (data: Record<string, string | number>, fieldNames: string[]) => {
  const errors = {};
  for (let index = 0; index < fieldNames.length; index += 1) {
    const fieldName = fieldNames[index];
    data[fieldName] = !isEmpty(data[fieldName]) ? data[fieldName] : "";
    if (validator.isEmpty(data[fieldName])) {
      errors[fieldName] = `${fieldName} field is required`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

