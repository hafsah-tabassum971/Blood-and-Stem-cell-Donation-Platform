import React, { useState } from "react";
import styled from "styled-components";
import ManageDonors from "./ManageDonors";
import ManageVolunteers from "./ManageVolunteers";
import AppointmentHistory from "./AppointmentHistory";
import DonationsHistory from "./DonationsHistory";

import {
  FaBars,
  FaUsers,
  FaClipboardList,
  FaHistory,
  FaTint,
  // FaStethoscope,
  FaTimes,
} from "react-icons/fa";

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100%;
    margin-bottom: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "285px" : "0px")};
  padding: ${({ isSidebarOpen }) => (isSidebarOpen ? "20px" : "0px")};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  top: 0;
  left: 0;
  transition: width 0.3s ease, padding 0.3s ease, transform 0.3s ease;
  transform: ${({ isSidebarOpen }) =>
    isSidebarOpen ? "translateX(0)" : "translateX(-100%)"};
  z-index: 1000;
  // overflow: hidden;
  //   @media (max-width: 768px) {

  //   box-shadow: none;

  // }
`;

const Content = styled.div`
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "20px" : "20px")};
  margin-right:10px;

  width: calc(
    100% - ${({ isSidebarOpen }) => (isSidebarOpen ? "20px" : "40px")}
  );
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: margin-left 0.3s ease;
    @media (min-width: 768px) {
    // margin-left: 0;
  }
`;

const Button = styled.button`
  display: ${({ isSidebarOpen }) => (isSidebarOpen ? "block" : "none")};
  width: 100%;
  padding: 15px;
  background-color: #b00000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 16px;
  text-align: left;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(158, 25, 18);
  }
    
       @media (max-width: 900px) {
  font-size: 13px;
  } 
         @media (max-width: 650px) {
  font-size: 10px;
  }

           @media (max-width: 350px) {
  font-size: 8px;
  }
`;


const DataDisplay = styled.div`
  // margin-top: 10px;
  font-size: 16px;
  color: #333;
`;

const IconContainer = styled.div`
  top: 20px;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? "260px" : "20px")};
  cursor: pointer;
  font-size: 30px;
  color: #b00000;
  z-index: 1001;
  transition: left 0.3s ease;

  &:hover {
    color: #b00000;
  }
      @media (min-width: 768px) {
    // display: none;
  }
`;

const Records = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar initially closed
  const [selectedSection, setSelectedSection] = useState(""); // State to track selected section

  // Mocking current hospital data
  const currentHospital = {
    name: "Stem Cell Hospital A",
    acceptsStemCellDonations: true, // Change to false for blood-only hospitals
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to handle button click and set the selected section
  const handleButtonClick = (section) => {
    setSelectedSection(section);
    setIsSidebarOpen(false); // Close sidebar when a button is clicked
  };

  // Conditional rendering based on the selected section
  const renderSectionContent = () => {
    switch (selectedSection) {
      case "managedonors":
        return (
          <div>
            <ManageDonors />
          </div>
        );
      case "manageVolunteers":
        return (
          <div>
            <ManageVolunteers />
          </div>
        );
      case "appointmentsHistory":
        return (
          <div>
            <AppointmentHistory />
          </div>
        );
      case "donationsHistory":
        return (
          <div>
            <DonationsHistory />
          </div>
        );
      // case "HLARecords":
      //   return (
      //     <div>
      //       <HLARecords />
      //     </div>
      //   );
      default:
        // Default content when no section is selected
        return (
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ color: "#b00000", textAlign: "left" }}>
              Welcome to Hospital Records Management
            </h2>
            <p style={{ textAlign: "left", color: "#666", marginTop: "20px" }}>
              Explore the following features:
            </p>
            <ul style={{ color: "#333", marginTop: "20px", lineHeight: "1.8", listStyleType: "none" }}>
              <li>
                <FaUsers style={{ color: "#b00000", marginRight: "8px" }} />
                <strong>View Donors:</strong> Access a comprehensive list of
                registered donors and their details.
              </li>
              <li>
                <FaUsers style={{ color: "#b00000", marginRight: "8px" }} />
                <strong>View Volunteers:</strong> Manage and review volunteer
                applications and statuses.
              </li>
              <li>
                <FaHistory style={{ color: "#b00000", marginRight: "8px" }} />
                <strong>Appointments History:</strong> Track and monitor
                appointments for blood and stem cell donations.
              </li>
              <li>
                <FaTint style={{ color: "#b00000", marginRight: "8px" }} />
                <strong>Donations History:</strong> View donation records and
                performance statistics.
              </li>

            </ul>
          </div>
        );
    }
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen}>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("managedonors")}
        >
          <FaUsers style={{ marginRight: "10px" }} />
          View Donors
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("manageVolunteers")}
        >
          <FaUsers style={{ marginRight: "10px" }} />
          View Volunteers
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("appointmentsHistory")}
        >
          <FaHistory style={{ marginRight: "10px" }} />
          Appointments History
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("donationsHistory")}
        >
          <FaTint style={{ marginRight: "10px" }} />{" "}
          {/* Updated blood donation icon */}
          Donations History
        </Button>

      </Sidebar>

      {/* Sidebar toggle icon */}
      <IconContainer onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </IconContainer>

      {/* Content */}
      <Content isSidebarOpen={isSidebarOpen}>
        {/* <Title>Section Content</Title> */}
        <DataDisplay>
          {renderSectionContent()}{" "}
          {/* Display the content based on selected section */}
        </DataDisplay>
      </Content>
    </Container>
  );
};

export default Records;
