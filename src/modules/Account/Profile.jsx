import { useState } from "react";
import styled from "styled-components";
import theme from "../../theme/theme"; // Update the path to your theme file

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${theme.colors.BG};
`;

const ProfileCard = styled.div`
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${theme.colors.headerBG};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeading = styled.h2`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.textColor};
  margin-bottom: 20px;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ProfileField = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${theme.colors.Border};
  border-radius: 4px;
`;

const ProfileButton = styled.button`
  background-color: ${theme.colors.dropdownButtonBG};
  color: ${theme.colors.textColor};
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
`;

const Profile = () => {
  const [fullName, setFullName] = useState("John Doe"); // Example data
  const [email, setEmail] = useState("john.doe@example.com"); // Example data

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update profile information here
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeading>Edit Profile</ProfileHeading>
        <ProfileForm onSubmit={handleSubmit}>
          <ProfileField
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <ProfileField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ProfileButton type="submit">Save Changes</ProfileButton>
        </ProfileForm>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
