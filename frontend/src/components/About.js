import React from "react";
import styled from "styled-components";
import { FaPhoneAlt, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for routing

const AboutContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  font-family: Arial, sans-serif;
  background-color: white;
  overflow: hidden;

`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  background-color: #eae1e1;
  color: black;
  border-radius: 10px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    // padding: 20px;
    background-image: url("/images/abt.jpg"); /* Set image as background on small screens */
     background-size: cover;
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

const HeroSection = styled(Section)``;

const SectionContent = styled.div`
  flex: 1;
  padding: 30px;
  max-width: 50%;
  z-index: 2; /* Ensures text appears above overlay */

@media (max-width: 768px) {
    color: white; /* Make text readable over dark overlay */
    max-width: 100%;
    text-align: left;
  }
`;

const SectionTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 10px;
  color: #b00000;

  @media (max-width: 768px) {
    font-size: 32px;
    color: #fff;
  }
`;

const SectionDescription = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #333;

  @media (max-width: 768px) {
    font-size: 18px;
    // align-items: left;
    color: #fff;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: none; /* Hide the image on small screens */
  }
`;

const SectionImage = styled.img`
  height: 100%;
  width: 50vw;
  border-radius: 10px;

  @media (max-width: 768px) {
    display: none; /* Hide the image on small screens */
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  background-color: #eae1e1;
  width: 32%;
  border-radius: 10px;
  height: 250px;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const CardTitle = styled.h3`
  font-size: 22px;
  color: #b00000;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-left: 20px;
  margin-right: 20px;
  @media (max-width: 900px) {
    line-height: 1.3;

  }
`;

const LastSection = styled(Section)`
  margin-top: 40px; /* Add top margin */

  @media (max-width: 768px) {
    background-image: url("/images/istockphoto-1132974918-612x612.jpg"); /* Set image as background on small screens */
  }
`;

const HelpTitle = styled.h2`
  font-size: 36px;
  color: #b00000;
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HelpOptions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  flex-wrap: wrap;
`;

const HelpCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 250px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex: 1 1 100%; /* Allow cards to take full width on small screens */
    max-width: 100%;
  }
`;

const HelpIcon = styled.div`
  font-size: 36px;
  color: #b00000;
`;

const HelpText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #b00000;
`;

const HelpDescription = styled(Link)`
  font-size: 16px;
  color: #666;
  text-decoration: none;
  &:hover {
    color: #b00000;
    text-decoration: underline;
  }
`;

function About() {
  return (
    <AboutContainer>
      <HeroSection>
        <SectionContent>
          <SectionTitle>About Us</SectionTitle>
          <SectionDescription>
            Learn more about our mission, values, and the team committed to
            making a difference in blood and stem cell donations.
          </SectionDescription>
        </SectionContent>
        <ImageContainer>
          <SectionImage src="/images/abt.jpg" alt="About Us" />
        </ImageContainer>
      </HeroSection>

      <CardsContainer>
        <Card>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>
            We aim to save lives by connecting donors with those in need and
            raising awareness about blood and stem cell donation. Our efforts
            help ensure that every patient gets the critical care they deserve.
          </CardDescription>
        </Card>

        <Card>
          <CardTitle>Our Values</CardTitle>
          <CardDescription>
            Compassion, integrity, and community are at our core as we work to
            provide life-saving resources to those in need. We believe in
            creating an inclusive environment where everyone can contribute.
          </CardDescription>
        </Card>

        <Card>
          <CardTitle>Our Strategy</CardTitle>
          <CardDescription>
            Our approach includes collaboration with healthcare providers,
            awareness campaigns, and simplifying the donation process. We focus
            on making it easier for individuals to donate and support our cause.
          </CardDescription>
        </Card>
      </CardsContainer>

      <CardsContainer>
        <Card>
          <CardTitle>Our Impact</CardTitle>
          <CardDescription>
            We've connected thousands of donors with recipients, providing
            critical resources to families and patients across the nation. Our
            programs have led to increased donation rates and better outcomes
            for patients.
          </CardDescription>
        </Card>

        <Card>
          <CardTitle>Our Community</CardTitle>
          <CardDescription>
            We engage with local communities to raise awareness and encourage
            participation in donation drives. Together, we build a network of
            support that empowers individuals to make a difference.
          </CardDescription>
        </Card>

        <Card>
          <CardTitle>Get Involved</CardTitle>
          <CardDescription>
            Join us in making a difference—whether by donating, volunteering, or
            spreading the word, your support saves lives. Together, we can
            create a stronger, healthier future for all.
          </CardDescription>
        </Card>
      </CardsContainer>

      {/* New Section */}
      <LastSection>
        <ImageContainer>
          <SectionImage
            src="/images/istockphoto-1132974918-612x612.jpg"
            alt="Community Involvement"
          />
        </ImageContainer>
        <SectionContent>
          <HelpTitle>Help and Support</HelpTitle>
          <HelpOptions>
            <HelpCard>
              <HelpIcon>
                <FaPhoneAlt />
              </HelpIcon>
              <HelpText>Contact Us</HelpText>
              <HelpDescription to="/contact-us">
                Get in touch today →
              </HelpDescription>
            </HelpCard>
            <HelpCard>
              <HelpIcon>
                <FaQuestionCircle />
              </HelpIcon>
              <HelpText>FAQS</HelpText>
              <HelpDescription to="/FAQS">Find your answer →</HelpDescription>
            </HelpCard>
          </HelpOptions>
        </SectionContent>
      </LastSection>
    </AboutContainer>
  );
}

export default About;
