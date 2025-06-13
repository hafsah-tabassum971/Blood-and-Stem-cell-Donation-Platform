import React, { useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";  // Importing the check circle icon from react-icons
import DateTimeSection from "./DateTimeSection";
import ConfirmStemcellSection from "./ConfirmStemcellSection";
import styled from "styled-components";
import { useLocation } from "react-router-dom";


// Styled Components
const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 40px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  border: solid #b00000;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  position: relative;
`;

const ProgressStep = styled.div`
  text-align: center;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) =>
    props.active || props.completed ? "#b00000" : "#B0B0B0"};
  transition: color 0.3s ease-in-out;
  position: relative;

  &:before {
    content: "";
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
    background-color: ${(props) =>
    props.active ? "#b00000" : props.completed ? "#FF4D4D" : "#ddd"};
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: ${(props) => (props.completed ? "#b0000" : "#ffffff")}; /* Green color for check circle */
  }

  &:last-child:after {
    content: none;
  }


`;

const StepContent = styled.div`
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  width: 100%;
`;

function StemcellAppointment() {
  const location = useLocation();
  const { hospitalId, hospitalName } = location.state || {}; // Get values from navigation
  console.log("Received hospitalId: ", hospitalId);
  console.log("Received hospitalName: ", hospitalName);

  const [step, setStep] = useState(1);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  return (
    <Container>
      {/* Progress Bar */}
      <ProgressBar>

        <ProgressStep active={step >= 1} completed={step > 1}>
          Choose slot
        </ProgressStep>
        <ProgressStep active={step >= 2} completed={step > 2}>
          Confirm appointment
        </ProgressStep>
      </ProgressBar>

      <StepContent hidden={step !== 1}>
        {step === 1 && (
          <DateTimeSection
            onNext={handleNext}
            onBack={handleBack}
            hospitalId={hospitalId} // Pass hospitalId
            hospitalName={hospitalName} // Pass hospitalName
            setAppointmentDate={setAppointmentDate}
            setAppointmentTime={setAppointmentTime}
          />
        )}
      </StepContent>
      <StepContent hidden={step !== 2}>
        {step === 2 && (
          <ConfirmStemcellSection onNext={handleNext} onBack={handleBack}
            hospitalId={hospitalId} // Pass hospitalId
            hospitalName={hospitalName} // Pass hospitalName
            appointmentDate={appointmentDate}
            appointmentTime={appointmentTime}
          />
        )}
      </StepContent>
    </Container>
  );
}

export default StemcellAppointment;
