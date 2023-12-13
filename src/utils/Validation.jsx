export const validations = [
  {
    field: "fullName",
    validate: (value) => value.trim() !== "",
    message: "Please enter your full name"
  },
  {
    field: "email",
    validate: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
    message: "Please enter a valid email address"
  },
  {
    field: "phoneNumber",
    validate: (value) =>
      value.trim() !== "" && /^[+]*(\(\d{1,4}\))?[-\s./\d]*$/i.test(value),
    message: "Please enter a valid phone number"
  },
  {
    field: "password",
    validate: (value) => value.length >= 6,
    message: "Password must be at least 6 characters long"
  },
  {
    field: "confirmPassword",
    validate: (value, formValues) => value === formValues.password,
    message: "Passwords do not match"
  }
];
