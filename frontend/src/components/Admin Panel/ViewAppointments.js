import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  @media (max-width: 768px) {
    display: grid;
    border: 0;
  }
`;

const TableHeader = styled.th`
  background-color: #b00000;
  color: white;
  padding: 10px;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
    @media (max-width: 768px) {
    display: block;
    text-align: left;
    padding-left: 50%;
    position: relative;
    border: none;

    &:before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      top: 10px;
      font-weight: bold;
      color: #333;
    }
  }

  @media (max-width: 450px) {
    font-size: 11px;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f4f4f4;
  }
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/get-all-appointments-admin`,
          { withCredentials: true }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
      setLoading(false);

    };

    fetchAppointments();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (appointment.donor?.name?.toLowerCase() || '').includes(searchLower) ||
      (appointment.hospital?.user?.name?.toLowerCase() || '').includes(searchLower) ||
      (appointment.status?.toLowerCase() || '').includes(searchLower) ||
      (appointment.donationType?.toLowerCase() || '').includes(searchLower)
    );
  });


  return (
    <div>
      <FilterContainer>
        <div>
          <label>Search: </label>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Filter here..."
          />
        </div>
      </FilterContainer>
      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Donor Name</TableHeader>
              <TableHeader>Hospital</TableHeader>
              <TableHeader>Appointment Date</TableHeader>
              <TableHeader>Appointment Time</TableHeader>
              <TableHeader>Appointment Type</TableHeader>
              <TableHeader>Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell data-label="Donor Name">
                  {appointment.donor ? appointment.donor.name : "N/A"}
                </TableCell>
                <TableCell data-label="Hospital">
                  {appointment.hospital && appointment.hospital.user ? appointment.hospital.user.name : "N/A"}
                </TableCell>
                <TableCell data-label="Appointment Date">
                  {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell data-label="Appointment Time">{appointment.appointmentTime}</TableCell>
                <TableCell data-label="Reason">{appointment.donationType}</TableCell>
                <TableCell data-label="Status">{appointment.status}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

    </div>
  );
};

export default ViewAppointments;