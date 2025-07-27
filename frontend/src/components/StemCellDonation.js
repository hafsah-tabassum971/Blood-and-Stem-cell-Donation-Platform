import React, { useEffect } from "react";
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate for navigation
import { FiUserCheck, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link for routing



const StemCellDonationContainer = styled.div`
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
    background-image: url('/images/sd.jpg');
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

const DonationImage = styled.img.attrs({
  loading: 'lazy',
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

const PostCareSection = styled.section`
  margin-bottom: 40px;
  padding: 30px;
  // background-color: #f0f0f0;
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
  // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
    background-image: url("/images/donor1.jpg");
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


const SectionImage = styled.img.attrs({
  loading: 'lazy',
})`

height: 500px;
  width: 50vw;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;


function StemCellDonation() {
  const navigate = useNavigate(); // Initialize navigate inside the function
    const location = useLocation();
  
      useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

  return (
    <StemCellDonationContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Transform Lives: Donate Stem Cells</HeroTitle>
          <HeroDescription>
            Your stem cell donation can provide hope to those battling life-threatening illnesses. By becoming a donor, you give patients a chance at recovery and a brighter future. Join us in this vital mission and help make a difference in someone’s life today.
          </HeroDescription>

        </HeroContent>

        <HeroImageContainer>
          <HeroImage src="/images/sd.jpg" alt="Nurse holding tablet" />
        </HeroImageContainer>
      </HeroSection>

      <Section>
        <Title>Stem Cell Donation Process</Title>
        <DonationOptionsContainer>
          <DonationOption>
            <DonationImage src="/images/process1.jpg" alt="Registration" />
            <OptionTitle>Step 1: Registration</OptionTitle>
            <OptionDescription>Register to express interest in stem cell donation and answer initial questions. This initial registration begins your journey toward being a potential match for a patient in need.</OptionDescription>
          </DonationOption>
          <DonationOption>
            <DonationImage src="/images/process2.jpg" alt="Choose Hospital" />
            <OptionTitle>Step 2: Choose Hospital</OptionTitle>
            <OptionDescription>Choose a nearby hospital where you’d like to undergo HLA testing, which matches your stem cell type with potential recipients.</OptionDescription>
          </DonationOption>
          <DonationOption>
            <DonationImage src="/images/process6.jpg" alt="Book Appointment" />
            <OptionTitle>Step 3: Book HLA Appointment</OptionTitle>
            <OptionDescription>Book an appointment for HLA testing, which will determine your compatibility with patients awaiting a stem cell match. You’ll be notified of the results.</OptionDescription>
          </DonationOption>
          {/* Fourth card */}
          <DonationOption >
            <DonationImage src="/images/processs7.jpg" alt="HLA Results" />
            <OptionTitle>Step 4: Wait for HLA Test Result</OptionTitle>
            <OptionDescription>Wait for the results to check compatibility. If matched, you’ll receive notifications to move forward with the stem cell donation.</OptionDescription>
          </DonationOption>
          {/* Fifth card */}
          <DonationOption >
            <DonationImage src="/images/process8.jpg" alt="Stem Cell Donation" />
            <OptionTitle>Step 5: Donate Stem Cells</OptionTitle>
            <OptionDescription>If matched, complete your stem cell donation by scheduling an appointment. Your stem cells could save the life of a patient battling critical illness.</OptionDescription>
          </DonationOption>
        </DonationOptionsContainer>
      </Section>

      {/* Post Care Section */}
      <PostCareSection>
        <PostCareTitle>After You Donate</PostCareTitle>
        <PostCareContainer>
          <PostCareCard>
            <PostCareHeader>Right after donation</PostCareHeader>
            <PostCareDescription>
              It’s important to rest and hydrate immediately after your stem cell donation. You will be monitored for any immediate reactions, and a healthcare professional will ensure you’re feeling well before leaving.
            </PostCareDescription>
          </PostCareCard>
          <PostCareCard>
            <PostCareHeader>In the next 8 hours</PostCareHeader>
            <PostCareDescription>
              Drink plenty of fluids to replenish your body. Aim for at least 3 glasses in the first few hours. Avoid any heavy physical activity and rest whenever you can. If you feel light-headed or unwell, contact the healthcare team.
            </PostCareDescription>
          </PostCareCard>
          <PostCareCard>
            <PostCareHeader>For at least 12 hours</PostCareHeader>
            <PostCareDescription>
              Refrain from strenuous physical activities, including lifting heavy objects, running, or any vigorous exercise. If you feel uncertain about your post-donation activities, please consult with your healthcare provider.
            </PostCareDescription>
          </PostCareCard>
        </PostCareContainer>
      </PostCareSection>

      <LastSection>
        <ImageContainer>
          <SectionImage src="/images/donor1.jpg" alt="Community Involvement" />
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

    </StemCellDonationContainer>
  )
}

export default StemCellDonation