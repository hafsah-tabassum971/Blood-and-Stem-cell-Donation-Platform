import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import styled from 'styled-components';
import StemcellAppointment from "./StemcellAppointment"; // Import StemcellAppointment

const Container = styled.div`
  margin: 10px auto;
  padding: 30px;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Heading = styled.h2`
  text-align: left;
  color: #b00000;
  margin-bottom: 30px;
  font-size: 1.8rem;
  text-transform: uppercase;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 18px;
  color: #b00000;
  font-weight: bold;
`;

const Error = styled.div`
  color: #b00000;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Info = styled.div`
  color: #5a5a5a;
  text-align: left;
  font-size: 1rem;
`;

const Text = styled.div`
  color: #5a5a5a;
  text-align: left;
  font-size: 1rem;
  margin-top: 50px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: center;
  background-color: #b00000;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const Td = styled.td`
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #333;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #e9ecef;
  }
`;

const StatusTd = styled(Td)`
  font-weight: bold;
  color: ${(props) => {
    if (props.status === 'Completed') return '#28a745';
    if (props.status === 'In Progress') return '#dc3545';
    if (props.status === 'Pending') return '#dc3545';
    return '#333';
  }};
`;

const AppointmentButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #b00000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background-color: rgb(158, 25, 18);
  }
`;

const MatchedButton = styled(AppointmentButton)`
  background-color: #b00000;
  &:hover {
    background-color: rgb(158, 25, 18);
  }
`;

const IneligibleMessage = styled.div`
  color: #b00000;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
`;



const ViewHLAStatus = () => {
  const [hlaTests, setHlaTests] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [hospitalName, setHospitalName] = useState(null); // New state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showIneligibleMessage, setShowIneligibleMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHLAStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view-hla-status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("HLA Tests Response: ", response.data); // Debugging
        setHlaTests(response.data.hlaTests);
        if (response.data.hlaTests.length > 0) {
          console.log("Extracted Hospital ID: ", response.data.hlaTests[0].hospitalId);
          console.log("Extracted Hospital Name: ", response.data.hlaTests[0].hospitalName);
          setHospitalId(response.data.hlaTests[0].hospitalId);
          setHospitalName(response.data.hlaTests[0].hospitalName); // Extract hospitalName
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchHLAStatus();
  }, []);

  const handleAppointment = () => {
    const hasMatchedResult = hlaTests.some((test) => test.result === 'Matched');
    const hasMismatchedResult = hlaTests.some((test) => test.result === 'Mismatched');

    console.log("Navigating to StemcellAppointment with:", { hospitalId, hospitalName });
    if (hasMatchedResult) {
      navigate('/stemcellappointment', { state: { hospitalId, hospitalName } }); // Navigate with state
    } else if (hasMismatchedResult) {
      setShowIneligibleMessage("You are marked as 'Mismatched' based on your HLA test results. You are not eligible for stem cell donation.");
    } else {
      setShowIneligibleMessage("No 'Matched' result found. Please wait for further updates.");
    }

  };

  return (
    <Container>
      <Heading>HLA Status</Heading>
      {loading && <Loader>Loading...</Loader>}
      {error && <Error>{error}</Error>}
      {!loading && !error && hlaTests.length === 0 && (
        <>
          <Info>No HLA testing records found.</Info>
          <AppointmentButton onClick={handleAppointment}>
            Make HLA Test Appointment
          </AppointmentButton>
        </>
      )}
      {!loading && !error && hlaTests.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Test Date</Th>
              <Th>Hospital</Th>
              <Th>Patient Name</Th>
              <Th>Result</Th>
            </tr>
          </thead>
          <tbody>
            {hlaTests.map((test, index) => (
              <Tr key={test._id}>
                <Td>{index + 1}</Td>
                <Td>{new Date(test.testDate).toLocaleDateString()}</Td>
                <Td>{test.hospitalName}</Td>
                <Td>{test.patientName || 'N/A'}</Td>
                <Td>{test.result}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
      {!loading && !error && (
        <>

          {showIneligibleMessage && (
            <IneligibleMessage>
              {showIneligibleMessage}
            </IneligibleMessage>
          )}

          <MatchedButton onClick={handleAppointment}>
            Proceed to Stem Cell Appointment
          </MatchedButton>
        </>
      )}

    </Container>
  );
};

export default ViewHLAStatus;







