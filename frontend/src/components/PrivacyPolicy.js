import React from 'react';
import styled from 'styled-components';
import { FaInfoCircle, FaClipboardList, FaRegEye, FaUserShield, FaClock } from 'react-icons/fa';

// Main Container
const PolicyContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  font-family: Arial, sans-serif;
  background-color: white;
  overflow: hidden;
`;

// Hero Section Styles
const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90vh;
  background-color: #eae1e1;
  color: black;
  border-radius: 10px;
  margin-bottom: 40px;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    background-image: url('/images/istockphoto-1290488057-612x612.jpg'); /* Set image as background on small screens */
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
  padding: 30px;
  max-width: 50%;
  z-index: 2; /* Ensures text appears above overlay */

@media (max-width: 768px) {
    color: white; /* Make text readable over dark overlay */
    text-align: left;
    max-width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 10px;
  color: #b00000;

  @media (max-width: 768px) {
    font-size: 32px;
    color: white;

  }
`;

const HeroDescription = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #333;

  @media (max-width: 768px) {
    font-size: 18px;
    color: white;

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

const HeroImage = styled.img`
  // height: 500px;
    height: 100%;
  width: 50vw;
  border-radius: 10px;

  @media (max-width: 768px) {
    display: none; /* Hide the image on small screens */
  }
`;

// Icon Section Styles
const IconSection = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #eae1e1;
  padding: 30px 0;
  margin: 20px 0;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    // gap: 20px;
    
  }
`;

const IconContainer = styled.div`
  text-align: center;
  flex: 1;
  margin: 0 10px;

  svg {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    color: #b00000;
  }

    @media (max-width: 500px) {

        width: 40px;

  }

`;

const IconTitle = styled.h3`
  font-size: 18px;
  color: #333;

   @media (max-width: 750px) {
    display: none; /* Hide title on small screens */
  }
`;

// Section Styles
const Section = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const Subtitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  color: #b00000;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: left;
  }
`;

const Paragraph = styled.p`
  line-height: 1.6;
  color: #555;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const PrivacyPolicy = () => {
  return (
    <PolicyContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Privacy Policy</HeroTitle>
          <HeroDescription>
            Welcome to our Privacy Policy page! When you use our services, you trust us with your information. This Privacy Policy is designed to help you understand what information we collect, why we collect it, and what we do with it.
          </HeroDescription>
        </HeroContent>
        <ImageContainer>
          <HeroImage src="/images/istockphoto-1290488057-612x612.jpg" alt="Privacy Policy" />
        </ImageContainer>
      </HeroSection>

      <IconSection>
        <IconContainer>
          <FaInfoCircle />
          <IconTitle>Data Collection Practices</IconTitle>
        </IconContainer>
        <IconContainer>
          <FaClipboardList />
          <IconTitle>Purpose of Data Collection</IconTitle>
        </IconContainer>
        <IconContainer>
          <FaRegEye />
          <IconTitle>Data Usage and Disclosure</IconTitle>
        </IconContainer>
        <IconContainer>
          <FaUserShield />
          <IconTitle>Your Rights</IconTitle>
        </IconContainer>
        <IconContainer>
          <FaClock />
          <IconTitle>Data Retention Policy</IconTitle>
        </IconContainer>
      </IconSection>

      <Section>
        <Subtitle>Data Collection Practices</Subtitle>
        <Paragraph>
          We collect a variety of personal information, depending on how you interact with our services. When you register for our services, engage with our online tools, or participate in events, we collect information such as your name, contact details, and other information necessary for processing donations, volunteer applications, or community programs. 
          <br /><br />
          Additionally, we may collect health information when necessary, such as medical history and other related data that enable us to offer services like blood donation programs or health-related volunteering. This information is only collected with your explicit consent and is used solely for purposes of facilitating the requested services.
          <br /><br />
          Beyond the personal data you provide, we may collect information about your device and how you use our services. This may include your IP address, browser type, operating system, and data about your engagement on our site, such as pages viewed, links clicked, and time spent on various pages. This data helps us improve our services, deliver more relevant content, and ensure a seamless user experience.
        </Paragraph>
      </Section>

      <Section>
        <Subtitle>Purpose of Data Collection</Subtitle>
        <Paragraph>
          Our primary reason for collecting information is to deliver, maintain, and improve our services. The information helps us to offer efficient customer support, ensure that our programs are accessible to all who are eligible, and keep you updated on our events, news, and any changes to our services.
          <br /><br />
          We also use the collected data for research and analysis to enhance our services and ensure they meet the needs of our community. By understanding user demographics and interests, we are better positioned to create impactful programs and maintain a service that evolves with the community’s expectations. For example, data on health and donation history allows us to optimize blood donation scheduling and volunteer opportunities.
          <br /><br />
          Occasionally, we may be required to use your data to comply with legal obligations, address security issues, or protect our organization and its users from potential harm. Any use of data for these purposes is carried out in compliance with relevant regulations, and we make efforts to inform users wherever possible and appropriate.
        </Paragraph>
      </Section>

      <Section>
        <Subtitle>Data Usage and Disclosure</Subtitle>
        <Paragraph>
          We value your privacy and use rigorous security measures to protect your data. Access to your data is limited to authorized personnel and is used solely for purposes relevant to delivering and improving our services. Data may be shared with trusted third-party vendors, such as cloud storage providers or analytics tools, who assist us in managing and analyzing data. These vendors are bound by confidentiality agreements and may only use the data as directed by us.
          <br /><br />
          We may share information with regulatory authorities or law enforcement in cases where disclosure is legally required. Additionally, we may share anonymized, aggregated data with partners or the public to report on community engagement metrics or the impact of our programs. Any data disclosed in this manner will not personally identify any user.
        </Paragraph>
      </Section>

      <Section>
        <Subtitle>Your Rights</Subtitle>
        <Paragraph>
          Depending on your location, you may have rights under data protection laws regarding your personal information. These rights can include the ability to access your data, request corrections, or, in some cases, request the deletion of your data. You also have the right to object to certain uses of your data, such as receiving marketing messages or profiling. We provide options to unsubscribe from these communications or to request specific privacy preferences within your account settings or by contacting our support team.
          <br /><br />
          Data portability rights may also apply, allowing you to receive a copy of your data in a structured, commonly used format that can be shared with another service provider. Our privacy team is available to assist you in understanding your rights and the steps involved in exercising them.
        </Paragraph>
      </Section>

      <Section>
        <Subtitle>Data Retention Policy</Subtitle>
        <Paragraph>
          We retain your personal information for as long as necessary to meet the purposes outlined in this Privacy Policy, comply with legal obligations, and protect our organization’s and users' interests. For example, personal information linked to donation or volunteer records may be retained longer than general user account information due to regulatory requirements in healthcare or service-related areas.
          <br /><br />
          Once the data is no longer needed, we implement secure deletion or anonymization practices to protect your privacy. Anonymized data, which no longer identifies you personally, may be retained indefinitely for research, statistical, or service improvement purposes, helping us gain insights and improve future programs.
        </Paragraph>
      </Section>
    </PolicyContainer>
  );
};

export default PrivacyPolicy;
