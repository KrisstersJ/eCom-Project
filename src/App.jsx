import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/siderbar";
import CartPage from "./pages/CartPage";
import Navbar from "./components/navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import { useState } from "react";
import Cookies from "js-cookie";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("IsAuthenticated") === "true"
  );
  const [fullName, setFullName] = useState(
    sessionStorage.getItem("FullName") || ""
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          fullName={fullName}
        />
        <Sidebar />
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setFullName={setFullName}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
