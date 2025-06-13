import React, { useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiUserCheck, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link for routing


const BloodDonationContainer = styled.div`
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

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    background-image: url('/images/bd.jpg');
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

const Section = styled.section`
  margin-bottom: 40px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const Title = styled.h2`
  color: #b00000;
  margin-bottom: 40px;
  font-size: 26px;
  padding-bottom: 10px;
  text-align: center;
`;

const DonationOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DonationOption = styled.div`
  text-align: center;
  height: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background-color: #eae1e1;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const DonationImage = styled.img`
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

const PostCareSection = styled.section`
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 10px;
`;

const PostCareTitle = styled.h2`
  color: #b00000;
  margin-bottom: 40px;
  font-size: 26px;
  padding-bottom: 10px;
  text-align: center;
`;

const PostCareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const PostCareCard = styled.div`
  background-color:  #eae1e1;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
    @media (max-width: 900px) {
  height: auto;
  }
`;

const PostCareHeader = styled.h3`
  color: #b00000;
  font-size: 20px;
  margin-bottom: 10px;
`;

const PostCareDescription = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
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
    background-image: url("/images/donor.jpg");
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

function BloodDonation() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <BloodDonationContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Be a Hero: Donate Blood Today</HeroTitle>
          <HeroDescription>
            Every drop counts! By donating blood, you play a crucial role in saving lives. Your generosity can help patients in need, from accident victims to those undergoing surgeries. Join us in the mission to ensure that everyone has access to life-saving blood when they need it most.
          </HeroDescription>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage src="/images/bd.jpg" alt="Nurse holding tablet" />
        </HeroImageContainer>
      </HeroSection>

      <Section>
        <Title>Blood Donation Process</Title>
        <DonationOptionsContainer>
          <DonationOption>
            <DonationImage src="/images/process1.jpg" alt="Registration" />
            <OptionTitle>Step 1: Registration</OptionTitle>
            <OptionDescription>Sign up by providing essential details and answering a few health questions. Your responses help determine if you're ready to donate and ensure a safe experience for both you and recipients.</OptionDescription>
          </DonationOption>
          <DonationOption>
            <DonationImage src="/images/process2.jpg" alt="Choose Hospital" />
            <OptionTitle>Step 2: Choose Hospital</OptionTitle>
            <OptionDescription>After registering, select a preferred hospital for your donation. You’ll also choose a date and time that fits your schedule for maximum convenience.</OptionDescription>
          </DonationOption>
          <DonationOption>
            <DonationImage src="/images/process3.jpg" alt="Book Appointment" />
            <OptionTitle>Step 3: Book Appointment</OptionTitle>
            <OptionDescription>Finalize your donation schedule by booking an appointment. A confirmation box will appear in front of you with all relevant details, simply confirm your appointment.</OptionDescription>
          </DonationOption>

          {/* New rows for step 4 and step 5 */}
          <DonationOption>
            <DonationImage src="/images/process4.jpg" alt="Screening" />
            <OptionTitle>Step 4: Screening</OptionTitle>
            <OptionDescription>On the day of your appointment, undergo a quick health screening to ensure your eligibility. This step helps ensure safe and high-quality donations.</OptionDescription>
          </DonationOption>
          <DonationOption>
            <DonationImage src="/images/process5.jpg" alt="Donate" />
            <OptionTitle>Step 5: Donate</OptionTitle>
            <OptionDescription>Relax as you donate. This brief process allows you to help those in need. Afterward, you’ll receive some refreshments as a thank-you for your invaluable gift.</OptionDescription>
          </DonationOption>

        </DonationOptionsContainer>
      </Section>

      <PostCareSection>
        <PostCareTitle>After You Donate</PostCareTitle>
        <PostCareContainer>
          <PostCareCard>
            <PostCareHeader>Right after</PostCareHeader>
            <PostCareDescription>
              It’s tempting to hurry over to the refreshments area to have your pick of the snacks, but take your time before you get up. It’s important that you rest for around 5 minutes in the donor chair.
            </PostCareDescription>
          </PostCareCard>
          <PostCareCard>
            <PostCareHeader>In the next 8 hours</PostCareHeader>
            <PostCareDescription>
              Drink plenty of fluids. Aim for 3 glasses of fluids in the first 3 hours. Take a seat when you can. Your body needs a bit of time to recover, so try to avoid spending too much time on your feet.
            </PostCareDescription>
          </PostCareCard>
          <PostCareCard>
            <PostCareHeader>For at least 12 hours</PostCareHeader>
            <PostCareDescription>
              Avoid strenuous exercise or hazardous activities. If unsure, please discuss your activities with a healthcare professional.
            </PostCareDescription>
          </PostCareCard>
        </PostCareContainer>
      </PostCareSection>
      {/* 
      <LastSection>
        <LastImageContainer>
          <LastImage src="/images/donor.jpg" alt="Stem Cell Donation" />
        </LastImageContainer>
        <LastContent>
          <ButtonContainer>
            <StyledButton onClick={() => navigate("/login")}>
              <ButtonIcon><FiHeart /></ButtonIcon>
              <ButtonText>Be a Donor</ButtonText>
              <ButtonDescription>Join us today →</ButtonDescription>
            </StyledButton>
            <StyledButton onClick={() => navigate('/check-eligibility')}>
              <ButtonIcon><FiUserCheck /></ButtonIcon>
              <ButtonText>Check Eligibility</ButtonText>
              <ButtonDescription>Find out if you qualify →</ButtonDescription>
            </StyledButton>
          </ButtonContainer>
        </LastContent>
      </LastSection> */}

      <LastSection>
        <ImageContainer>
          <SectionImage src="/images/donor.jpg" alt="Community Involvement" />
        </ImageContainer>
        <SectionContent>
          {/* <HelpTitle>Help and Support</HelpTitle> */}
          <HelpOptions>
            <HelpCard>
              <HelpIcon><FiHeart /></HelpIcon>
              <HelpText>Be a Donor</HelpText>
              <HelpDescription to="/login">Join us today →</HelpDescription>
            </HelpCard>
            <HelpCard>
              <HelpIcon><FiUserCheck /></HelpIcon>
              <HelpText>Check Eligibility</HelpText>
              <HelpDescription to="/check-eligibility">Find out if you qualify →</HelpDescription>
            </HelpCard>
          </HelpOptions>
        </SectionContent>
      </LastSection>
    </BloodDonationContainer>
  );
}

export default BloodDonation;
