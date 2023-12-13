import axios from "axios";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/Account/Registration",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};
