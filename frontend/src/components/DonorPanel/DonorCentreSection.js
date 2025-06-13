
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Section = styled.div`
  text-align: left;
  margin: 0 auto;
  padding: 60px;
  // max-width: 700px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Subsection = styled.div`
  text-align: left;
  margin: 0 auto;
  padding: 60px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  color: #b00000;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  text-align: left;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterLabel = styled.label`
  font-size: 16px;
  color: #333;
  margin-right: 10px;
  flex: 1;
  
  @media (max-width: 600px) {
    margin-bottom: 10px;
    text-align: left;
  }
`;

const FilterInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 200px;
  color: #333;
  transition: border 0.3s ease;

  &:focus {
    border-color: #b00000;
    outline: none;
  }

  @media (max-width: 600px) {
    width: auto;
    margin-bottom: 10px;
  }
`;

const FilterButton = styled.button`
  background-color: #b00000;
  color: white;
  padding: 10px 20px;
  margin-left:5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const DonorCentreList = styled.div`
  margin: 15px 0;
`;

const CentreCard = styled.div`
  padding: 15px;
  background-color: ${(props) => (props.selected ? "#e6e6e6" : "#f8f8f8")};
  margin: 10px 0;
  border: ${(props) => (props.selected ? "2px solid #b00000" : "1px solid #ddd")};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease;

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


const DonorCentreSection = ({ onNext, onBack, setSelectedHospitalId, setSelectedHospitalName }) => {
  const [area, setArea] = useState(""); // State to store user input for area
  const [showCentres, setShowCentres] = useState(false); // Toggle visibility of the centres
  const [errorMessage, setErrorMessage] = useState(""); // Error message for validation
  const [hospitals, setHospitals] = useState([]); // List of hospitals fetched from the backend
  const [selectedCentre, setSelectedCentre] = useState(null); // Index of the selected donor centre
  const [selectedCentreName, setSelectedCentreName] = useState(""); // Name of the selected centre

  // Function to handle user input for area and trigger suggestions
  const handleAreaChange = async (e) => {
    setArea(e.target.value); // Set area as the user types
    if (e.target.value.trim().length >= 3) { // Start fetching after 3 characters
      await fetchHospitals(e.target.value);
    }
  };

  // Fetch hospitals from the backend API
  const fetchHospitals = async (area) => {
    try {
      const token = localStorage.getItem("token"); // Assuming authentication token is stored in localStorage
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hospitals/nearby`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        params: { area }, // Pass the area as a query parameter
      });

      setHospitals(response.data.hospitals); // Update the state with the fetched data
      setShowCentres(true); // Display the centres
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Unable to fetch donor centres. Please try again later."
      );
      setShowCentres(false);
    }
  };

  // Handle form submission to search for hospitals
  const handleAreaSubmit = async () => {
    if (!area.trim()) {
      setErrorMessage("Please enter a valid city or town.");
      setShowCentres(false);
    } else {
      setErrorMessage("");
      await fetchHospitals(area);
    }
  };

  // Handle the selection of a donor centre
  const handleCentreSelect = (index, hospital) => {
    setSelectedCentre(index); // Mark the selected centre
    setSelectedCentreName(hospital.user.name); // Store the name of the selected centre
    setSelectedHospitalId(hospital._id); // Update the parent with the hospital ID
    setErrorMessage(""); // Clear any error messages
  };

  // Validate and proceed to the next step
  const handleContinue = () => {
    if (selectedCentre === null) {
      setErrorMessage("Please select a donor centre to continue.");
    } else {
      setErrorMessage("");
      // onNext(); // Trigger the next step in the process
      ////onNext(hospitals[selectedCentre]._id); 
      //   setSelectedCentreName(selectedCentre); // Store the name of the selected centre
      // setSelectedHospitalId(selectedCentreName);
      // onNext();
      onNext(hospitals[selectedCentre]._id, hospitals[selectedCentre].user.name);
    }
  };

  return (
    <Section>
      <Title>Select Donor Centre</Title>
      <Subsection>
        <Subtitle>Choose a donor centre near you:</Subtitle>

        <FilterContainer>
          <FilterLabel>Enter your town or city :</FilterLabel>
          <FilterInput
            type="text"
            placeholder="e.g., Lahore, Karachi"
            value={area}
            onChange={handleAreaChange}
          />
          <FilterButton onClick={handleAreaSubmit}>Filter</FilterButton>
        </FilterContainer>

        {/* Display error message if any */}
        {errorMessage && <Message>{errorMessage}</Message>}

        {/* Show selected donor centre */}
        {selectedCentreName && (
          <p>
            Selected Donor Centre: <strong>{selectedCentreName}</strong>
          </p>
        )}

        {/* Display list of donor centres if available */}
        {showCentres && hospitals.length > 0 && (
          <DonorCentreList>
            {hospitals.map((hospital, index) => (
              <CentreCard
                key={index}
                selected={selectedCentre === index}
                onClick={() => handleCentreSelect(index, hospital)} // Pass the hospital object to the function
              >
                <div><strong>{hospital.user.name}</strong></div>
                <div>{hospital.user.address}</div> {/* Displaying address of the hospital */}
              </CentreCard>
            ))}
          </DonorCentreList>
        )}

        {/* Show message if no donor centres are found */}
        {showCentres && hospitals.length === 0 && <p>No donor centres found.</p>}
      </Subsection>

      {/* Navigation buttons */}
      <ButtonsContainer>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleContinue}>Continue</Button>
      </ButtonsContainer>
    </Section>
  );
};

export default DonorCentreSection;

