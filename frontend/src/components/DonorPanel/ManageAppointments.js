import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 100px;
`;

const Title = styled.h2`
  text-align: left;
  color: #b00000;
  margin-bottom: 40px;
`;

const MessageBox = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  color: ${({ type }) => (type === "success" ? "green" : "red")};
  background-color: ${({ type }) => (type === "success" ? "#d4edda" : "#f8d7da")};
  border: 1px solid ${({ type }) => (type === "success" ? "#c3e6cb" : "#f5c6cb")};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  background-color: #b00000;
  color: white;

  &:hover {
    background-color: rgb(158, 25, 18);
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

// Define the Loader component
const Loader = styled.div`
  // border: 4px solid #f3f3f3; /* Light gray */
  // border-top: 4px solid #b00000; /* Red color */
  // border-radius: 50%;
  // width: 50px;
  // height: 50px;
  // animation: spin 2s linear infinite;
  margin: 0 auto;
  
  // @keyframes spin {
  //   0% { transform: rotate(0deg); }
  //   100% { transform: rotate(360deg); }
  // }
`;


const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [isRescheduleEnabled, setIsRescheduleEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments.some(app => app.status === "Cancelled")) {
      setIsRescheduleEnabled(true);
    }
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/donor-appointments`, { withCredentials: true });

      const sortedAppointments = response.data.appointments.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

      // setAppointments(response.data.appointments);
      setAppointments(sortedAppointments);

    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoading(false);  // Set loading to false after the request is completed

  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/appointment/cancel-appointment/${appointmentId}`,
        {},
        { withCredentials: true }
      );
      setMessage({ type: "success", text: response.data.message + " The slot is now free." });

      // Update the state of appointments to reflect a cancelled appointment
      setAppointments(prevAppointments =>
        // Map over the previous appointments list
        prevAppointments.map(appointment =>
          // If the appointment ID matches the one being cancelled
          appointment._id === appointmentId
            // Return a new appointment object with updated status
            ? { ...appointment, status: "Cancelled" }
            // Otherwise, return the original appointment unchanged
            : appointment
        )
      );

    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Error canceling appointment" });
    }
  };


  const handleRescheduleClick = (appointment) => {
    if (isRescheduleEnabled) {
      const targetRoute =
        appointment.donationType === "Stem Cell Donation"
          ? "/stemcellappointment"
          : "/appointmentpage";

      navigate(targetRoute, { state: { rescheduleData: appointment } });
    }
  };

  // Helper function to check if an appointment date is in the past
  const isPastAppointment = (appointmentDate) => {
    // Get the current date and set the time to midnight (00:00:00)
    // This ensures we're comparing only the date part, not the time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convert the appointment date string to a Date object
    const appDate = new Date(appointmentDate);

    // Return true if the appointment date is before today (i.e., it's a past date)
    return appDate < today;
  };


  return (
    <Container>
      <Title>Scheduled Appointments</Title>
      {message && <MessageBox type={message.type}>{message.text}</MessageBox>}
      {/* Display loader when appointments are loading */}
      {loading ? (
        <Loader>
          Loading appointments...
        </Loader> // Loader component
      ) : appointments.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Hospital</Th>
              <Th>Address</Th>
              <Th>Type</Th>
              <Th>Cancel</Th>
              <Th>Reschedule</Th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <Td>{new Date(appointment.appointmentDate).toLocaleDateString()}</Td>
                <Td>{appointment.hospital?.user?.name || "N/A"}</Td>
                <Td>{appointment.hospital?.user?.address || "N/A"}</Td>
                <Td>{appointment.donationType}</Td>
             
                <Td>
                  {appointment.status === "Cancelled" ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>Cancelled</span>
                  ) : (
                    <Button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      disabled={isPastAppointment(appointment.appointmentDate)}
                    >
                      Cancel
                    </Button>
                  )}
                </Td>
                <Td>
                  <Button
                    onClick={() => handleRescheduleClick(appointment)}
                    disabled={
                      appointment.status !== "Cancelled" || isPastAppointment(appointment.appointmentDate)
                    }
                  >
                    Reschedule
                  </Button>
                </Td>

              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No appointments found.</p>
      )}
    </Container>
  );
};

export default ManageAppointments;