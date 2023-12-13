import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { validations } from "../../utils/Validation"; // Import the provided validations

const useLoginForm = ({ setIsAuthenticated, setFormValues }) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState(
    Cookies.get("IsAuthenticated") === "true"
  );

  const [fullName, setFullName] = useState("");

  const handleLogin = (formValues, setErrors, setErrorMessage) => {
    const newErrors = {};
    validations.forEach(({ field, validate, message }) => {
      if (field === "email" || field === "password") {
        if (!validate(formValues[field], formValues)) {
          newErrors[field] = message;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post("http://localhost:8080/Account/Login", formValues)
      .then((response) => {
        if (response.status === 200) {
          Cookies.set("IsAuthenticated", "true", { expires: 1 });

          // Clear form values
          setFormValues({
            email: "",
            password: ""
          });

          setErrors({});
          setErrorMessage("");
          setIsAuthenticated(true);
          console.log(response);
          setFullName(response.data.FullName);
          setIsAuthenticatedState(true);
          window.location.replace("/");

          sessionStorage.setItem("IsAuthenticated", "true");
          sessionStorage.setItem("FullName", response.data.FullName);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage("Login failed. Please try again later.");
        }
      });
  };

  useEffect(() => {
    const storedIsAuthenticated = Cookies.get("IsAuthenticated") === "true";
    const storedFullName = sessionStorage.getItem("FullName");
    setIsAuthenticatedState(storedIsAuthenticated);
    setFullName(storedFullName);
  }, [setIsAuthenticatedState]);

  return { isAuthenticated, fullName, handleLogin };
};

export default useLoginForm;
