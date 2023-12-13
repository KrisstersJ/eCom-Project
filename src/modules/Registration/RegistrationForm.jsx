import { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../theme/theme";
import { validations } from "../../utils/Validation";
import { registerUser } from "./_action";

const RegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const getFieldLabel = (field) => {
    switch (field) {
      case "fullName":
        return "Full Name";
      case "email":
        return "Email";
      case "phoneNumber":
        return "Phone Number";
      case "password":
        return "Password";
      case "confirmPassword":
        return "Confirm Password";
      default:
        return field;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const handleRegistration = async () => {
    const newErrors = {};
    validations.forEach(({ field, validate, message }) => {
      if (!validate(formValues[field] || "", formValues)) {
        newErrors[field] = message;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    registerUser(formValues);
    setFormValues({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <FormContainer>
      <Form>
        <Title>Registration Form</Title>
        {validations.map(({ field }) => (
          <Field key={field}>
            <Label htmlFor={field}>{getFieldLabel(field)}</Label>
            <Input
              type={
                field === "password" || field === "confirmPassword"
                  ? "password"
                  : "text"
              }
              id={field}
              name={field}
              value={formValues[field]}
              onChange={handleInputChange}
            />
            {errors[field] && <ErrorMessage>{errors[field]}</ErrorMessage>}
          </Field>
        ))}
        <Button onClick={handleRegistration}>Register</Button>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: -900px;
`;

const Form = styled.div`
  width: 400px;
  padding: 20px;
  background-color: ${theme.colors.BG};
  border-radius: 41px;
  border: 1px solid ${theme.colors.Border};
  box-shadow: 0 8px 15px 2px rgba(0, 0, 0, 0.34);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${theme.colors.textColor};
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${theme.colors.textColor};
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid ${theme.colors.Border};
  border-radius: 4px;
  font-size: ${theme.fontSizes.medium};
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: ${theme.colors.dropdownButtonBG};
  color: ${theme.colors.textColor};
  border: none;
  border-radius: 4px;
  font-size: ${theme.fontSizes.medium};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.colors.dropdownButtonHoverBackground};
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 10px;
  color: red;
`;

export default RegistrationForm;
