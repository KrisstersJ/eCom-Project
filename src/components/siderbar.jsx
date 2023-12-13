import styled, { css } from "styled-components";
import { useState } from "react";

import theme from "../theme/theme";
import catalogIcon from "../assets/catalog-icon.png";
import ordersIcon from "../assets/orders-icon.png";
import recommendedIcon from "../assets/recommended-icon.png";
import reviewIcon from "../assets/reviews-icon.png";
import contactIcon from "../assets/contact-icon.png";
import themeIcon from "../assets/theme-icon.png";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const handleModeChange = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <SidebarContainer
        expanded={expanded}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <SidebarButton
          expanded={expanded}
          active={activeButton === 0}
          onClick={() => handleButtonClick(0)}
        >
          <SidebarIcon src={catalogIcon} alt="Catalog" />
          {expanded && <SidebarText>Catalog</SidebarText>}
        </SidebarButton>
        <SidebarButton
          expanded={expanded}
          active={activeButton === 1}
          onClick={() => handleButtonClick(1)}
        >
          <SidebarIcon src={ordersIcon} alt="Orders" />
          {expanded && <SidebarText>Orders</SidebarText>}
        </SidebarButton>
        <SidebarButton
          expanded={expanded}
          active={activeButton === 2}
          onClick={() => handleButtonClick(2)}
        >
          <SidebarIcon src={recommendedIcon} alt="Recommended" />
          {expanded && <SidebarText>Recommended</SidebarText>}
        </SidebarButton>
        <SidebarButton
          expanded={expanded}
          active={activeButton === 3}
          onClick={() => handleButtonClick(3)}
        >
          <SidebarIcon src={reviewIcon} alt="Review" />
          {expanded && <SidebarText>Reviews</SidebarText>}
        </SidebarButton>
        <SidebarButton
          expanded={expanded}
          active={activeButton === 4}
          onClick={() => handleButtonClick(4)}
        >
          <SidebarIcon src={contactIcon} alt="Contact" />
          {expanded && <SidebarText>Contact</SidebarText>}
        </SidebarButton>
        <SidebarToggleButton
          expanded={expanded}
          active={activeButton === 5}
          onClick={handleModeChange}
          Mode={isDarkMode}
        >
          <ToggleIcon src={themeIcon} alt="Theme" />
          {expanded && (
            <ToggleText>{isDarkMode ? "Dark Mode" : "Light Mode"}</ToggleText>
          )}
        </SidebarToggleButton>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.nav`
  padding-top: 200px;
  position: sticky;
  top: 85px;
  left: 0;
  width: ${({ expanded }) => (expanded ? "200px" : "80px")};
  height: calc(100vh - 285px);
  background: ${theme.colors.headerBG};
  transition: width 0.3s ease;
  z-index: 2;
  box-shadow: 8px 0 10px rgba(0, 0, 0, 0.1);
  clip-path: inset(0px -15px 0px 0px);

  &:hover {
    width: 200px;
  }
`;

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background: ${theme.colors.headerBG};
  border: none;
  cursor: pointer;
  transition: width 0.3s ease, background 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;

  ${({ active }) =>
    active &&
    css`
      background: ${theme.colors.dropdownButtonBG};
      color: ${theme.colors.textColor};
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    `}

  ${({ expanded }) =>
    !expanded &&
    css`
      span {
        display: none;
      }
    `}

  &:hover {
    background: ${theme.colors.dropdownButtonHoverBackground};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  &:nth-child(3) {
    img {
      height: 32px;
      width: 32px;
    }
  }

  &:nth-child(4) {
    img {
      height: 47px;
      width: 47px;
    }
  }
`;

const SidebarToggleButton = styled(SidebarButton)`
  margin-top: -550px;
`;

const ToggleIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ToggleText = styled.span``;

const SidebarIcon = styled.img`
  width: 38px;
  margin-right: 10px;
`;

const SidebarText = styled.span``;

export default Sidebar;
