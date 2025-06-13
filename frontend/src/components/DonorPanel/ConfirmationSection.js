import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // To make HTTP requests

// Styled Components
const Section = styled.div`
  text-align: left;
  h2 {
    color: #b00000; /* Dark Red */
  }
    p{
     margin-top: 20px;
  margin-bottom: 20px;}
`;

const SummaryCard = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  &:first-child {
    background-color: white;
    color: #b00000;
    border: solid #b00000;
  }
  &:last-child {
    background-color: #b00000;
    color: white;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 20px;
`;




const ConfirmationSection = ({ onBack, hospitalId, hospitalName, eligibilityStatus, donationType, appointmentDate, appointmentTime }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {

    setSuccessMessage("");
    setErrorMessage("");
    try {
      const appointmentData = {
        hospitalId,
        eligibilityStatus,
        donationType,
        date: appointmentDate,
        time: appointmentTime,
      };

      console.log("Sending appointmentData:", appointmentData); // Debugging Log

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/appointment/blood-donation`, appointmentData);

      if (response.data.success) {
        setSuccessMessage("Appointment successfully booked!");
        // setDonorCentre(response.data.appointment.hospitalName); // Set hospital name
      }

    } catch (error) {
      console.error("Error confirming appointment:", error);
      // alert("Failed to book appointment. Please try again.");
      const errMsg = error.response?.data?.message || "Failed to book appointment. Please try again.";

      if (errMsg.includes("already booked")) {
        setErrorMessage("You have already booked an appointment for this time.");
      } else if (errMsg.includes("capacity full")) {
        setErrorMessage("Sorry, appointment slots are full for the selected time.");
      } else {
        setErrorMessage(errMsg);
      }
    }
  };


  return (
    <Section>
      <h2>Confirm Appointment</h2>
      <p>Please review and confirm your appointment details:</p>
      <SummaryCard>
        <p><strong>Eligibility:</strong> {eligibilityStatus}</p>
        <p><strong>Donation Type:</strong> {donationType}</p>
        {/* <p><strong>Donor Centre:</strong> {donorCentre || "Not available"}</p> */}
        {/* <p><strong>Donor Centre:</strong> {hospitalName}</p> */}
        <p><strong>Donor Centre:</strong> {hospitalName || "Not available"}</p>
        <p><strong>Date:</strong> {appointmentDate}</p>
        <p><strong>Time:</strong> {appointmentTime}</p>
      </SummaryCard>


      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}


      <ButtonsContainer>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </ButtonsContainer>
    </Section>
  );
};

export default ConfirmationSection; 