import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaPhoneAlt, } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link for routing

// Styled components for the FAQ page
const Container = styled.div`
  padding-top: 20px;
  max-width: 100%;
  margin: auto;
  font-family: Arial, sans-serif;
  border-radius: 10px;
`;

// Hero Section Styles
const HeroSection = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90vh;
  margin-bottom: 40px;
  background-color: #eae1e1;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    background-image: url('/images/female-nurse-holding-tablet-computer-600nw-2377692067.webp');
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
  color: white;
 }
`;

const HeroDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 20px;
  @media (max-width: 768px) {
  color: white;
 }
`;


const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: #b00000;
  margin-bottom: 30px;
      @media (max-width: 768px) {
  text-align: left;
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  height: 100%;
    @media (max-width: 768px) {
    display: none;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Question = styled.div`
  background-color: #eae1e1;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;

const Answer = styled.div`
  padding: 10px 20px;
  font-size: 1rem;
  color: #555;
  background-color: white;
  border-radius: 0 0 10px 10px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin-bottom: 10px;
`;

const Chevron = styled.span`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.show ? 'rotate(180deg)' : 'rotate(0deg)')};
`;


const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
    @media (max-width: 768px) {
    display: none;
  }
`;

const SectionImage = styled.img`
  height: 500px;
  width: 50vw;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;




const HelpTitle = styled.h2`
  font-size: 36px;
  color: #b00000;
  margin-bottom: 20px;
 margin-top: 60px;
  text-align: center;
    @media (max-width: 768px) {
   
    text-align: center;
  }
`;


const LastSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 450px;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f5eaea;
  border-radius: 10px;
  overflow: hidden;

   @media (max-width: 768px) {
    background-image: url("/images/help.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: auto;
    flex-direction: column;
    background-color: transparent;
  }
`;

const SectionContent = styled.div`
  flex: 1;
  padding: 30px;
  max-width: 50%;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const HelpOptions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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
  width: 250px;
    margin-right: 20px;


  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
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



const Faqs = () => {
  // `activeIndex` stores the index of the currently expanded FAQ
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle visibility of a specific answer
  const toggleAnswer = (index) => {
    // If clicked question is already active, close it; otherwise open it
    setActiveIndex(activeIndex === index ? null : index);
  };

  const location = useLocation(); // Get the current location

  // Ensure the page scrolls to the top when this component is loaded
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page when Login component is mounted
  }, [location]);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Have Questions About Donation?</HeroTitle>
          <HeroDescription>
            Our Frequently Asked Questions section has all the answers you need. Learn about the donation process, eligibility, and how your donation can help save lives.
          </HeroDescription>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage
            src="/images/female-nurse-holding-tablet-computer-600nw-2377692067.webp"
            alt="Nurse holding tablet"
          />
        </HeroImageContainer>
      </HeroSection>

      {/* FAQ Section */}
      <Container id="faq-section">
        <Title>Frequently Asked Questions</Title>

        {/* Stem Cell Donation Questions */}
        {/* Each question triggers toggleAnswer(index) onClick */}
        <Question onClick={() => toggleAnswer(0)}>
          What is stem cell donation?
          <Chevron show={activeIndex === 0}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 0}>
          Stem cell donation involves providing healthy stem cells to replace damaged or diseased ones in patients undergoing treatment, such as for leukemia or lymphoma.
        </Answer>

        <Question onClick={() => toggleAnswer(1)}>
          Who can donate stem cells?
          <Chevron show={activeIndex === 1}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 1}>
          Individuals aged 18 to 44 in good health are generally eligible. Our platform helps assess your eligibility based on HLA testing and health screening.
        </Answer>

        <Question onClick={() => toggleAnswer(2)}>
          What is HLA typing, and why is it important?
          <Chevron show={activeIndex === 2}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 2}>
          HLA typing determines tissue compatibility between donors and recipients. It is essential to ensure a successful stem cell transplant.
        </Answer>

        <Question onClick={() => toggleAnswer(3)}>
          How is stem cell donation done?
          <Chevron show={activeIndex === 3}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 3}>
          Stem cells are collected either through peripheral blood stem cell collection or bone marrow extraction. The method depends on the patient's needs and donor suitability.
        </Answer>

        <Question onClick={() => toggleAnswer(4)}>
          Is stem cell donation painful?
          <Chevron show={activeIndex === 4}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 4}>
          Peripheral blood stem cell donation involves minimal discomfort. Bone marrow donation may cause temporary soreness at the collection site.
        </Answer>

        <Question onClick={() => toggleAnswer(5)}>
          How can I register as a stem cell donor?
          <Chevron show={activeIndex === 5}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 5}>
          You can register on our platform by creating an account and booking an appointment for HLA typing at a nearby hospital.
        </Answer>

        <Question onClick={() => toggleAnswer(6)}>
          How long does the stem cell donation process take?
          <Chevron show={activeIndex === 6}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 6}>
          The process can take a few hours. Peripheral blood stem cell collection typically lasts 4-6 hours, while bone marrow donation may take 2-3 hours.
        </Answer>

        {/* Blood Donation Questions */}
        <Question onClick={() => toggleAnswer(7)}>
          Who can donate blood?
          <Chevron show={activeIndex === 7}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 7}>
          Healthy individuals aged 18 to 65 who meet weight requirements can donate blood. A health screening ensures donor safety.
        </Answer>

        <Question onClick={() => toggleAnswer(8)}>
          How often can I donate blood?
          <Chevron show={activeIndex === 8}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 8}>
          You can donate whole blood every 12 weeks. Our platform tracks your donations and sends reminders for your next eligible date.
        </Answer>

        <Question onClick={() => toggleAnswer(9)}>
          What are the types of blood donations?
          <Chevron show={activeIndex === 9}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 9}>
          Blood donations include whole blood, plasma, and platelet donations. Each type serves different medical needs and requirements.
        </Answer>

        <Question onClick={() => toggleAnswer(10)}>
          What should I do before donating blood?
          <Chevron show={activeIndex === 10}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 10}>
          Eat a healthy meal, drink plenty of water, and get a good night's sleep. Our platform provides preparation tips tailored for donors.
        </Answer>

        <Question onClick={() => toggleAnswer(11)}>
          What happens during the blood donation process?
          <Chevron show={activeIndex === 11}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 11}>
          The process includes registration, a brief health check, and donation, which takes 10-15 minutes. You can relax with refreshments afterward.
        </Answer>

        <Question onClick={() => toggleAnswer(12)}>
          Can I donate blood if I am on medication?
          <Chevron show={activeIndex === 12}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 12}>
          Certain medications may require a temporary deferral. Consult our platform or your healthcare provider to check your eligibility.
        </Answer>

        <Question onClick={() => toggleAnswer(13)}>
          How does my blood donation help others?
          <Chevron show={activeIndex === 13}>▼</Chevron>
        </Question>
        <Answer show={activeIndex === 13}>
          Your donation can save lives in emergencies, surgeries, and for patients with chronic illnesses. Our platform ensures that your contribution reaches those in need.
        </Answer>


        {/* New Section */}
        <LastSection>
          <ImageContainer>
            <SectionImage src="/images/help.jpg" alt="Community Involvement" />
          </ImageContainer>
          <SectionContent>
            <HelpTitle>Help and Support</HelpTitle>
            <HelpOptions>
              <HelpCard>
                <HelpIcon><FaPhoneAlt /></HelpIcon>
                <HelpText>Contact Us</HelpText>
                <HelpDescription to="/contact-us">Get in touch today →</HelpDescription>
              </HelpCard>
              <HelpCard>
                <HelpIcon><FiHeart /></HelpIcon>
                <HelpText>Be a Donor</HelpText>
                <HelpDescription to="/login">Join us today →</HelpDescription>
              </HelpCard>
            </HelpOptions>
          </SectionContent>
        </LastSection>

      </Container>
    </div>
  );
};

export default Faqs;
