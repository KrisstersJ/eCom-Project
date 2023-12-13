import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../assets/logo.png";
import cartIcon from "../assets/cart-icon.png";
import profileIcon from "../assets/profile-icon.png";
import searchIcon from "../assets/search-icon.png";
import { useState, useEffect, useRef } from "react";
import theme from "../theme/theme";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

// Navbar component
const Navbar = ({ isAuthenticated, fullName, setIsAuthenticated }) => {
  Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fullName: PropTypes.string,
    setIsAuthenticated: PropTypes.func.isRequired
  };
  // State for menu open/close
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove("IsAuthenticated");
    sessionStorage.clear();
    sessionStorage.removeItem("FullName");
    window.location.replace("/login");
  };

  // Handle outside click to close menu
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <Header>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
        <LogoText>otestas Idoneitatem</LogoText>
      </LogoContainer>
      <SearchForm>
        <SearchBar type="text" placeholder="Search..." />
        <SearchButton type="submit">
          <SearchIcon src={searchIcon} alt="Search" />
        </SearchButton>
      </SearchForm>
      <TestProfile>{fullName}</TestProfile>
      <MenuContainer ref={menuRef}>
        <MenuTrigger onClick={() => setOpen(!open)}>
          <ProfileIcon src={profileIcon} alt="Profile" />
        </MenuTrigger>
        <DropdownMenu active={open} isAuthenticated={isAuthenticated}>
          {!isAuthenticated && (
            <>
              {" "}
              <DropdownButton to="/login">Login</DropdownButton>
              <h3>Don&#39;t have an account?</h3>
              <DropdownButton to="/register">Register</DropdownButton>
            </>
          )}
          <ul>
            <DropdownItem
              text="My Profile"
              isAuthenticated={isAuthenticated}
              link="/profile"
            />
            <DropdownItem
              text="Settings"
              isAuthenticated={isAuthenticated}
              link="/settings"
            />
            <DropdownItem
              text="Logout"
              isAuthenticated={isAuthenticated}
              onClick={handleLogout}
            />
          </ul>
        </DropdownMenu>
      </MenuContainer>
      <StyledCartButton to="/cart">
        <CartIcon src={cartIcon} alt="Cart" />
      </StyledCartButton>
    </Header>
  );
};

// DropdownItem component
const DropdownItem = ({ text, isAuthenticated, link, onClick }) => (
  <li>
    {isAuthenticated ? (
      <StyledDropdownButton to={link} onClick={onClick}>
        {text}
      </StyledDropdownButton>
    ) : (
      <a>{text}</a>
    )}
  </li>
);

DropdownItem.propTypes = {
  text: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

// Styled components

const TestProfile = styled.h2`
  position: absolute;
  right: 135px;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 100vw;
  height: 85px;
  background-color: ${theme.colors.headerBG};
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1;
`;

const SearchForm = styled.form`
  position: relative;
  right: 0px;
`;

const SearchBar = styled.input`
  width: 800px;
  height: 38px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #555;
  transition: box-shadow 0.3s;
  border: 2px solid #d7d7d7;
  background-color: ${theme.colors.headerBG};

  &:focus {
    outline: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.14);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0px;
  width: 50px;
  height: 38px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 40px;
`;

const LogoText = styled.h1`
  color: ${theme.colors.textColor};
  margin-left: 5px;
`;

const StyledCartButton = styled(Link)`
  display: inline-flex;
`;

const CartIcon = styled.img`
  padding: 5px;
  border-radius: 5px;
  height: 35px;
`;

const ProfileIcon = styled.img``;

const MenuContainer = styled.div`
  position: absolute;
  right: 75px;
`;

const MenuTrigger = styled.div`
  img {
    width: 50px;
  }
`;

const DropdownButton = styled(Link)`
  margin-top: 10px;
  text-decoration: none;
  color: ${theme.colors.textColor};
  background-color: ${theme.colors.dropdownButtonBG};
  padding: 8px 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  transition: background-color 0.3s;
  border: 1px solid ${theme.colors.BG};

  &:hover {
    background-color: ${theme.colors.dropdownButtonHoverBackground};
  }
`;

const StyledDropdownButton = styled(Link)`
  position: relative;
  right: 20px;
  margin: 3px 0px;
  font-size: 16px;
  text-decoration: none;
  color: ${theme.colors.textColor};
  padding: 7px 15px;
  border-radius: 4px;
  width: 80px;
  display: flex;
  justify-content: center;
  transition: background-color 0.3s, border 0.3s;

  &:hover {
    font-weight: 600;
    border-color: ${theme.colors.Border};
    transform: scale(1.05);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 85px;
  right: 13px;
  background-color: ${theme.colors.headerBG};
  border-radius: 8px;
  padding: ${({ isAuthenticated }) =>
    isAuthenticated ? "0px 0px" : "10px 20px"};
  width: ${({ isAuthenticated }) => (isAuthenticated ? "150px" : "170px")};
  box-shadow: 0 8px 15px 2px rgba(0, 0, 0, 0.34);
  border: 1px solid ${theme.colors.Border};
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    background: ${theme.colors.headerBG};
    transform: rotate(45deg);
  }

  ${({ active }) =>
    active
      ? css`
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          transition: 500ms ease;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transform: translateY(-20px);
          transition: 500ms ease;
        `}

  ul li {
    padding: 7px 0;
    border-top: ${(props) =>
      props.isAuthenticated ? "none" : "1px solid rgba(0, 0, 0, 0.05)"};
    list-style: none;
  }
`;

export default Navbar;
