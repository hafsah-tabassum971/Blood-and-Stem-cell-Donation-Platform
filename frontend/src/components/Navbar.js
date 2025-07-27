import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"; // Importing Font Awesome icons

// Styled Components

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  height: 80px;

  @media (max-width: 768px) {
    justify-content: space-between;
    // width:100%;
  }
`;

const Logo = styled.div`
  width: 300px;
  height: 100%;
  display: flex;

  img {
    width: 300px;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    width: 180px; /* Reduce the width of the logo for small screens */

    img {
      width: 180px; /* Adjust the image width accordingly */
    }
  }
  @media (max-width: 900px) {
    width: 150px; /* Reduce the width of the logo for small screens */

    img {
      width: 150px; /* Adjust the image width accordingly */
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 15px;
  font-size: 15px;
  color: #333;
`;

const MenuItem = styled.div`
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};
  padding: 10px 0;
  width: 180px;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #b00000;
    color: white;
  }
`;
const DropdownMenuLogin = styled.div`
  position: absolute;
  top: 50px;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};
  padding: 10px 0;
  width: 155px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #b00000;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
  width: 200px; /* Set a default width */

  &:focus {
    border-color: rgb(158, 25, 18);
  }

  @media (max-width: 1024px) {
    width: 100px; /* Reduce width for small screens */
  }

  @media (max-width: 800px) {
    width: 150px; /* Reduce width for small screens */
  }
  @media (max-width: 400px) {
    width: 100px; /* Reduce width for small screens */
  }
`;

const Button = styled.button`
  padding: 0 18px;
  border-radius: 10px;
  background-color: white;
  height: 45px;
  border: 1px solid #b00000;
  color: #b00000;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: 2px solid #b00000;
    color: #b00000;
  }

  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 1024px) {
    width: 100px;
  }
`;

const ButtonBooknow = styled(Link)`
  padding: 10px 20px;
  margin-right: 10px;
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
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 999;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

const SidebarMenuItem = styled(Link)`
  padding: 15px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #b00000;
    color: white;
  }
`;


const HamburgerIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    margin-left: 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b00000;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(158, 25, 18);
  }
`;

const MobileSearchContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    // margin-right: 10px;
    margin-left: 30px;
  }
`;

// Main Navbar component
function Navbar() {
  // State management for dropdowns, sidebar, search, and active menu item
  const [activeItem, setActiveItem] = useState(null);
  const [showDonateDropdown, setShowDonateDropdown] = useState(false);
  const [showEducationDropdown, setShowEducationDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Refs to detect clicks outside dropdowns
  const donateDropdownRef = useRef(null);
  const educationDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {

    // Check if the clicked target is outside the Donate dropdown menu
    // If so, close the Donate dropdown by setting its visibility state to false
    if (

      //This checks if the reference to the donate dropdown element actually exists in the page.
      //If it doesn't exist (like if the dropdown isn't rendered yet), then this is false and the code inside the if won't run.
      donateDropdownRef.current &&
      !donateDropdownRef.current.contains(event.target)
    ) {
      setShowDonateDropdown(false);
    }

    if (
      donateDropdownRef.current &&
      !donateDropdownRef.current.contains(event.target)
    ) {
      setShowDonateDropdown(false);
    }
    if (
      educationDropdownRef.current &&
      !educationDropdownRef.current.contains(event.target)
    ) {
      setShowEducationDropdown(false);
    }
    if (
      loginDropdownRef.current &&
      !loginDropdownRef.current.contains(event.target)
    ) {
      setShowLoginDropdown(false);
    }
  };

  // Attach click listener to detect outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setShowDonateDropdown(false);
    setShowEducationDropdown(false);
    setShowLoginDropdown(false);
  }, [location]);

  // Show Donate dropdown and hide Education dropdown
  const handleDonateHover = () => {
    setShowDonateDropdown(true);
    setShowEducationDropdown(false);
  };

  // Show Education dropdown and hide Donate dropdown
  const handleEducationHover = () => {
    setShowEducationDropdown(true);
    setShowDonateDropdown(false);
  };

  // Handle input in search box
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Perform search and redirect based on matched keywords
  const handleSearchSubmit = () => {
    const routes = [
      { keywords: ["donation basics", "basics", "donation", "donate"], path: "/donation-basics" },
      { keywords: ["blood donation", "blood", "donate blood"], path: "/blood-donation" },
      { keywords: ["stem cell donation", "stem cells", "donate stem cells", "stemcells", "stemcell"], path: "/stemcell-donation" },
      { keywords: ["check eligibility", "eligibility", "eligible"], path: "/check-eligibility" },
      { keywords: ["types and compatibility", "blood types", "compatibility", "types"], path: "/types-and-compatibility" },
      { keywords: ["why donate blood", "why blood", "blood donation reason"], path: "/why-donate-blood" },
      { keywords: ["why donate stem cells", "why stemcells", " why stem cells"], path: "/why-donate-stemcells" },
      { keywords: ["faqs", "frequently asked questions", "questions"], path: "/faqs" },
      { keywords: ["join our team", "join team", "volunteer", "team"], path: "/JoinOurTeam" },
    ];

    // Make the search query lowercase and trim extra spaces for easier matching
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // Find the first route where any of the keywords appear in the search query
    const matchedRoute = routes.find((route) =>
      route.keywords.some((keyword) => normalizedQuery.includes(keyword))
    );

    if (matchedRoute) {
      navigate(matchedRoute.path);
      setSearchQuery("");
    } else {
      alert("No matching page found.");
      setSearchQuery("");
    }
  };

  // Closes sidebar when an item inside is clicked
  const handleSidebarItemClick = () => {
    setSidebarOpen(false);
  };

  // Handle login button click from dropdown
  const handleLoginClick = (path) => {
    setSidebarOpen(false);
    setShowLoginDropdown(false);
    navigate(path);
  };

  return (
    <>
      {/* Top Navbar Container */}
      <NavbarContainer>
        {/* Logo */}
        <Logo>
          <a href="/">
            <img src="/images/logo12.png" alt="Donation Logo" loading="lazy" />
          </a>
        </Logo>

        {/* Right side of the navbar (menu, search, login/register, book now) */}
        <RightContainer>
          <Menu>
            {/* Donate menu item with dropdown */}
            <MenuItem
              onMouseEnter={handleDonateHover}
              active={activeItem === "Donate"}
            >
              Donate
            </MenuItem>
            <DropdownMenu ref={donateDropdownRef} show={showDonateDropdown}>
              <DropdownItem to="/donation-basics">Donation Basics</DropdownItem>
              <DropdownItem to="/blood-donation">Blood Donation</DropdownItem>
              <DropdownItem to="/stemcell-donation">Stem Cell Donation</DropdownItem>
              <DropdownItem to="/check-eligibility">Check Eligibility</DropdownItem>
            </DropdownMenu>

            {/* Education menu item with dropdown */}
            <MenuItem
              onMouseEnter={handleEducationHover}
              active={activeItem === "Education"}
            >
              Education
            </MenuItem>
            <DropdownMenu ref={educationDropdownRef} show={showEducationDropdown}>
              <DropdownItem to="/types-and-compatibility">Types and Compatibility</DropdownItem>
              <DropdownItem to="/why-donate-blood">Why Donate Blood</DropdownItem>
              <DropdownItem to="/why-donate-stemcells">Why Donate Stem Cells</DropdownItem>
              {/* <DropdownItem to="/cancer-detection">Cancer Detection</DropdownItem> */}
              <DropdownItem to="/faqs">FAQs</DropdownItem>
            </DropdownMenu>

            {/* Join Our Team - direct link */}
            <MenuItem as={Link} to="/JoinOurTeam" active={activeItem === "JoinOurTeam"}>
              Join Our Team
            </MenuItem>
          </Menu>

          {/* Search Bar */}
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
              }}
            />
            <SearchIcon onClick={handleSearchSubmit}>
              <FaSearch />
            </SearchIcon>
          </SearchContainer>

          {/* Login / Register Dropdown */}
          <div style={{ position: "relative" }}>
            <Button onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
              Login / Register
            </Button>
            <DropdownMenuLogin ref={loginDropdownRef} show={showLoginDropdown}>
              <DropdownItem to="/login" onClick={() => setShowLoginDropdown(false)}>
                Login as Donor
              </DropdownItem>
              <DropdownItem to="/loginHospital">Login as Hospital</DropdownItem>
            </DropdownMenuLogin>
          </div>

          {/* Book Now button navigates to donor login */}
          <ButtonBooknow as={Link} to="/login">
            Book Now
          </ButtonBooknow>
        </RightContainer>

        {/* Mobile Search and Hamburger Menu */}
        <MobileSearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
          />
          <SearchIcon onClick={handleSearchSubmit}>
            <FaSearch />
          </SearchIcon>

          {/* Hamburger Menu icon toggles sidebar */}
          <HamburgerIcon onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </HamburgerIcon>
        </MobileSearchContainer>
      </NavbarContainer>

      {/* Sidebar for Mobile View */}
      <Sidebar open={sidebarOpen}>
        {/* Sidebar Navigation Items */}
        <SidebarMenuItem to="/login" onClick={handleSidebarItemClick}>
          Login as Donor
        </SidebarMenuItem>
        <SidebarMenuItem to="/loginHospital" onClick={handleSidebarItemClick}>
          Login as Hospital
        </SidebarMenuItem>
        <SidebarMenuItem to="/donation-basics" onClick={handleSidebarItemClick}>
          Donation Basics
        </SidebarMenuItem>
        <SidebarMenuItem to="/blood-donation" onClick={handleSidebarItemClick}>
          Blood Donation
        </SidebarMenuItem>
        <SidebarMenuItem to="/stemcell-donation" onClick={handleSidebarItemClick}>
          Stem Cell Donation
        </SidebarMenuItem>
        <SidebarMenuItem to="/check-eligibility" onClick={handleSidebarItemClick}>
          Check Eligibility
        </SidebarMenuItem>
        <SidebarMenuItem to="/types-and-compatibility" onClick={handleSidebarItemClick}>
          Types and Compatibility
        </SidebarMenuItem>
        <SidebarMenuItem to="/why-donate-blood" onClick={handleSidebarItemClick}>
          Why Donate Blood
        </SidebarMenuItem>
        <SidebarMenuItem to="/why-donate-stemcells" onClick={handleSidebarItemClick}>
          Why Donate Stem Cells
        </SidebarMenuItem>
        {/* <SidebarMenuItem to="/cancer-detection" onClick={handleSidebarItemClick}>
          Cancer Detection
        </SidebarMenuItem> */}
        <SidebarMenuItem to="/faqs" onClick={handleSidebarItemClick}>
          FAQs
        </SidebarMenuItem>
        <SidebarMenuItem to="/JoinOurTeam" onClick={handleSidebarItemClick}>
          Join Our Team
        </SidebarMenuItem>
      </Sidebar>
    </>
  );
}

export default Navbar;
