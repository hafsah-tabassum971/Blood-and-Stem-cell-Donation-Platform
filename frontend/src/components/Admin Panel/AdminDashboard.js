import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  FaBars,
  FaUsers,
  FaHistory,
  FaTint,
  FaHospital,
  FaTimes,
  FaChartBar,
  FaUserAlt,
  FaDna,
  FaHandsHelping,
  FaRegCalendarCheck,
} from "react-icons/fa"; // Add more icons as needed
import ManageHospitals from "./ManageHospitals";
import ViewAppointments from "./ViewAppointments";
import ViewDonors from "./ViewDonors";
import ViewVolunteers from "./ViewVolunteers";
import ViewDonations from "./ViewDonations";

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
`;

const Title = styled.h1`
  text-align: center;
  color: #b00000;
  margin-bottom: 30px;
      @media (max-width: 500px) {
font-size: 18px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
margin:auto;
  max-width: 250px;
  text-align: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardIcon = styled.div`
  font-size: 40px;
  color: #b00000;
  margin-bottom: 15px;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: #b00000;
  }
`;

const CardTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 20px;
`;

const CardValue = styled.p`
  font-size: 26px;
  font-weight: bold;
  color: #b00000;
`;

const DataDisplay = styled.div`
  font-size: 16px;
  color: #333;
`;

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("statistics"); // Set 'statistics' as the default section

  // Replace the mock dashboardData with useState
  const [dashboardData, setDashboardData] = useState({
    donors: 0,
    volunteers: 0,
    appointments: 0,
    donations: 0,
  });

  // Add this function to fetch real dashboard stats from API
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDashboardData(response.data.summary);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error.response?.data || error);
    }
  };

  // Call API on component mount
  useEffect(() => {
    fetchDashboardStats();
  }, []);


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleButtonClick = (section) => {
    setSelectedSection(section);
    setIsSidebarOpen(false); // Close sidebar when a button is clicked
  };

  // Function to render the overview cards
  const renderDashboardOverview = () => (
    <CardContainer>
      <Card>
        <CardIcon>
          <FaUserAlt />
        </CardIcon>
        <CardTitle>Donors</CardTitle>
        <CardValue>{dashboardData.donors}</CardValue>
      </Card>
      <Card>
        <CardIcon>
          <FaHandsHelping />
        </CardIcon>
        <CardTitle>Volunteers</CardTitle>
        <CardValue>{dashboardData.volunteers}</CardValue>
      </Card>
      <Card>
        <CardIcon>
          <FaRegCalendarCheck />
        </CardIcon>
        <CardTitle>Appointments</CardTitle>
        <CardValue>{dashboardData.appointments}</CardValue>
      </Card>
      <Card>
        <CardIcon>
          <FaTint />
        </CardIcon>
        <CardTitle>Donations</CardTitle>
        <CardValue>{dashboardData.donations}</CardValue>
      </Card>
    </CardContainer>
  );

  // Function to render selected section content
  const renderSectionContent = () => {
    switch (selectedSection) {
      case "manageHospitals":
        return <ManageHospitals />;
      case "viewDonors":
        return <ViewDonors />;
      case "viewVolunteers":
        return <ViewVolunteers />;
      case "viewAppointments":
        return <ViewAppointments />;
      case "viewDonations":
        return <ViewDonations />;
      // case "hlaData":
      //   return <HlaData />;
      case "statistics": // Show the overview when "Statistics" is clicked
        return renderDashboardOverview();
      default:
        return <p>Select a section to display the content.</p>;
    }
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen}>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("statistics")}
        >
          <FaChartBar style={{ marginRight: "10px" }} />
          Statistics
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("manageHospitals")}
        >
          <FaHospital style={{ marginRight: "10px" }} />
          Manage Hospitals
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("viewDonors")}
        >
          <FaUsers style={{ marginRight: "10px" }} />
          Manage Donors
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("viewVolunteers")}
        >
          <FaUsers style={{ marginRight: "10px" }} />
          Manage Volunteers
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("viewAppointments")}
        >
          <FaHistory style={{ marginRight: "10px" }} />
          View Appointments
        </Button>
        <Button
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleButtonClick("viewDonations")}
        >
          <FaTint style={{ marginRight: "10px" }} />
          View Donations
        </Button>

      </Sidebar>

      {/* Sidebar toggle icon */}
      <IconContainer onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </IconContainer>

      {/* Content */}
      <Content isSidebarOpen={isSidebarOpen}>
        <Title>Admin Dashboard</Title>
        {/* Conditionally render overview or section content */}
        <DataDisplay>{renderSectionContent()}</DataDisplay>
      </Content>
    </Container>
  );
};

export default AdminDashboard;
