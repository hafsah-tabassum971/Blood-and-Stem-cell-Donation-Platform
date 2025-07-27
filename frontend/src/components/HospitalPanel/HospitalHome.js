import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

// Home container with padding and background color
const HomeContainer = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const TopSection = styled.section`
  // background-color: #eae1e1;
  color: #b00000;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  // width:98%;
  padding-left: 0px;
  margin-left: 0px;

  p{
      @media (max-width: 658px) {
text-align:center;
    justify-content: left;
  }
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const Title = styled.h2`
  color: #b00000;
  margin-bottom: 40px;
  margin-top: 40px;
  font-size: 26px;
  padding-bottom: 10px;
  text-align: center;
`;

const DonationOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const DonationOption = styled.div`
  text-align: center;
  width: 30%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

@media (max-width: 768px) {
    width: 100%;
  }
`;

const DonationImage = styled.img.attrs({
  loading: "lazy",
})` 
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const OptionTitle = styled.h3`
  font-size: 20px;
  color: #b00000;
  margin-top: 10px;
  transition: color 0.3s;
`;

const OptionDescription = styled.p`
  font-size: 16px;
  color: #666;
  padding: 0 10px;
  margin-top: 5px;
  text-align: left;
`;

const ExploreMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    color: #b00000;
  }
`;

const ExploreMore = styled.span`
  color: #b00000;
  font-size: 16px;
  text-decoration: underline;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const Arrow = styled.span`
  font-size: 24px;
  color: #b00000;
  margin-top: 20px;
  margin-bottom: 10px;
`;

// Hospital specific section
const HospitalSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  width: 60%;
  align-items: center;
  gap: 20px;
  border: solid #b00000;
  margin: auto;
     @media (max-width: 768px) {
    flex-direction: column;
    // box-sizing:border-box;
  }
`;

const HospitalImage = styled.img.attrs({
  loading: "lazy",
})`
  width: 50%;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HospitalContent = styled.div`
  width: 50%;
  text-align: left;

   @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const HospitalTitle = styled.h3`
  font-size: 24px;
  color: #b00000;
  margin-bottom: 10px;
            @media (max-width: 768px) {
  font-size: 17px;
    text-align:center;

  }
`;

const HospitalDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
            @media (max-width: 768px) {
  font-size: 13px;
  text-align:left;
  justify-content:left;

  }
`;

const HospitalButton = styled.button`
  background-color: #b00000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgb(158, 25, 18);
  }
`;
const HospitalHome = () => {
  const [hospitalName, setHospitalName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  

  // Example: Simulating hospital data retrieval from localStorage or context
  useEffect(() => {
    // Assuming the hospital's name is stored in localStorage
    const hospital = JSON.parse(localStorage.getItem("hospital"));
    console.log(hospital);
    if (hospital && hospital.name) {
      setHospitalName(hospital.name);
    }
  }, []);

  return (
    <HomeContainer>
      {/* Top Section with Hospital Welcome */}
      <TopSection>
        <h1>Welcome {hospitalName ? hospitalName : " Hospital"}!</h1>
        <p>
          Together, we strive to create a healthier community by empowering lives
          through blood and stem cell donations. Explore how your hospital is
          making a difference today.
        </p>
      </TopSection>

      {/* Hospital Specific Section */}
      <HospitalSection>
        <HospitalImage
          src="/images/Donorpanel img/hospital.jpg"
          alt="Hospital Donation"
        />
        <HospitalContent>
          <HospitalTitle>Your Role in Transforming Lives</HospitalTitle>
          <HospitalDescription>
            As a cornerstone of community health, your hospital plays a pivotal role in facilitating life-saving donations and supporting cutting-edge medical solutions. From managing donor appointments to coordinating volunteer efforts, every action contributes to a healthier future.
          </HospitalDescription>
          {/* <HospitalButton
            onClick={() => (window.location.href = "/giveappointments")}
          >
            GET STARTED
          </HospitalButton> */}
        </HospitalContent>
      </HospitalSection>

      <Section>
        <Title>Our Hospital Services</Title>
        <DonationOptionsContainer>
          {/* Create Drives */}
          <DonationOption>
            <DonationImage
              src="/images/drive.jpg"
              alt="Create Drives"
            />
            <OptionTitle>Create Drives</OptionTitle>
            <OptionDescription>
              Organize blood and stem cell donation drives, engage with the community,
              and expand the impact of your hospital's donation services.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate( "/createdrive")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          {/* Detect Blood Cancer */}
          <DonationOption>
            <DonationImage
              src="/images/cancer.jpg"
              alt="Detect Blood Cancer"
            />
            <OptionTitle>Slot Management</OptionTitle>
            <OptionDescription>
              Our platform empowers hospitals with efficient Slot Management System designed to simplify the scheduling and coordination of critical activities
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate("/slotmanager")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          {/* Manage Volunteer Applications */}
          <DonationOption>
            <DonationImage
              src="/images/volunteers.jpg"
              alt="Manage Volunteer Applications"
            />
            <OptionTitle>Manage Volunteer Applications</OptionTitle>
            <OptionDescription>
              Review and manage applications from volunteers, assign roles, and
              coordinate their activities to support donation drives and hospital
              operations.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate( "/addvolunteers")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>
        </DonationOptionsContainer>
      </Section>
    </HomeContainer>
  );
};

export default HospitalHome;