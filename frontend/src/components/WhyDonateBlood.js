import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import {
  FaHeart,
  FaHandHoldingHeart,
  FaCalendarCheck,
  FaHospital,
  FaTint,
  FaAmbulance,
  FaProcedures,
  FaHeartbeat,
} from "react-icons/fa";
// Styled components
const Container = styled.div`
  padding-top: 20px;
  max-width: 100%;
  margin: auto;
  font-family: Arial, sans-serif;
  border-radius: 10px;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 90vh;
  background-image: url("/images/whyb.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  color: white;
  text-align: left;
  margin-bottom: 40px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

    @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 20px;
  margin-left: 40px;
    @media (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
    text-align: left;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-left: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.3;
   @media (max-width: 768px) {
    font-size: 32px;
      padding-left: 0px;

  }
`;

const HeroDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HeroButton = styled.a`
  background-color: #b00000;
  color: white;
  margin-left: 40px;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 30px;
  display: inline-block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(158, 25, 18);
  }
      @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
      margin-left: 0px;

  }
`;


const DetailedContentWrapper = styled.div`
  padding-top: 20px;
  max-width: 100%;
  margin: auto;
  font-family: Arial, sans-serif;
  border-radius: 10px;
`;

const TextBlock = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const TextBlockTitle = styled.h3`
  font-size: 2rem;
  color: #b00000;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const TextBlockDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.8;
`;

const ImpactSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  margin-left: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const ImpactCard = styled.div`
  text-align: center;
  flex: 1 1 30%; /* 30% width for each card */
  // max-width: 30%; /* Limit maximum width */
  height: 300px; /* Fixed height for uniformity */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  background-color: #eae1e1; /* Same background color as hero section */
  margin-bottom: 20px; /* Add space between cards */
  margin-right: 10px; /* Space between cards */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  // @media (max-width: 768px) {
  //   flex: 1 1 100%; /* Full width on smaller screens */
  //   max-width: 100%;
  //   height: auto;
  // }
      @media (max-width: 900px) {
  max-width: 100%;
  height: auto;
  }
`;

const ImpactIcon = styled.div`
  font-size: 3rem;
  color: #b00000;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ImpactTitle = styled.h4`
  font-size: 1.5rem;
  color: #b00000;
  margin: 10px 0;
`;

const ImpactText = styled.p`
  font-size: 1rem;
  color: #555;
  text-align: left;
  padding-left: 10px;
  padding-right: 5px;
  margin-bottom: 10px;

`;

const CallToAction = styled.div`
  background-color: #eae1e1; /* Same background color as hero section */
  margin-bottom: 30px;
  color: #b00000;
  padding: 40px;
  border-radius: 10px;
  text-align: left;
`;

const CallToActionTitle = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const CallToActionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const CallToActionButton = styled.a`
  background-color: white;
  color: #b00000;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgb(158, 25, 18);
    color: white;
  }
      @media (max-width: 768px) {
   
  }
`;

// How Blood Donation Helps Section Component
function HowBloodDonationHelps() {
  const location = useLocation();

      useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  return (
    <ImpactSection>
      <ImpactCard>
        <ImpactIcon>
          <FaHospital />
        </ImpactIcon>
        <ImpactTitle>Emergency Surgeries</ImpactTitle>
        <ImpactText>
          Provides essential blood for life-saving surgeries during emergencies,
          such as trauma and major surgeries. Your donation ensures that
          hospitals are prepared for critical situations where blood loss is
          significant.
        </ImpactText>
      </ImpactCard>
      <ImpactCard>
        <ImpactIcon>
          <FaAmbulance />
        </ImpactIcon>
        <ImpactTitle>Accident Victims</ImpactTitle>
        <ImpactText>
          Helps accident victims receive quick blood transfusions to stabilize
          their condition and save lives. Blood donations are crucial in
          providing immediate care and improving survival chances in emergency
          response scenarios.
        </ImpactText>
      </ImpactCard>
      <ImpactCard>
        <ImpactIcon>
          <FaProcedures />
        </ImpactIcon>
        <ImpactTitle>Cancer Patients</ImpactTitle>
        <ImpactText>
          Supports cancer patients with blood and platelets during treatments
          like chemotherapy. These transfusions are vital for maintaining the
          patient's strength and combating the side effects of treatment.
        </ImpactText>
      </ImpactCard>
      <ImpactCard>
        <ImpactIcon>
          <FaHeartbeat />
        </ImpactIcon>
        <ImpactTitle>Chronic Illnesses</ImpactTitle>
        <ImpactText>
          Aids individuals with chronic conditions requiring regular blood
          transfusions to manage their health. Consistent blood donations are
          essential in ensuring these patients receive the care they need to
          live comfortably.
        </ImpactText>
      </ImpactCard>
      <ImpactCard>
        <ImpactIcon>
          <FaTint />
        </ImpactIcon>
        <ImpactTitle>Blood Disorders</ImpactTitle>
        <ImpactText>
          Essential for patients with blood disorders like hemophilia, providing
          regular transfusions for their survival. Blood donations help these
          patients manage their condition and live normal, healthy lives.
        </ImpactText>
      </ImpactCard>
    </ImpactSection>
  );
}

// Main Component
function WhyDonateBlood() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle Donate Now button click
  const handleDonateNow = () => {
    navigate("/login"); // Navigate to the login page
  };
  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Be a Lifesaver: Donate Blood Today</HeroTitle>
          <HeroDescription>
            Blood donation is one of the simplest and most powerful ways to save
            lives. Whether you are helping someone recovering from surgery,
            battling cancer, or needing a blood transfusion, your donation makes
            a direct impact. Join us today and be part of the solution.
          </HeroDescription>
          <HeroButton onClick={handleDonateNow}>
            <FaHeart style={{ marginRight: "10px" }} /> Donate Now
          </HeroButton>
        </HeroContent>
      </HeroSection>

      {/* Detailed Content Section */}
      <DetailedContentWrapper>
        {/* Text Block 1 */}
        <TextBlock>
          <TextBlockTitle>
            <FaHandHoldingHeart style={{ marginRight: "10px" }} />
            Why Donate Blood?
          </TextBlockTitle>
          <TextBlockDescription>
            Blood donation is essential for hospitals to operate smoothly,
            especially during emergencies and medical procedures. It also
            supports cancer patients who often need blood during chemotherapy,
            individuals with chronic illnesses, and those undergoing surgeries.
            Your blood donation can provide critical care for newborns, accident
            victims, and others in life-threatening situations. Without regular
            blood donations, hospitals may struggle to meet demand and save
            lives.
          </TextBlockDescription>
        </TextBlock>

        {/* Text Block 2 */}
        <TextBlock>
          <TextBlockTitle>
            <FaCalendarCheck style={{ marginRight: "10px" }} />
            The Impact of Blood Donation
          </TextBlockTitle>
          <TextBlockDescription>
            Each blood donation can potentially save up to three lives. Blood is
            divided into different components: red cells, plasma, and platelets.
            Each component is used in different medical treatments, helping
            patients with a wide range of conditions. Your donation supports
            individuals with severe anemia, those recovering from organ
            transplants, and people with blood disorders.
          </TextBlockDescription>
        </TextBlock>

        {/* How Blood Donation Helps Section */}
        <HowBloodDonationHelps />

        {/* Call to Action */}
        <CallToAction>
          <CallToActionTitle>Ready to Make a Difference?</CallToActionTitle>
          <CallToActionText>
            Join us in saving lives by donating blood today. Your generous
            contribution can make a world of difference in someone’s life.
            Together, let's make the world a healthier and safer place.
          </CallToActionText>
          <CallToActionButton href="/login">
            <FaHeart style={{ marginRight: "10px" }} /> Start your
            journey now!
          </CallToActionButton>
        </CallToAction>
      </DetailedContentWrapper>
    </Container>
  );
}

export default WhyDonateBlood;
