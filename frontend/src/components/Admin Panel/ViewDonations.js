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
    @media (max-width: 768px) {
    display: none;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
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

const ViewDonations = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-donations-admin`, {
          withCredentials: true, // If authentication is required
        });
        setDonations(data.donations);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
      setLoading(false);

    };

    fetchDonations();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDonations = donations.filter((donation) => {
    const searchLower = searchTerm.toLowerCase();
    // return (
    //   donation.donor?.name?.toLowerCase().includes(searchLower) ||
    //   donation.hospitalName.toLowerCase().includes(searchLower) ||
    //   donation.donationType.toLowerCase().includes(searchLower) ||
    //   (donation.phase && donation.phase.toLowerCase().includes(searchLower)) ||
    //   donation.hlaMatchStatus.toLowerCase().includes(searchLower) ||
    //   (donation.hlaMatchInfo?.patientDetails?.patientName &&
    //     donation.hlaMatchInfo.patientDetails.patientName.toLowerCase().includes(searchLower))
    // );
    return (
      (donation.donor?.name?.toLowerCase() || '').includes(searchLower) ||
      (donation.hospitalName?.toLowerCase() || '').includes(searchLower) ||
      (donation.donationType?.toLowerCase() || '').includes(searchLower) ||
      (donation.phase?.toLowerCase() || '').includes(searchLower) ||
      (donation.hlaMatchStatus?.toLowerCase() || '').includes(searchLower) ||
      (donation.hlaMatchInfo?.patientDetails?.patientName?.toLowerCase() || '').includes(searchLower)
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
        <p>Loading donations...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Donor Name</TableHeader>
              <TableHeader>Hospital Name</TableHeader>
              <TableHeader>Donation Type</TableHeader>
              <TableHeader>Phase</TableHeader>
              <TableHeader>HLA Match Status</TableHeader>
              <TableHeader>Patient Name</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation._id}>
                <TableCell data-label="Donor Name">{donation.donor?.name || 'N/A'}</TableCell>
                <TableCell data-label="Hospital Name">{donation.hospitalName || 'N/A'}</TableCell>
                <TableCell data-label="Donation Type">{donation.donationType || 'N/A'}</TableCell>
                <TableCell data-label="Phase">{donation.phase || 'N/A'}</TableCell>
                <TableCell data-label="HLA Match Status">{donation.hlaMatchStatus || 'N/A'}</TableCell>
                <TableCell data-label="Patient Name">{donation.hlaMatchInfo?.patientDetails?.patientName || 'N/A'}</TableCell>

              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

    </div>
  );
};

export default ViewDonations;




