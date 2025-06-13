import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #b00000;
  @media (max-width: 700px) {
    font-size: 18px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-right: 20px;
  margin-top: 30px;
  @media (max-width: 768px) {
    padding: 15px;
    box-sizing: border-box;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  resize: none;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #b00000;
  color: white;
  // width:100%;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: rgb(158, 25, 18);
  }

  @media (max-width: 400px) {
    font-size: 13px;
  }
`;

const SuccessMessage = styled.div`
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  margin-top: 15px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding: 15px;
  background-color: #eae1e1;
  color: #b00000;
  border: 1px solidrgb(168, 108, 102);
  border-radius: 5px;
  margin-top: 15px;
  text-align: center;
`;


function VolunteerApplication() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const driveId = params.get("driveId");
  const startDate = new Date(params.get("startDate"));
  const endDate = new Date(params.get("endDate"));
  //Added
  const availableDates = JSON.parse(params.get("availableDates") || "[]");


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    availability: "",
    message: "",
    role: "",
    experience: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/apply-as-volunteer`,
        {
          reasonForApplying: formData.message,
          experience: formData.experience,
          volunteerRole: formData.role,
          availability: formData.availability,
          driveId: driveId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Volunteer Application Submitted:", response.data);
      // setSuccess(true);
      setSuccessMessage("Thank you for applying to be a volunteer! We will get back to you shortly.");

      // setTimeout(() => setSuccess(false), 5000);
      setFormData({
        availability: "",
        message: "",
        role: "",
        experience: "",
      });
      setTimeout(() => setSuccessMessage(""), 5000);

    } catch (error) {
      const errMsg = error.response?.data?.message || "An error occurred. Please try again.";

      if (errMsg.includes("already applied")) {
        setErrorMessage("You've already applied for this blood drive.");
      } else if (errMsg.includes("capacity full")) {
        setErrorMessage("Sorry, the volunteer capacity for this blood drive is full.");
      } else {
        setErrorMessage(errMsg);
      }

      setTimeout(() => setErrorMessage(""), 5000);
    }
  };



  return (
    <Container>
      <Title>Volunteer Application</Title>

      <p>
        Join our volunteer program and help make a difference in your community.
        Fill out the form below to apply, and we'll get back to you shortly!
      </p>

      <Form onSubmit={handleSubmit}>

        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select id="availability" name="availability" value={formData.availability} onChange={handleChange} required>

            {/* Added */}
            <option value="">Select your availability</option>
            {availableDates.map((date, idx) => (
              <option key={idx} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select the role you're applying for
            </option>
            <option value="Coordinator">Coordinator</option>
            <option value="Blood Collection Staff">Blood Collection Staff</option>
            <option value="Donor Assistance">Donor Assistance</option>
            <option value="Logistics Support">Logistics Support</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="experience">Experience in any Blood Drive</Label>
          <TextArea
            id="experience"
            name="experience"
            rows="5"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Describe your previous experience in blood drives (if any)"
          />
        </div>

        <div>
          <Label htmlFor="message">Why do you want to volunteer?</Label>
          <TextArea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us why you'd like to volunteer"
          />
        </div>

        <SubmitButton type="submit">Submit Application</SubmitButton>
      </Form>


      {errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}

      {successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}
    </Container>
  );
}

export default VolunteerApplication;




