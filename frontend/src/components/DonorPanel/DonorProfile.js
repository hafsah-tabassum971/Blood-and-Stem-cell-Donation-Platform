import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const Message = styled.p`
  color: ${(props) => (props.success ? "green" : "red")};
  font-weight: bold;
  margin-bottom: 30px;
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
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
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


const Button = styled.button`
  padding: 10px 18px;
  border-radius: 20px;
  background-color: #b00000;
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(158, 25, 18);
  }
`;

const PasswordToggleIcon = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

function DonorProfile() {
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    volunteerStatus: "",
    driveName: "",
    latestBloodDonationDate: "",
    latestStemCellDonationDate: "",
    nextBloodEligibleDate: "",
    nextStemCellEligibleDate: "",

  });


  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirmNew: "",
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
    fetchDonorInfo();
  }, []);

  // New helper to format ALL date fields
  const formatDate = (dateStr) => {
    // If no date string is provided, return a fallback message
    if (!dateStr) return "Not Available";

    // Convert the input string into a Date object
    const date = new Date(dateStr);

    // Format the date into a readable string like "Jun 5, 2025"
    return date.toLocaleDateString("en-US", {
      year: "numeric", // Show full year (e.g., 2025)
      month: "short",  // Show short month name (e.g., Jun)
      day: "numeric",  // Show day of the month (e.g., 5)
    });
  };


  const fetchDonorInfo = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile`, { withCredentials: true });
      console.log(data);
      const volunteerApps = data.donor.volunteerApplications || [];
      const latestApp = volunteerApps[volunteerApps.length - 1]; // Get the last application
      const bloodDate = data.latestBloodDonationDate;
      const stemCellDate = data.latestStemCellDonationDate;
      setDonorInfo({
        firstName: data.donor.name.split(" ")[0] || "",
        lastName: data.donor.name.split(" ")[1] || "",
        contactNumber: data.donor.contactNumber || "",
        email: data.donor.email || "",
        address: data.donor.address || "",
        volunteerStatus: latestApp?.status || "not applied", // fallback if no application
        driveName: latestApp?.drive?.driveName || "N/A", // ✅ correct access
        latestBloodDonationDate: formatDate(bloodDate),
        latestStemCellDonationDate: formatDate(stemCellDate),
        nextBloodEligibleDate: getNextEligibleDate(bloodDate, 3),
        nextStemCellEligibleDate: getNextEligibleDate(stemCellDate, 6),

      });
    } catch (error) {
      setInfoMessage({ text: "Error fetching donor info", success: false });

    }
  };

  // Helper function to calculate the next eligible date after a given number of months
  const getNextEligibleDate = (lastDateStr, months) => {
    // If the input date string is missing, return a fallback message
    if (!lastDateStr) return "Not Available";

    // Convert the last donation/test date string into a Date object
    const lastDate = new Date(lastDateStr);

    // Add the specified number of months to the last date
    const nextDate = new Date(lastDate.setMonth(lastDate.getMonth() + months));

    // Add 1 extra day to avoid booking on the exact last eligible date
    nextDate.setDate(nextDate.getDate() + 1);

    // Format the next eligible date in a readable form, e.g., "Sep 6, 2025"
    return nextDate.toLocaleDateString("en-US", {
      year: "numeric", // Full year (e.g., 2025)
      month: "short",  // Short month name (e.g., Sep)
      day: "numeric",  // Day of the month (e.g., 6)
    });
  };



  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setInfoMessage({ text: "", success: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo({ ...donorInfo, [name]: value });
  };

  const handleSave = async () => {
    const newErrors = {};

    // Contact Number validation: exactly 11 digits (only digits)
    if (donorInfo.contactNumber && !/^\d{11}$/.test(donorInfo.contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 11 digits (numbers only)";
    }

    //"If there are any validation errors in the form, update the errors state so we can display them."
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop saving if errors exist
    }
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/profile/update`, {
        address: donorInfo.address,
        contactNumber: donorInfo.contactNumber,
      }, { withCredentials: true });
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
      setPassword({ current: "", new: "", confirmNew: "" });
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

    if (password.new !== password.confirmNew) {
      setPasswordMessage({
        text: "New password and confirm password do not match.",
        success: false,
      });
      return;
    }

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/change-password`, {
        currentPassword: password.current,
        newPassword: password.new,
        confirmPassword: password.confirmNew,
      });

      setPassword({ current: "", new: "", confirmNew: "" });
      setPasswordMessage({ text: data.message || "Password changed", success: true });
      setIsPasswordEditing(false);
    } catch (error) {
      setPasswordMessage({
        text: error.response?.data?.message || "Error changing password",
        success: false,
      });
    }
  };

  // Helper function to toggle the visibility of a password field
  const togglePasswordVisibility = (field) => {
    // Update the password visibility state by toggling the specific field's value
    setPasswordVisibility({
      ...passwordVisibility,          // Spread the existing visibility states
      [field]: !passwordVisibility[field], // Invert the current visibility of the targeted field
    });
  };

  return (
    <Container>
      <Title>Donor Profile</Title>
      {infoMessage.text && <Message success={infoMessage.success}>{infoMessage.text}</Message>}

      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        <InfoContainer>
          <InfoItem>
            <InfoLabel>First Name:</InfoLabel>
            <InfoValue type="text" value={donorInfo.firstName} disabled />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Last Name:</InfoLabel>
            <InfoValue type="text" value={donorInfo.lastName || "N/A"} disabled />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue type="email" value={donorInfo.email || "N/A"} disabled />
          </InfoItem>

          <InfoItem>
            <InfoLabel>Contact Number:</InfoLabel>
            <InfoValue
              type="text"
              name="contactNumber"
              value={donorInfo.contactNumber || "N/A"}
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
            <InfoLabel>Address:</InfoLabel>
            <InfoValue type="text" name="address" value={donorInfo.address} disabled={!isEditing} onChange={handleInputChange} />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Volunteer Application Status:</InfoLabel>
            <InfoValue type="text" value={donorInfo.volunteerStatus || 'Not Applied'} disabled />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Drive Name:</InfoLabel>
            <InfoValue type="text" value={donorInfo.driveName} disabled />
          </InfoItem>
        </InfoContainer>
        <Button onClick={isEditing ? handleSave : handleEditToggle}>
          {isEditing ? "Save Changes" : "Edit Information"}
        </Button>
      </Section>

      <Section>
        <SectionTitle>Change Password</SectionTitle>
        {passwordMessage.text && <Message success={passwordMessage.success}>{passwordMessage.text}</Message>}
        <InfoContainer>
          <InfoItem>
            <InfoLabel>Current Password:</InfoLabel>
            <InfoValue type={passwordVisibility.current ? "text" : "password"}
              name="current" value={password.current} disabled={!isPasswordEditing} onChange={(e) => setPassword({ ...password, current: e.target.value })} />
            {isPasswordEditing && (
              <PasswordToggleIcon onClick={() => togglePasswordVisibility("current")}>
                {passwordVisibility.current ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggleIcon>
            )}
          </InfoItem>

          <InfoItem>
            <InfoLabel>New Password:</InfoLabel>
            <InfoValue type={passwordVisibility.new ? "text" : "password"}
              name="new" value={password.new} disabled={!isPasswordEditing} onChange={(e) => setPassword({ ...password, new: e.target.value })}
            />
            {isPasswordEditing && (
              <PasswordToggleIcon onClick={() => togglePasswordVisibility("new")}>
                {passwordVisibility.new ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggleIcon>
            )}
          </InfoItem>
          <InfoItem>
            <InfoLabel>Confirm New Password:</InfoLabel>
            <InfoValue type={passwordVisibility.confirm ? "text" : "password"}
              name="confirmNew" value={password.confirmNew} disabled={!isPasswordEditing} onChange={(e) => setPassword({ ...password, confirmNew: e.target.value })} />
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

      <Section>
        <SectionTitle>Donation Stats</SectionTitle>
        <InfoContainer>
          <InfoItem>
            <InfoLabel>Last Blood Donation:</InfoLabel>
            <InfoValue
              type="text"
              value={donorInfo.latestBloodDonationDate}
              disabled
            />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Next Donation (Blood):</InfoLabel>
            <InfoValue
              type="text"
              value={donorInfo.nextBloodEligibleDate}
              disabled
            />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Last Stem Cell Donation:</InfoLabel>
            <InfoValue
              type="text"
              value={donorInfo.latestStemCellDonationDate}
              disabled
            />
          </InfoItem>
          <InfoItem>
            <InfoLabel>Next Donation (Stem Cell):</InfoLabel>
            <InfoValue
              type="text"
              value={donorInfo.nextStemCellEligibleDate}
              disabled
            />
          </InfoItem>
        </InfoContainer>
      </Section>


    </Container>
  );
}

export default DonorProfile;