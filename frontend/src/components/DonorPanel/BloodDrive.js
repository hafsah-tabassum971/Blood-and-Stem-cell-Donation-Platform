import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    margin: 20px auto;
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  color: #b00000;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const DriveList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DriveCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const DriveTitle = styled.h2`
  font-size: 24px;
  color: #b00000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const DriveInfo = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ApplyButton = styled.button`
  padding: 12px 20px;
  background-color: #b00000;
  color: white;
  width: 30%;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(158, 25, 18);
  }

  @media (max-width: 675px) {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
`;

function BloodDrive() {
  const navigate = useNavigate();
  const [bloodDrives, setBloodDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchBloodDrives = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blood-drives`, {
          withCredentials: true,
        });


        // Backend already sends filtered drives
        setBloodDrives(response.data.bloodDrives);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchBloodDrives();
  }, []);


  const handleApplyClick = (drive) => {
    //Sendiing available dates as well
    navigate(`/volunteer?driveId=${drive._id}&startDate=${drive.startDate}&endDate=${drive.endDate}&availableDates=${JSON.stringify(drive.availableDates)}`);
  };

  return (
    <Container>
      <PageTitle>Available Blood Drives</PageTitle>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <DriveList>
          {bloodDrives.map((drive) => (
            <DriveCard key={drive._id}>
              <DriveTitle>{drive.name}</DriveTitle>
              <DriveInfo><strong>Hospital:</strong> {drive.hospital.user?.name}, {drive.hospital.user?.address}</DriveInfo>
              <DriveInfo><strong>Location:</strong> {drive.location}</DriveInfo>
              <DriveInfo>
                <strong>Date:</strong> {new Date(drive.startDate).toLocaleDateString()} to {new Date(drive.endDate).toLocaleDateString()}
              </DriveInfo>

              <DriveInfo><strong>Capacity Per Day:</strong> {drive.volunteerCapacity} people</DriveInfo>
              <DriveInfo><strong>Description:</strong> {drive.description}</DriveInfo>
              <ApplyButton onClick={() => handleApplyClick(drive)}>Apply as Volunteer</ApplyButton>
            </DriveCard>
          ))}
        </DriveList>
      )}
    </Container>
  );
}

export default BloodDrive;


