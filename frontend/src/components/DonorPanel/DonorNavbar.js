// import React, { useState } from 'react';
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";



// Navbar container
const Navbar = styled.nav`
  padding-top: 0px;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ececec;
  height:60px;
   @media (max-width: 768px) {
    justify-content: space-between;
    // width:100%;
  }
`;

// Logo section (left-aligned)
const Logo = styled.div`
  width: 300px; /* Adjust the width of the logo */
  height: 100%; /* Make sure the logo's height matches the navbar height */
  display: flex;
  // align-items: center; /* Center the logo vertically */
  img {
    width: 300px;
    height: 100%; /* Ensures the image fits inside the container */
    object-fit: cover; /* Prevents image distortion */
    display: block; /* Removes extra space below the image */
  }

   @media (max-width: 768px) {
    width: 250px; /* Reduce the width of the logo for small screens */

    img {
      width: 250px; /* Adjust the image width accordingly */
    }
  }
     @media (max-width: 1155px) {
    width: 180px; /* Reduce the width of the logo for small screens */

    img {
      width: 180px; /* Adjust the image width accordingly */
    }
  }

`;

// Navbar links container (right-aligned)
const NavbarLinks = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
  color: black;
  gap: 15px;
  align-items: center;

    @media (max-width: 768px) {
    display: none;
  }
         @media (max-width: 1030px) {
text-size-adjust: auto;  }
`;

// Individual link
const NavbarLink = styled.li`
  margin: 0;
  position: relative;
`;

// Styled Link component
const StyledLink = styled(Link)`
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  height: 30px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: ${(props) => (props.active ? "white" : "#333")};
  background-color: ${(props) => (props.active ? "#b00000" : "transparent")};
  text-decoration: none;

  &:hover {
    background-color: #b00000;
    color: white;
  }

`;

// "Book Now" button styling
const Button = styled(Link)`
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 10px;
  border: 1px solid #b00000; /* Adds the red outline */
  background-color: #b00000;
  height: 25px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(158, 25, 18);
    // transform: translateY(-3px);
    border: 2px solid #b00000; /* Adds the red outline */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    background-color: rgb(158, 25, 18);
  }
 @media (min-width: 500px) and (max-width: 768px) {
    display: none;
  }

 @media (max-width: 850px) {
  font-size: 11px;

  }


`;

const ButtonLogout = styled(Link)`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #b00000; /* Adds the red outline */
  background-color: transparent; /* Transparent background */
  color: #b00000; /* Red text color */
  font-size: 16px;
  height: 25px;

  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: white; 
    border: 2px solid #b00000; /* Adds the red outline */
    color: #b00000; /* Ensures text stays red on hover */
    // box-shadow: 0 0 10px rgba(176, 0, 0, 0.2); /* Subtle glow effect */
  }

  &:active {
    transform: scale(0.95); /* Slight press effect */
  }
     @media (max-width: 850px) {
  font-size: 11px;

  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  padding: 10px 0;
  width: 200px;
  display: ${({ open }) => (open ? "block" : "none")};
  transition: all 0.3s ease-in-out;
  z-index: 100;
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  &:hover {
    background-color: #b00000;
    color: white;
  }
`;


const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
`;

const SidebarLink = styled(Link)`
  padding: 15px;
  text-decoration: none;
  color: #333;
  font-size: 18px;
  display: block;
  &:hover {
    background-color: #b00000;
    color: white;
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ButtonSmallScreen = styled(Link)`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #b00000;
  background-color: #b00000;
  height: 25px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(158, 25, 18);
    border: 2px solid #b00000;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    background-color: rgb(158, 25, 18);
  }

      @media (max-width: 768px ) {
      position: relative;
      left:120px;
  }
            @media (max-width: 625px ) {
      position: relative;
      left:40px;
  }

         @media (max-width: 500px) {
    display: none;

  }


  @media (min-width: 769px) {
    display: none;
  }
`;

const handleLogout = async () => {
  try {
    console.log("Logging out...");  // Check if function is executing

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/logout`, {
      withCredentials: true,
    });

    console.log("API Response:", response.data); // Check API response

    // Remove Authentication data 
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    console.log("Local storage cleared"); // Check localStorage clearing

    // Redirect user to login page 
    //setTimeout(() => {
    window.location.href = "/login";
    //}, 1000); // Delayed redirect to see console logs
  } catch (error) {
    console.error("Logout failed:", error.response?.data?.message || error.message);
  }
};



const DonorNavbar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const handleSidebarItemClick = () => {
    setSidebarOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <Navbar>
        {/* Logo aligned to the left */}
        <Logo>
          <a href="/">
            <img src="/images/logo12.png" alt="Donation Logo" />
          </a>
        </Logo>

        {/* Book Now button for small screens (next to the hamburger icon) */}
        <ButtonSmallScreen to="/appointmentpage">Book Now</ButtonSmallScreen>

        <MenuIcon onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </MenuIcon>


        {/* Links and "Book Now" button aligned to the right */}
        <NavbarLinks>
          <NavbarLink>
            <StyledLink to="/donorhome">Home</StyledLink>
          </NavbarLink>
          <NavbarLink>
            <StyledLink to="/donorprofile">Profile</StyledLink>
          </NavbarLink>

          <DropdownContainer ref={dropdownRef}>
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              Appointments <FaChevronDown />
            </DropdownButton>
            <Dropdown open={dropdownOpen}>
              <li>
                <DropdownLink to="/appointmentpage" onClick={() => setDropdownOpen(false)}>
                  Blood/HLA Appointment
                </DropdownLink>
              </li>
              {/* <li>
            <DropdownLink to="/stemcellappointment" onClick={() => setDropdownOpen(false)}>
              Stem cell Appointment
            </DropdownLink>
          </li> */}
              <li>
                <DropdownLink to="/viewhlastatus" onClick={() => setDropdownOpen(false)}>
                  Stem cell Appointment
                </DropdownLink>
              </li>

              <li>
                <DropdownLink to="/manageappointments" onClick={() => setDropdownOpen(false)}>
                  Manage Appointments
                </DropdownLink>
              </li>
              <li>
                <DropdownLink to="/viewhlastatus" onClick={() => setDropdownOpen(false)}>
                  HLA Status
                </DropdownLink>
              </li>
            </Dropdown>
          </DropdownContainer>

          <NavbarLink>
            <StyledLink to="/blooddrive">Volunteering</StyledLink>
          </NavbarLink>

          <li><ButtonLogout onClick={handleLogout}>Log out</ButtonLogout></li>


          {/* "Book Now" button */}
          <Button to="/appointmentpage">Book Now</Button>
        </NavbarLinks>
      </Navbar>

      <Sidebar isOpen={sidebarOpen}>
        <Button to="/appointmentpage" onClick={handleSidebarItemClick}>Book Now</Button>
        <SidebarLink to="/donorhome" onClick={handleSidebarItemClick}>Home</SidebarLink>
        <SidebarLink to="/donorprofile" onClick={handleSidebarItemClick}>Profile</SidebarLink>
        <SidebarLink to="/appointmentpage" onClick={handleSidebarItemClick}>Blood/HLA Appointment</SidebarLink>
        <SidebarLink to="/viewhlastatus" onClick={handleSidebarItemClick}>Stemcell Appointment</SidebarLink>
        <SidebarLink to="/manageappointments" onClick={handleSidebarItemClick}>Manage Appointments</SidebarLink>
        <SidebarLink to="/viewhlastatus" onClick={handleSidebarItemClick}>HLA Status</SidebarLink>
        <SidebarLink to="/blooddrive" onClick={handleSidebarItemClick}>Volunteering</SidebarLink>
        <SidebarLink onClick={() => { handleSidebarItemClick(); handleLogout(); }}>Log out</SidebarLink>


      </Sidebar>
    </>
  );
};

export default DonorNavbar;

