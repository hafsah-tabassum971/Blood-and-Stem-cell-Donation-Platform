import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  font-family: "Arial", sans-serif;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    margin: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #b00000;
  font-size: 32px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 10px 0 5px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 14px 20px;
  border-radius: 30px;
  background-color: #b00000;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(158, 25, 18);
  }
`;

const Message = styled.div`
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  color: ${({ error }) => (error ? "#b00000" : "green")};
  background-color: ${({ error }) => (error ? "#ffe5e5" : "#e5ffe5")};
`;

const CreateDrive = () => {
  const [driveDetails, setDriveDetails] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    capacity: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
    const location = useLocation();
  

        useEffect(() => {
        window.scrollTo(0, 0);
      }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriveDetails({ ...driveDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/create-blood-drive`,
        {
          driveName: driveDetails.name,
          location: driveDetails.location,
          startDate: driveDetails.startDate,
          endDate: driveDetails.endDate,
          description: driveDetails.description,
          volunteerCapacity: driveDetails.capacity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        setDriveDetails({
          name: "",
          location: "",
          startDate: "",
          endDate: "",
          capacity: "",
          description: "",
        });
      }
    } catch (error) {
      setError(true);
      setMessage(error.response?.data?.message || "Failed to create blood drive");
    }
  };

  return (
    <Container>
      <Title>Create Blood Donation Drive</Title>
      {/* {message && <Message error={error}>{message}</Message>} */}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Drive Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Enter drive name"
          value={driveDetails.name}
          onChange={handleChange}
          required
        />

        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          type="text"
          name="location"
          placeholder="Enter location"
          value={driveDetails.location}
          onChange={handleChange}
          required
        />

        <Label htmlFor="startDate">Starting Date</Label>
        <Input
          id="startDate"
          type="date"
          name="startDate"
          value={driveDetails.startDate}
          onChange={handleChange}
          required
        />

        <Label htmlFor="endDate">Ending Date</Label>
        <Input
          id="endDate"
          type="date"
          name="endDate"
          value={driveDetails.endDate}
          onChange={handleChange}
          required
        />

        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          type="number"
          name="capacity"
          placeholder="Enter capacity required for each day"
          value={driveDetails.capacity}
          onChange={handleChange}
          required
        />

        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          placeholder="Enter drive description"
          value={driveDetails.description}
          onChange={handleChange}
          required
        />

        <Button type="submit">Create Drive</Button>
      </Form>
      {message && <Message error={error}>{message}</Message>}

    </Container>
  );
};

export default CreateDrive;
