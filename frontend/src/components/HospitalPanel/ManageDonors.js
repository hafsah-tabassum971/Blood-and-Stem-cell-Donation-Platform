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

const ManageDonors = () => {
  const [donors, setDonors] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/hospital-donors`, {
          withCredentials: true,
        });
        setDonors(response.data.donors);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
      setLoading(false);

    };
    fetchDonors();
  }, []);

const filteredDonors = donors.filter((donor) =>
  // Check if any of the specified fields contain the filter text (case-insensitive)
  ['name', 'gender', 'dateOfBirth', 'email', 'contactNumber', 'address'].some((key) =>
    // Optional chaining in case the key doesn't exist, then convert to lowercase and check inclusion
    donor[key]?.toLowerCase().includes(filter.toLowerCase())
  )
  // Also check if the donor's volunteer status matches the filter text (Yes/No)
  || (donor.isVolunteer ? 'Yes' : 'No').toLowerCase().includes(filter.toLowerCase())
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
        <p>Loading donors...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Gender</TableHeader>
              <TableHeader>DOB</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Contact Number</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Volunteer Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor) => (
              <TableRow key={donor._id}>
                <TableCell data-label="Name">{donor.name}</TableCell>
                <TableCell data-label="Gender">{donor.gender}</TableCell>
                <TableCell data-label="DOB">{donor.dateOfBirth || 'N/A'}</TableCell>
                <TableCell data-label="Email">{donor.email}</TableCell>
                <TableCell data-label="Contact Number">{donor.contactNumber || 'N/A'}</TableCell>
                <TableCell data-label="Address">{donor.address}</TableCell>
                <TableCell data-label="Volunteer Status">
                  {donor.isVolunteer ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageDonors;

