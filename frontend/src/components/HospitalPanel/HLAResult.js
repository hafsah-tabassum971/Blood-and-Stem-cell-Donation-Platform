import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const HLAResultContainer = styled.div`
  // margin: 20px;
  max-width: 900px;
  margin: 30px auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const PageTitle = styled.h2`
  text-align: center;
  color: #b00000;
      @media (max-width: 600px) {
    font-size: 17px;
  }
`;

const HLAResultForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
   @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #b00000;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color:rgb(158, 25, 18);
  }


  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  // width: 100%;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;


const Notification = styled.p`
  margin-top: 10px;
  padding: 10px;
   marginleft: 20px;
   margin-right: 20px;

  background-color: #eae1e1;
  color: #b00000;
  border-radius: 5px;
    @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

function HLAResult() {
  const [donorId, setDonorId] = useState('');
  const [result, setResult] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [donors, setDonors] = useState([]);
  const [notification, setNotification] = useState('');

  // Fetch donors with pending HLA testing on component mount
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hla-testing-donations`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setDonors(response.data.data);
        } else {
          setNotification(response.data.message || 'No pending HLA testing donations found.');
        }
      } catch (error) {
        setNotification('Error fetching donors: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchDonors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hlaData = {
      donorId,
      result,
      matchedPatientInfo: {
        patientId,
        patientName,
      },
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload-HLA-result`, hlaData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response from API:", response.data);

      if (response.data.success) {
        // setNotification('HLA result uploaded successfully.');
        setNotification(response.data.message); // Show actual API response message
      } else {
        setNotification(response.data.message || 'Error uploading HLA result.');
      }
    } catch (error) {
      setNotification('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <HLAResultContainer>
      <PageTitle>Upload HLA Test Result</PageTitle>
      <HLAResultForm onSubmit={handleSubmit}>
        <FormGroup>
          {/* Label for the donor select input */}
          <Label htmlFor="donorId">Donor:</Label>

          {/* Select dropdown to choose a donor */}
          <Select
            id="donorId"
            value={donorId} // Controlled value from state
            onChange={(e) => setDonorId(e.target.value)} // Update state on change
            required // Makes selection mandatory before form submission
          >
            {/* Placeholder option that is disabled to prompt user selection */}
            <option value="" disabled>
              Select Donor
            </option>

            {/* 
      Map over donors array to create unique donor options:
      - Using a Map to remove duplicate donors by id (ensures unique keys/options)
      - Then mapping over unique donors to render <option> elements
    */}
            {[...new Map(donors.map(donor => [donor.id, donor])).values()].map((donor) => (
              <option key={donor.id} value={donor.id}>
                {donor.name}
              </option>
            ))}
          </Select>
        </FormGroup>


        <FormGroup>
          <Label htmlFor="result">Test Result:</Label>
          <Select id="result" value={result} onChange={(e) => setResult(e.target.value)} required>
            <option value="">Select Result</option>
            <option value="Matched">Matched</option>
            <option value="Mismatched">Mismatched</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="patientId">Patient ID:</Label>
          <Input id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="patientName">Patient Name:</Label>
          <Input id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </FormGroup>

        <Button type="submit">Upload Result</Button>
      </HLAResultForm>

      {notification && <Notification>{notification}</Notification>}
    </HLAResultContainer>
  );
}

export default HLAResult;
