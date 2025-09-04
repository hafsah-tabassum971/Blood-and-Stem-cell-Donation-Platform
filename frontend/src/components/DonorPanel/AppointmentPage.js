import React, { useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";  // Importing the check circle icon from react-icons
import EligibilitySection from "./EligibilitySection";
import DonationTypeSection from "./DonationTypeSection";
import DonorCentreSection from "./DonorCentreSection";
import DateTimeSection from "./DateTimeSection";
import ConfirmationSection from "./ConfirmationSection";
import styled from "styled-components";

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
    @media (max-width: 450px) {
  margin: 40px 10pxpx;
  }
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
    color: ${(props) => (props.completed ? "#b0000" : "#ffffff")}; 
  }

  &:last-child:after {
    content: none;
  }

  @media (max-width: 910px) {
    font-size: 0; /* Hide text labels on small screens */
  }
`;

const StepNumber = styled.div`
  display: none;
  @media (max-width: 910px) {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px;
    color: #b00000;
  }
`;

const StepContent = styled.div`
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  width: 100%;
`;

function AppointmentPage() {
  // State to track the current step of the multi-step form (1 to 5)
  const [step, setStep] = useState(1);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null); // Add this state
  const [selectedHospitalName, setSelectedHospitalName] = useState("");
  const [eligibilityStatus, setEligibilityStatus] = useState("");
  const [donationType, setDonationType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  return (
    <Container>
      <ProgressBar>

        {/* Each ProgressStep shows if active or completed based on current step */}
        <ProgressStep active={step >= 1} completed={step > 1} >
          Check eligibility
        </ProgressStep>
        <ProgressStep active={step >= 2} completed={step > 2}>
          Select donation type
        </ProgressStep>
        <ProgressStep active={step >= 3} completed={step > 3}>
          Select centre
        </ProgressStep>
        <ProgressStep active={step >= 4} completed={step > 4}>
          Choose slot
        </ProgressStep>
        <ProgressStep active={step === 5} completed={step > 4}>
          Confirm appointment
        </ProgressStep>
      </ProgressBar>


      <StepContent hidden={step !== 1}>
        {step === 1 && (
          <EligibilitySection onNext={(status) => {
            // Save eligibility status and move to next step
            setEligibilityStatus(status);
            handleNext();
          }}
          />
        )}
      </StepContent>


      <StepContent hidden={step !== 2}>
        <DonationTypeSection
          onNext={(type) => {
            setDonationType(type);  // This is correct
            handleNext();  // Proceed to next step
          }}
          onBack={handleBack}
          setDonationType={setDonationType} // Make sure this is passed correctly
        />
      </StepContent>

      {/* <StepContent hidden={step !== 3}>
        {step === 3 && (
          <DonorCentreSection onNext={handleNext} onBack={handleBack} 
          setSelectedHospitalId={setSelectedHospitalId} // Pass the setter function here
          />
        )}
      </StepContent> */}
      {/* <StepContent hidden={step !== 3}> 
  {step === 3 && (
    <DonorCentreSection 
      onNext={(hospitalId) => { 
        setSelectedHospitalId(hospitalId); 
        handleNext();
      }} 
      onBack={handleBack} 
    />
  )}
</StepContent> */}
      {/* <StepContent hidden={step !== 3}> 
 {step === 3 && (
  <DonorCentreSection 
  onNext={handleNext} 
  onBack={handleBack} 
  setSelectedHospitalId={setSelectedHospitalId} // ✅ Pass it directly
/>
)}
</StepContent> */}
      <StepContent hidden={step !== 3}>
        {step === 3 && (
          <DonorCentreSection
            onNext={(hospitalId, hospitalName) => {
              setSelectedHospitalId(hospitalId);
              setSelectedHospitalName(hospitalName);
              handleNext();
            }}
            onBack={handleBack}
            setSelectedHospitalId={setSelectedHospitalId}
            setSelectedHospitalName={setSelectedHospitalName}
          />
        )}
      </StepContent>


      {/* <StepContent hidden={step !== 4}>
        {step === 4 && (
          <DateTimeSection onNext={handleNext} onBack={handleBack} 
          hospitalId={selectedHospitalId} 
          setAppointmentDate={setAppointmentDate} setAppointmentTime={setAppointmentTime}
          />
        )}
      </StepContent> */}
      <StepContent hidden={step !== 4}>
        {step === 4 && (
          <DateTimeSection
            onNext={handleNext}
            onBack={handleBack}
            hospitalId={selectedHospitalId}
            setAppointmentDate={setAppointmentDate}
            setAppointmentTime={setAppointmentTime}
          />
        )}
      </StepContent>

      <StepContent hidden={step !== 5}>
        {step === 5 && <ConfirmationSection onBack={handleBack}
          hospitalId={selectedHospitalId}
          hospitalName={selectedHospitalName}
          eligibilityStatus={eligibilityStatus}
          donationType={donationType}
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime} />}
      </StepContent>
    </Container>
  );
}

export default AppointmentPage;
