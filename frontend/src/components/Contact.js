import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ContactContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  font-family: Arial, sans-serif;
  background-color: white;
  overflow: hidden;
`;

// Contact Us Header Styles
const ContactSection = styled.section`
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
  background-image: url('/images/istockphoto-1371958166-612x612.jpg'); /* Set image as background on small screens */
  // background-size: cover;  /* Ensures the image covers the entire background */
  // background-position: center;  /* Centers the image */
  // background-repeat: no-repeat;  /* Prevents the image from repeating */
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

const TextContainer = styled.div`
  flex: 1;
  padding: 30px;
  max-width: 50%;
  z-index: 2; /* Ensures text appears above overlay */

@media (max-width: 768px) {
    color: white; /* Make text readable over dark overlay */
    // max-width: 100%;
    text-align: left;
  }

`;

const SectionTitle = styled.h2`
  font-size: 48px;
// margin-top: 30vh;
  margin-bottom: 10px;
  color: #b00000;

    @media (max-width: 768px) {
    text-align: left;
    font-size: 32px;
    color: white;
 }
`;

const SectionDescription = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #333;

    @media (max-width: 768px) {
    text-align: left;
        font-size: 18px;

    color: white;


 }
`;

const ImageContainer = styled.div`
  flex: 1;
        height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    // height: 500px;
      height: 100%;
    width: 50vw;
    // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

   @media (max-width: 768px) {
    display: none; /* Hide the image on small screens */
  }
`;

// Contact Information Section
const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  font-size: 28px;
  color: #b00000;
  margin-bottom: 15px;
  text-align: left;
`;

const InfoDescription = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  text-align: left;
  margin-bottom: 30px;
`;

const ContactDetailsList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 16px;
  color: #333;
  text-align: left;
`;

const ContactDetailsItem = styled.li`
  margin-bottom: 20px;
`;

const ContactLink = styled.a`
  color: #b00000;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const SupportHoursList = styled.ul`
  list-style: none;
  padding-left: 20px;
  font-size: 16px;
  color: #333;
  margin-top: 10px;
  line-height: 1.8;
`;

// Office Section
const OfficeSection = styled.section`
  // background-color: #e8f5e9;
  padding: 40px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  margin-bottom: 10px;
`;

const OfficeTitle = styled.h3`
  font-size: 28px;
  color: #b00000;
  margin-bottom: 15px;
  text-align: left;
`;

const OfficeDescription = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  text-align: left;
`;

function ContactUs() {
  const location = useLocation(); // Get the current location

  // Ensure the page scrolls to the top when this component is loaded
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page when Login component is mounted
  }, [location]);
  return (
    <ContactContainer>
      {/* Contact Us Header Section */}
      <ContactSection>
        <TextContainer>
          <SectionTitle>Contact Us</SectionTitle>
          <SectionDescription>
            We’re here to help, whatever you need. Pick a way to get in touch
            or drop us a line in order to solve your query.
          </SectionDescription>
        </TextContainer>
        <ImageContainer>
          <img
            src="/images/istockphoto-1371958166-612x612.jpg"
            alt="Customer Support"
              loading="lazy"

          />
        </ImageContainer>
      </ContactSection>

      {/* Contact Information Section */}
      <InfoSection>
        <InfoTitle>Get in Touch</InfoTitle>

        <InfoDescription>
          Feel free to contact us through any of the following channels.
          Sometimes it’s easier to speak to a human. Call us or Contact us with
          any question, from eligibility to technology. We are here to help you
          with any questions or issues regarding the platform, donations, or
          services.
        </InfoDescription>
        <ContactDetailsList>
          <ContactDetailsItem>
            <strong>Email:</strong>{" "}
            <ContactLink href="mailto:support@donationplatform.com">
              support@donationplatform.com
            </ContactLink>
          </ContactDetailsItem>
          <ContactDetailsItem>
            <strong>Phone:</strong>{" "}
            <ContactLink href="tel:+123456789">+1 (234) 567-890</ContactLink>
          </ContactDetailsItem>
          <ContactDetailsItem>
            <strong>Customer Support:</strong>{" "}
            <ContactLink href="tel:+1987654321">+1 (987) 654-321</ContactLink>
          </ContactDetailsItem>
          <ContactDetailsItem>
            <strong>Support Hours:</strong> Check your time zone first
            <SupportHoursList>
              {" "}
              <ul>
                <li>Monday - Friday: 7:30 AM - 7:00 PM</li>
                <li>Saturday - Sunday: 8:00 AM - 4:30 PM</li>
                <li>National Public Holidays: 8:00 AM - 4:30 PM</li>{" "}
              </ul>
            </SupportHoursList>
          </ContactDetailsItem>
        </ContactDetailsList>
      </InfoSection>

      {/* Office Location Section */}
      <OfficeSection>
        <OfficeTitle>Our Office Location</OfficeTitle>
        <OfficeDescription>
          You can visit us at the following address during our business hours.
          If you need any assistance, feel free to drop by, and we’ll be happy
          to help.
        </OfficeDescription>
        <ContactDetailsList>
          <ContactDetailsItem>
            <br></br>
            <strong>Address:</strong> 1234 Donation Ave, City, Country
          </ContactDetailsItem>
          <ContactDetailsItem>
            <strong>Postal Code:</strong> 123456
          </ContactDetailsItem>
        </ContactDetailsList>
      </OfficeSection>
    </ContactContainer>
  );
}

export default ContactUs;
