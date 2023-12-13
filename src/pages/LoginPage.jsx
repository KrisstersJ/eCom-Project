import PropTypes from "prop-types";
import LoginForm from "../modules/login/LoginForm";

const LoginPage = ({ setIsAuthenticated }) => {
  return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
};

LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired
};

export default LoginPage;
