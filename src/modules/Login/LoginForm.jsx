import { useState } from "react";
import styled from "styled-components";
import theme from "../../theme/theme";
import PropTypes from "prop-types";
import useLoginForm from "./_action";

const LoginForm = ({ setIsAuthenticated }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLogin } = useLoginForm({
    setIsAuthenticated,
    setFormValues
  });

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
    setErrorMessage("");
  };

  const onLogin = () => {
    handleLogin(formValues, setErrors, setErrorMessage);
  };

  return (
    <PageContainer>
      <Form>
        <Title>Login Form</Title>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </Field>
        <Button onClick={onLogin}>Login</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </PageContainer>
  );
};

LoginForm.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.BG};
  margin-top: -750px;
  margin-left: -50px;
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

export default LoginForm;
