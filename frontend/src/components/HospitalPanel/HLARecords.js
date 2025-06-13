import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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



// Main Component
const HLARecords = () => {
  const [hlaRecords, setHLARecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch HLA records from API
  useEffect(() => {
    const fetchHLARecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/HLA-records`, {
          withCredentials: true, // Ensures authentication
        });
        setHLARecords(response.data.data); // Extracting the 'data' array from API response
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch HLA records');
      }
      setLoading(false);
    };

    fetchHLARecords();
  }, []);

  // Handle filter input change
  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter records based on search term
  const filteredHLARecords = hlaRecords.filter((record) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.donorName.toLowerCase().includes(searchLower) ||
      record.testDate.toLowerCase().includes(searchLower) ||
      record.patientName.toLowerCase().includes(searchLower) ||
      record.hlaMatchStatus.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      {/* Filter Section */}
      <FilterContainer>
        <label>Search: </label>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleFilterChange}
          placeholder="Filter here..."
        />
      </FilterContainer>

      {/* Display loading, error, or table */}
      {loading ? (
        <p>Loading HLA records...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Donor Name</TableHeader>
              <TableHeader>Test Date</TableHeader>
              <TableHeader>Patient Name</TableHeader>
              <TableHeader>HLA Match Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredHLARecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell data-label="Donor Name">{record.donorName}</TableCell>
                <TableCell data-label="Test Date">{record.testDate}</TableCell>
                <TableCell data-label="Patient Name">{record.patientName}</TableCell>
                <TableCell data-label="HLA Match Status">{record.hlaMatchStatus}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HLARecords;