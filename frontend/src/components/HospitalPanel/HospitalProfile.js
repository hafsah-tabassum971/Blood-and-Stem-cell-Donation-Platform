import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icon


// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  border-radius: 15px;

   @media (max-width: 768px) {
    padding: 15px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #b00000;
    @media (max-width: 680px) {
    font-size: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    @media (max-width: 480px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  color: #b00000;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eaeaea;
    @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
    @media (max-width: 550px) {
    font-size:12px;
  }
        @media (max-width: 430px) {
    font-size:9px;
  }
`;
const InfoValue = styled.input`
  color: #555;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? "#f9f9f9" : "#fff")};
  width: 70%;
  position: relative;  // Required for absolute positioning of the icon inside the field
  
  @media (max-width: 550px) {
    font-size: 12px;
  }
  @media (max-width: 430px) {
    font-size: 9px;
  }
`;

const Button = styled(Link)`
  padding: 10px 18px;
  border-radius: 20px;
  background-color: #b00000;
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  margin-top: 20px;

  &:hover {
    background-color: rgb(158, 25, 18);
    color: white;
  }
      @media (max-width: 480px) {
  font-size: 10px;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.success ? "green" : "red")};
  font-weight: bold;
  margin-bottom: 30px;
`;

const PasswordToggleIcon = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

function HospitalProfile() {
  const [hospitalInfo, setHospitalInfo] = useState({
    user: {
      name: "",
      address: "",
      email: "",
      contactNumber: "",
    },
    donationType: "",
    hospitalType: "",
  });


  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const [infoMessage, setInfoMessage] = useState({ text: "", success: false });
  const [passwordMessage, setPasswordMessage] = useState({ text: "", success: false });

  useEffect(() => {
    fetchHospitalInfo();
  }, []);

  const fetchHospitalInfo = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/hospital-profile`);
      console.log(data); // Check API response
      setHospitalInfo(data.hospital);

    } catch (error) {
      setInfoMessage({ text: "Error fetching hospital info", success: false });

    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setInfoMessage({ text: "", success: false });

  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalInfo({
      ...hospitalInfo,
      user: {
        ...hospitalInfo.user,
        [name]: value,
      },
    });
  };


  const handleSave = async () => {
    const newErrors = {};

    // Contact Number validation: exactly 11 digits (only digits)
    const contact = hospitalInfo.user?.contactNumber;

    // Contact Number validation for hospital
    if (contact && !/^\d{11}$/.test(contact)) {
      newErrors.contactNumber = "Contact number must be exactly 11 digits (numbers only)";
    }


    //"If there are any validation errors in the form, update the errors state so we can display them."

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop saving if errors exist
    }
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/hospital-profile/update`, {
        address: hospitalInfo.user?.address,
        contactNumber: hospitalInfo.user?.contactNumber,
      });

      setIsEditing(false);
      setInfoMessage({ text: data.message || "Information updated", success: true });
      // Clear contact number error after successful save
      setErrors((prevErrors) => {
        const { contactNumber, ...rest } = prevErrors;
        return rest;
      });
    } catch (error) {
      setInfoMessage({ text: "Error updating information", success: false });

    }
  };

  const handlePasswordEditToggle = () => {
    setIsPasswordEditing(!isPasswordEditing);
    setPasswordMessage({ text: "", success: false });

    if (isPasswordEditing) {
      setPassword({ current: "", new: "", confirm: "" }); // Clear when toggling off
    }
  };


  const handlePasswordUpdate = async () => {
    if (password.new.length < 8) {
      setPasswordMessage({
        text: "New password must be at least 8 characters long.",
        success: false,
      });
      return;
    }

    if (password.new !== password.confirm) {
      setPasswordMessage({
        text: "New password and confirm password do not match.",
        success: false,
      });
      return;
    }

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/hospital/change-password`, {
        currentPassword: password.current,
        newPassword: password.new,
        confirmPassword: password.confirm,
      });

      setPassword({ current: "", new: "", confirm: "" });
      setPasswordMessage({ text: data.message || "Password changed", success: true });
      setIsPasswordEditing(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error changing password";
      setPasswordMessage({ text: errorMsg, success: false });
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field],
    });
  };

  return (
    <Container>
      <Title>Hospital Profile</Title>

      {infoMessage.text && <Message success={infoMessage.success}>{infoMessage.text}</Message>}


      {/* Hospital Information */}
      <Section>
        <SectionTitle>Hospital Information</SectionTitle>
        <InfoContainer>
          <InfoItem>
            <InfoLabel>Hospital Name:</InfoLabel>
            <InfoValue type="text" name="name" value={hospitalInfo.user?.name} disabled />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Address:</InfoLabel>
            <InfoValue
              type="text"
              name="address"
              value={hospitalInfo.user?.address}
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue type="email" name="email" value={hospitalInfo.user?.email} disabled />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Contact Number:</InfoLabel>
            <InfoValue
              type="text"
              name="contactNumber"
              value={hospitalInfo.user?.contactNumber}
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </InfoItem>
          {errors.contactNumber && (
            <Message success={false} style={{
              marginTop: "5px",
              marginBottom: "0px",
              paddingLeft: "2px",
              fontSize: "16px",
              fontWeight: "normal"
            }}>
              {errors.contactNumber}
            </Message>
          )}
          <InfoItem>
            <InfoLabel>Hospital Type:</InfoLabel>
            <InfoValue type="text" name="hospitalType" value={hospitalInfo.hospitalType || "N/A"} disabled />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Donation Type:</InfoLabel>
            <InfoValue type="text" name="donationType" value={hospitalInfo.donationType || "N/A"} disabled />
          </InfoItem>
        </InfoContainer>
        <Button onClick={isEditing ? handleSave : handleEditToggle}>
          {isEditing ? "Save Changes" : "Edit Information"}
        </Button>

      </Section>

      {/* Change Password */}
      <Section>
        <SectionTitle>Change Password</SectionTitle>
        {passwordMessage.text && <Message success={passwordMessage.success}>{passwordMessage.text}</Message>}

        <InfoContainer>
          <InfoItem>
            <InfoLabel>Current Password:</InfoLabel>
            <InfoValue
              type={passwordVisibility.current ? "text" : "password"}
              name="current"
              value={password.current}
              disabled={!isPasswordEditing}
              onChange={(e) => setPassword({ ...password, current: e.target.value })}
            />
            {isPasswordEditing && (
              <PasswordToggleIcon onClick={() => togglePasswordVisibility("current")}>
                {passwordVisibility.current ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggleIcon>
            )}
          </InfoItem>
          <InfoItem>
            <InfoLabel>New Password:</InfoLabel>
            <InfoValue
              type={passwordVisibility.new ? "text" : "password"}
              name="new"
              value={password.new}
              disabled={!isPasswordEditing}
              onChange={(e) => setPassword({ ...password, new: e.target.value })}
            />
            {isPasswordEditing && (
              <PasswordToggleIcon onClick={() => togglePasswordVisibility("new")}>
                {passwordVisibility.new ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggleIcon>
            )}
          </InfoItem>
          <InfoItem>
            <InfoLabel>Confirm New Password:</InfoLabel>
            <InfoValue
              type={passwordVisibility.confirm ? "text" : "password"}
              name="confirm"
              value={password.confirm}
              disabled={!isPasswordEditing}
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            />
            {isPasswordEditing && (
              <PasswordToggleIcon onClick={() => togglePasswordVisibility("confirm")}>
                {passwordVisibility.confirm ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggleIcon>
            )}
          </InfoItem>
        </InfoContainer>
        <Button onClick={isPasswordEditing ? handlePasswordUpdate : handlePasswordEditToggle}>
          {isPasswordEditing ? "Update Password" : "Change Password"}
        </Button>
      </Section>

    </Container>
  );
}

export default HospitalProfile;