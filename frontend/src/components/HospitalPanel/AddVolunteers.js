import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const Container = styled.div`
  padding: 20px;
  margin: auto;
  font-family: Arial, sans-serif;
  border-radius: 15px;
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: left;
  margin-bottom: 20px;
  color: #b00000;

    @media (max-width: 680px) {
    font-size: 20px;
  }
`;

const Table = styled.div`
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  
  @media (max-width: 768px) {
    display: block;
    padding: 10px;
  }
`;

const MainRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f9f9f9;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    display: block;
    font-size: 14px;
  }

  @media (max-width: 630px) {
    font-size: 12px;
  }
`;

const Cell = styled.div`
  flex: 1;
  padding: 5px 10px;
  font-weight: ${(props) => (props.isHeader ? "bold" : "normal")};
  color: ${(props) => (props.isHeader ? "white" : "black")};

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    font-size: 14px;
    padding: 5px 0;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b00000;
  padding: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownContent = styled.div`
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-top: 1px solid #ddd;
  p{
  margin-bottom: 10px;}
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  &.accept {
    background-color: #28a745;
    color: white;
    margin-right: 5px;
  }

  &.reject {
    background-color: #b00000;
    color: white;
  }

  &:hover {
    transform: scale(1.005);
    opacity: 0.9;
  }
  
    @media (max-width: 1000px) {
    margin-top: 5px;
  }
  @media (max-width: 600px) {
    width: 98%;
    margin-top: 5px;
  }
`;

const Chevron = styled.div`
  margin-left: 10px;
    margin-right: 10px;
  transform: ${(props) => (props.isExpanded ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  font-size: 16px;
`;

const Label = styled.span`
  font-weight: bold;
  display: none;
  
  @media (max-width: 768px) {
    display: inline;
  }
`;


const AddVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    fetchVolunteers();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fetchVolunteers = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-volunteer-applications`, {
        withCredentials: true, // Include cookies if using authentication
      });

      if (response.data.success) {
        const formattedVolunteers = response.data.applications.map((app) => ({
          id: app.application._id,
          fullName: app.userName,
          email: app.userEmail,
          contactNumber: app.userContactNumber || "N/A",
          availability: app.application.availability || "Not provided",
          role: app.application.volunteerRole || "Not specified",
          experience: app.application.experience || "No details",
          whyJoin: app.application.reasonForApplying || "Not specified",
          status: app.application.status,
          isExpanded: false,
        }));

        setVolunteers(formattedVolunteers);
      }
    } catch (error) {
      console.error("Error fetching volunteer applications:", error);
    }
    setLoading(false);

  };

    // Toggle expanded/collapsed view of volunteer details by toggling isExpanded flag
  const toggleExpand = (id) => {
    setVolunteers(
      volunteers.map((volunteer) =>
        volunteer.id === id
          ? { ...volunteer, isExpanded: !volunteer.isExpanded }
          : volunteer
      )
    );
  };

  const acceptApplication = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/volunteers/${id}/accept`, {}, { withCredentials: true });

      if (response.data.success) {
        setVolunteers(
          volunteers.map((volunteer) =>
            volunteer.id === id ? { ...volunteer, status: "Accepted" } : volunteer
          )
        );
      }
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const rejectApplication = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/volunteers/${id}/reject`, {}, { withCredentials: true });

      if (response.data.success) {
        setVolunteers(
          volunteers.map((volunteer) =>
            volunteer.id === id ? { ...volunteer, status: "Rejected" } : volunteer
          )
        );
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <Container>
      <Title>Manage Volunteer Applications</Title>
      <p style={{ marginBottom: 30 }}>Here, you can view and manage the volunteer applications for upcoming blood donation events.</p>
      {loading ? (
        <p>Loading volunteers...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table>
          <HeaderRow>
            <Cell isHeader>Full Name</Cell>
            <Cell isHeader>Email</Cell>
            <Cell isHeader>Contact Number</Cell>
            <Cell isHeader>Status</Cell>
            <Cell isHeader>Actions</Cell>
          </HeaderRow>

          {volunteers.map((volunteer) => (
            <TableRow key={volunteer.id}>
              <MainRow onClick={() => toggleExpand(volunteer.id)}>
                <Cell><Label>Full Name: </Label>{volunteer.fullName}</Cell>
                <Cell><Label>Email: </Label>{volunteer.email}</Cell>
                <Cell><Label>Contact Number: </Label>{volunteer.contactNumber}</Cell>
                <Cell><Label>Status: </Label>{volunteer.status}</Cell>
                <Cell>
                  <Label>Actions: </Label>
                  {volunteer.status === "pending" && (
                    <>
                      <ActionButton
                        className="accept"
                        onClick={(e) => {
                          e.stopPropagation();
                          acceptApplication(volunteer.id);
                        }}
                      >
                        Accept
                      </ActionButton>
                      <ActionButton
                        className="reject"
                        onClick={(e) => {
                          e.stopPropagation();
                          rejectApplication(volunteer.id);
                        }}
                      >
                        Reject
                      </ActionButton>
                    </>
                  )}
                </Cell>
                <Chevron isExpanded={volunteer.isExpanded}>▼</Chevron>
              </MainRow>
              {volunteer.isExpanded && (
                <DropdownContent>
                  <p><strong>Availability:</strong> {volunteer.availability}</p>
                  <p><strong>Role:</strong> {volunteer.role}</p>
                  <p><strong>Experience:</strong> {volunteer.experience}</p>
                  <p><strong>Why You Want to Join:</strong> {volunteer.whyJoin}</p>
                </DropdownContent>
              )}
            </TableRow>
          ))}
        </Table>
      )}

    </Container>
  );
};

export default AddVolunteers;
