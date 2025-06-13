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



const DonationsHistory = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API call to fetch donations
  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/donations`, {
          withCredentials: true,
        });
        setDonations(response.data.donations);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch donations');
      }
      setLoading(false);
    };
    fetchDonations();
  }, []);

  // Filter donations based on search term
  const filteredDonations = donations
    .filter((donation) => donation.status !== 'Cancelled')
    .filter((donation) => {
      // Convert the search term to lowercase for case-insensitive matching
      const searchLower = searchTerm.toLowerCase();
      return (
        donation.donor?.name?.toLowerCase().includes(searchLower) ||
        donation.hospitalName.toLowerCase().includes(searchLower) ||
        donation.donationType.toLowerCase().includes(searchLower) ||
        (donation.phase ? donation.phase.toLowerCase().includes(searchLower) : false) ||
        (donation.phase === 'HLA Testing' && donation.hlaMatchStatus
          ? donation.hlaMatchStatus.toLowerCase().includes(searchLower)
          : false)
      );
    });

  return (
    <div>
      {/* Search Filter */}
      <FilterContainer>
        <div>
          <label>Search: </label>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter donations..."
          />
        </div>
      </FilterContainer>

      {/* Table */}
      {loading ? (
        <p>Loading donations...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Donor Name</TableHeader>
              <TableHeader>Hospital Name</TableHeader>
              <TableHeader>Donation Status</TableHeader>
              <TableHeader>Donation Type</TableHeader>
              <TableHeader>Phase</TableHeader>
              <TableHeader>HLA Match Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation._id}>
                {/* <TableCell data-label="Donor Name">{donation.donor.name}</TableCell> */}
                <TableCell data-label="Donor Name">{donation.donor?.name || "Donor Deleted"}</TableCell>
                <TableCell data-label="Hospital Name">{donation.hospitalName}</TableCell>
                <TableCell data-label="Status">{donation.status}</TableCell>
                <TableCell data-label="Donation Type">{donation.donationType}</TableCell>
                <TableCell data-label="Phase">{donation.donationType === 'Stem Cell' ? donation.phase || 'N/A' : 'N/A'}</TableCell>
                <TableCell data-label="HLA Match Status">
                  {donation.phase === 'HLA Testing' ? donation.hlaMatchStatus || 'Pending' : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DonationsHistory;










