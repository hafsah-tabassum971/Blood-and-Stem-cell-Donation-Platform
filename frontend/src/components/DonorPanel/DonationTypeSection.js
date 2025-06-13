import React, { useState } from "react";
import styled from "styled-components";
import { FaTint, FaFlask } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Styled Components
const Section = styled.div`
  text-align: left;
  h2 {
    color: #b00000; /* Dark Red */
  }
      p{
 margin-top: 20px;
  margin-bottom: 20px;

  }
`;

const TypeCard = styled.div`
  padding: 15px;
  background-color: ${(props) => (props.selected ? "#e6e6e6" : "#f8f8f8")};
  margin: 10px 0;
  border: ${(props) => (props.selected ? "2px solid #ff4d4d" : "1px solid #ddd")};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease;
  display: flex;
  align-items: center; /* Align icon and text */
  justify-content: space-between; /* Space between icon and text */

  &:hover {
    background-color: #e6e6e6;
  }
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

const Message = styled.div`
  margin-top: 20px;
  color: red; /* Ensure error message is red */
  font-size: 16px;
`;

const HowItWorks = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #555;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 10px;
`;

const DonationTypeSection = ({ onNext, onBack, setDonationType }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const donationTypes = [
    { name: "Blood Donation", icon: <FaTint size={30} color="#b00000" /> },
    { name: "Stem Cell Donation (For HLA Test)", icon: <FaFlask size={30} color="#b00000" /> }
  ];

  const handleContinue = () => {
    console.log("Selected Type:", selectedType); // Debugging
    if (selectedType === null) {
      setErrorMessage("Please select a donation type to continue.");
      console.log("Error: No donation type selected");
    } else {
      setErrorMessage(""); // Clear the error message if a type is selected

      // Call onNext passed as a prop from the parent component
      onNext(donationTypes[selectedType].name);
    }
  };

  const handleStemCellRedirect = () => {
    // Redirect to the HLA status page
    navigate("/viewhlastatus");
  };

  return (
    <Section>
      <h2>Select Donation Type</h2>
      <p>Choose the type of donation you would like to make:</p>
      {donationTypes.map((type, index) => (
        <TypeCard
          key={index}
          selected={selectedType === index}
          onClick={() => {
            setSelectedType(index); // Update the selected type
            setErrorMessage(""); // Clear the error message when a selection is made
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {type.icon} {/* Render the icon */}
            <span style={{ marginLeft: "10px" }}>{type.name}</span> {/* Render the name */}
          </div>
        </TypeCard>
      ))}

      {/* Show error message if no option is selected */}
      {errorMessage && <Message>{errorMessage}</Message>}

      {/* Conditionally render the "How it works?" message */}
      {selectedType !== null && (
        <HowItWorks>
          <h3>How it works?</h3>
          {selectedType === 0 ? (
            <>
              <p>
                Blood donation is a simple and quick process. After completing your registration and health screening, you'll be seated comfortably while a healthcare professional draws approximately one pint of blood. The donation itself takes about 15 minutes, but plan for about 60 minutes for the entire appointment, including post-donation recovery time. You'll be offered a free snack and drink to help replenish your energy.
              </p>
              <p>Thank you for your generous blood donation!</p>
            </>
          ) : (
            <>
              <p>
                For stem cell donation, your first step is to make an appointment for HLA (Human Leukocyte Antigen) testing. This test helps determine if you are a match for a patient in need of stem cell therapy. If the test results show a match, you will be contacted to schedule another appointment to donate stem cells.
              </p>
              <p>If you've already done with HLA then check your status here and in case of matched status book another appointment to donate stem cells.</p>
              <Button onClick={handleStemCellRedirect}>Book Appointment for Stem Cell Donation</Button> {/* Redirect button */}
            </>
          )}
        </HowItWorks>
      )}

      <ButtonsContainer>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleContinue}>Continue</Button>
      </ButtonsContainer>
    </Section>
  );
};

export default DonationTypeSection;
