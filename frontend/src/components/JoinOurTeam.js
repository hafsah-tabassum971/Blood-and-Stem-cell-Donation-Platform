import React from "react";
import styled from "styled-components";
import { FaHandsHelping, FaUsers, FaLightbulb } from "react-icons/fa"; // Import relevant icons

// Styled Components
const PageContainer = styled.div`
  padding-top: 20px;
  max-width: 100%;
  margin: auto;
  font-family: Arial, sans-serif;
  border-radius: 10px;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90vh;
  margin-bottom: 40px;
  background-color: #eae1e1;
  // background-image: url('/images/join.jpg'); /* Default background image for larger screens */

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    background-image: url('/images/join.jpg'); /* Default background image for larger screens */
    background-size: cover; /* Adjust image cover behavior for small screens */
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
      &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 10px;
      z-index: 1; /* Ensure it stays behind the text */
    }
  }
    
`;

const HeroContent = styled.div`
  flex: 1;
  padding: 40px;
  text-align: left;
  color: #333;
  z-index: 2; /* Ensures text appears above overlay */

@media (max-width: 768px) {
    color: white; /* Make text readable over dark overlay */
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  color: #b00000;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 36px;
    color: white; 
  }
`;

const HeroDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    color: white; 
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  height: 100%;
  // display: block;

  @media (max-width: 768px) {
    display: none; /* Hide image on small screens */
        background-repeat: no-repeat;

  }
`;

const HeroImage = styled.img.attrs({
  loading: 'lazy',
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #b00000;
  text-align: left;
  margin-left: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
  text-align: center;
    font-size: 28px;
  }
`;



const BenefitsContainer = styled.div`
    display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const BenefitCard = styled.div`
  background-color:  #eae1e1;
    height: auto;
  border-radius: 10px;
  padding: 20px;
  flex: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  svg {
    font-size: 40px;
    color: #b00000;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #b00000;
  }

  p {
    font-size: 16px;
    color: #666;
  }

      @media (max-width: 900px) {
  height: auto;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  text-align: justify;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ContentParagraph = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
    @media (max-width: 768px) {
    text-align: left;
  }
`;

const InitiativesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const InitiativeCard = styled.div`
  background-color:  #eae1e1;
    height: auto;
  border-radius: 10px;
  padding: 20px;
  flex: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #b00000;
  }

  p {
    font-size: 16px;
    color: #666;
  }

      @media (max-width: 900px) {
  height: auto;
  }
`;

const CallToAction = styled.div`
  background-color: #eae1e1; /* Same background color as hero section */
  margin-bottom: 30px;
    margin-top: 30px;

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
  font-size: 1.2rem;
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

function JoinOurTeam() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Join Our Team</HeroTitle>
          <HeroDescription>
            Be part of a mission to save lives and make a real difference in the
            world. Join a passionate team dedicated to blood and stem cell
            donation awareness, healthcare excellence, and community impact.
          </HeroDescription>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage src="/images/join.jpg" alt="Hospitals" />
        </HeroImageContainer>
      </HeroSection>

      {/* Call to Action Content Section */}
      <Section>
        <ContentContainer>
          <ContentParagraph>
            By joining our team, you will embark on a meaningful journey where your efforts directly contribute to life-saving causes. Whether it’s through organizing donation drives, raising awareness about the critical need for blood and stem cell donations, or supporting families and hospitals in their medical journeys, your impact will be immense.
          </ContentParagraph>
          <ContentParagraph>
            We believe in fostering a collaborative and supportive environment. You will have the opportunity to work alongside dedicated professionals, passionate volunteers, and healthcare experts. Together, we can tackle challenges, celebrate milestones, and create a lasting legacy of compassion and service.
          </ContentParagraph>
          <ContentParagraph>
            Don’t just join a team—join a movement. Take the first step towards transforming lives and communities. We’re excited to welcome you to our family of changemakers and lifesavers.
          </ContentParagraph>
        </ContentContainer>
      </Section>

      {/* Why Join Us Section */}
      <Section>
        <SectionTitle>Why Join Us?</SectionTitle>
        <BenefitsContainer>
          <BenefitCard>
            <FaHandsHelping />
            <h3>Make a Difference</h3>
            <p>
              Your contributions will directly save lives and provide hope to countless individuals and families. From organizing impactful donation drives to spreading awareness, every effort you make will create lasting change.
            </p>
          </BenefitCard>
          <BenefitCard>
            <FaUsers />
            <h3>Be Part of a Team</h3>
            <p>
              Work alongside a diverse group of dedicated individuals united by a shared passion for service. Our inclusive team environment encourages collaboration, mutual respect, and the exchange of ideas.
            </p>
          </BenefitCard>
          <BenefitCard>
            <FaLightbulb />
            <h3>Learn & Grow</h3>
            <p>
              Gain hands-on experience in organizing events, community outreach, and healthcare advocacy. We provide opportunities to develop leadership skills, enhance your expertise, and broaden your horizons.
            </p>
          </BenefitCard>
        </BenefitsContainer>
      </Section>

      {/* Our Initiatives Section */}
      <Section>
        <SectionTitle>Our Key Initiatives</SectionTitle>
        <InitiativesContainer>
          <InitiativeCard>
            <h3>Community Blood Drives</h3>
            <p>
              We organize blood donation events in collaboration with local organizations and volunteers to ensure hospitals have the blood supplies they need. Every unit collected helps save lives in emergencies and ongoing medical treatments.
            </p>
          </InitiativeCard>
          <InitiativeCard>
            <h3>Stem Cell Awareness</h3>
            <p>
              Through education and outreach programs, we aim to increase awareness about the importance of stem cell donations. Our efforts help match donors with patients in need of life-saving transplants.
            </p>
          </InitiativeCard>
          <InitiativeCard>
            <h3>Healthcare Support</h3>
            <p>
              We provide essential support to hospitals and families, including resources for patient care and advocacy. Whether through logistical assistance or emotional support, we’re there for those facing challenging times.
            </p>
          </InitiativeCard>
        </InitiativesContainer>

        {/* Call to Action */}
        <CallToAction>
          <CallToActionTitle>Ready to Join Our Team</CallToActionTitle>
          <CallToActionText>
            Become a part of our mission to save lives. Whether as a volunteer or a dedicated team
            member, your support can make a lasting impact. Join us today and help create a healthier future.
          </CallToActionText>
          <CallToActionButton href="/login">
            <FaUsers style={{ marginRight: "10px" }} /> Get Involved Now!
          </CallToActionButton>
        </CallToAction>

      </Section>

    </PageContainer>
  );
}

export default JoinOurTeam;
