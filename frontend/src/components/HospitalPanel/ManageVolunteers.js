import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/hospital-volunteers`, {
          withCredentials: true,
        });
        setVolunteers(data.volunteers);
      } catch (error) {
        console.error('Error fetching volunteers:', error.response?.data?.message || error.message);
      }
      setLoading(false);

    };

    fetchVolunteers();
  }, []);


  const filteredVolunteers = volunteers.filter((volunteer) =>
    // Check if any of the specified fields contain the filter text (case-insensitive)
    ['name', 'email', 'contactNumber', 'availability', 'volunteerRole', 'experience'].some((key) =>
      // Convert the value to string (to handle numbers or other types), then to lowercase for comparison
      volunteer[key]?.toString().toLowerCase().includes(filter.toLowerCase())
    )
    // Also check if the volunteer's 'isVolunteer' status matches the filter text ('Yes' or 'No')
    || (volunteer.isVolunteer ? 'Yes' : 'No').toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div>
      <FilterContainer>
        <div>
          <label>Search: </label>
          <Input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter here..."
          />
        </div>
      </FilterContainer>
      {loading ? (
        <p>Loading volunteers...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Contact No</TableHeader>
              <TableHeader>Availability</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Experience</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.map((volunteer) => (
              <TableRow key={volunteer._id}>
                <TableCell data-label="Name">{volunteer.name}</TableCell>
                <TableCell data-label="Email">{volunteer.email}</TableCell>
                <TableCell data-label="Contact No">{volunteer.contactNumber || "N/A"}</TableCell>
                <TableCell data-label="Availability">
                  {new Date(volunteer.availability).toISOString().split('T')[0].split('-').reverse().join('-')}
                </TableCell>
                <TableCell data-label="Role">{volunteer.volunteerRole}</TableCell>
                <TableCell data-label="Experience">{volunteer.experience}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageVolunteers;

