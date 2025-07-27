import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";

// Home container with padding and background color
const HomeContainer = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;
    // min-width: 100vw;

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
    justify-content: center;
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
})`  width: 100%;
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

// New Appointment Section
const AppointmentSection = styled(Section)`
  display: flex;
  justify-content: space-between;
   width: 60%;
  align-items: center;
  gap: 20px;
  // background-color: #f9f9f9;
  border: solid #b00000;
  margin: auto;
   @media (max-width: 768px) {
    flex-direction: column;
    // box-sizing:border-box;
  }
`;

const AppointmentImage = styled.img.attrs({
  loading: "lazy",
})`
  width: 40%;
  border-radius: 10px;
  object-fit: cover;


   @media (max-width: 768px) {
    width: 100%;
  }
`;

const AppointmentContent = styled.div`
  width: 50%;
  text-align: left;

 
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const AppointmentTitle = styled.h3`
  font-size: 24px;
  color: #b00000;
  margin-bottom: 10px;
          @media (max-width: 768px) {
  font-size: 17px;
    text-align:center;

  }
`;

const AppointmentDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
          @media (max-width: 768px) {
  font-size: 13px;
  text-align:left;
  justify-content:left;

  }

`;

const AppointmentButton = styled.button`
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
        @media (max-width: 768px) {
  font-size: 13px;
width:100%
  }

`;


const DonorHome = () => {
const [userName, setUserName] = useState("");
const navigate = useNavigate();

  // Example: Simulating user data retrieval from localStorage or context
  useEffect(() => {
    // Assuming the user's name is stored in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);
  const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top of the page when Login component is mounted
    }, [location]);

  return (
    <HomeContainer>
      {/* Top Section with User Welcome */}
      <TopSection>
        <h1>Welcome, {userName || "Donor"}!</h1>
        <p>
          We're glad you're here. Explore how you can make a difference through
          blood and stem cell donation.
        </p>
      </TopSection>

      <AppointmentSection>
        <AppointmentImage
          src="/images/Donorpanel img/new-appointment.jpg"
          alt="Make a New Appointment"
        />
        <AppointmentContent>
          <AppointmentTitle>Make a New Appointment</AppointmentTitle>
          <AppointmentDescription>
            Your donation can change lives. By making an appointment, you’re giving the gift of hope and saving lives. Thank you for your incredible generosity.
          </AppointmentDescription>

          <AppointmentButton
            onClick={() => navigate("/appointmentpage")}
          >
            MAKE A NEW APPOINTMENT
          </AppointmentButton>
        </AppointmentContent>
      </AppointmentSection>

      <Section>
        <Title>Before starting, Learn more about donations</Title>
        <DonationOptionsContainer>
          {/* First Card: Donation Basics */}
          <DonationOption>
            <DonationImage
              src="/images/istockphoto-1415405974-612x612.jpg"
              alt="Donation Basics"
            />
            <OptionTitle>Donation Basics</OptionTitle>
            <OptionDescription>
              Learn the fundamentals of blood and stem cell donation. Understand
              the importance of donation in saving lives, and how each type of
              donation can make a difference in healthcare.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate("/donation-basics")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          {/* Second Card: Blood Donation */}
          <DonationOption>
            <DonationImage
              src="/images/bd.jpg"
              alt="Blood Donation"
            />
            <OptionTitle>Donate Blood</OptionTitle>
            <OptionDescription>
              Blood donations are vital for surgeries, trauma care, and medical
              treatments. Different blood types and donation methods can help
              save lives. Learn why your blood donation matters.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate("/blood-donation")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          {/* Third Card: Stem Cell Donation */}
          <DonationOption>
            <DonationImage
              src="/images/sd.jpg"
              alt="Stem Cell Donation"
            />
            <OptionTitle>Donate Stem Cells</OptionTitle>
            <OptionDescription>
              Stem cell donations provide hope for patients suffering from blood
              cancers and blood disorders. Discover how stem cell compatibility
              works and why your donation is a game changer.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate("/stemcell-donation")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>
        </DonationOptionsContainer>
      </Section>

      {/* Second Section with updated data */}
      <Section>
        <DonationOptionsContainer>
          {/* Types and Compatibility */}
          <DonationOption>
            <DonationImage
              src="/images/Donorpanel img/types&compatibility.jpg"
              alt="Types and Compatibility"
            />
            <OptionTitle>Types & Compatibility</OptionTitle>
            <OptionDescription>
              Understand the different types of blood and stem cell donations,
              and the compatibility factors that are crucial for ensuring a
              successful donation. Learn what makes your donation impactful.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate("/types-and-compatibility")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          {/* Why Blood Donation */}
          <DonationOption>
            <DonationImage src="/images/eli.jpg" alt="Check Eligibility" />
            <OptionTitle>Check Eligibility</OptionTitle>
            <OptionDescription>
              Wondering if you're eligible to donate blood or stem cells? Answer
              a few simple questions to find out. Your donation can save lives,
              and we want to ensure that you're ready to help.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate("/check-eligibility")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          {/* Why Stem Cell Donation */}
          <DonationOption>
            <DonationImage
              src="/images/female-nurse-holding-tablet-computer-600nw-2377692067.webp"
              alt="FAQS"
            />
            <OptionTitle>FAQS</OptionTitle>
            <OptionDescription>
              Our Frequently Asked Questions section has all the answers you
              need. Learn about the donation process, eligibility, and how your
              donation can help save lives.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => navigate( "/faqs")}
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

export default DonorHome;

