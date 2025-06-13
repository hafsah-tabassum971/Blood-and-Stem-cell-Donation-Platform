import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DonationBasicsContainer = styled.div`
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
    background-image: url('/images/istockphoto-1415405974-612x612.jpg'); /* Set image as background on small screens */
    background-size: cover;  /* Ensures the image covers the entire background */
  background-position: center;  /* Centers the image */
  background-repeat: no-repeat;  /* Prevents the image from repeating */
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

const DonateButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  background-color: #b00000;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: rgb(158, 25, 18);
    transform: scale(1.05);
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  height: 100%;

    @media (max-width: 768px) {
    display: none; /* Hide the image on small screens */
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;


// Steps Section Styles
const StepsSection = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  margin-top: 40px;
`;

// Step List Styles
const StepList = styled.ul`
  list-style: none;
  padding: 0;
  flex: 2;

  @media (max-width: 768px) {
    padding-left: 20px; /* Add padding for the bullets */
  }
`;

const StepsTitle = styled.h2`
  font-size: 36px;
  color: #b00000;
  margin-bottom: 40px;
`;

// Step Item Styles
const StepItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: row;
    text-align: left;
    display: list-item; /* Ensure the item behaves like a list item */
    padding-left: 20px; /* Indentation for bullets */
    list-style-type: square; /* Apply bullet points */
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background-color: #b00000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;

  @media (max-width: 768px) {
    display: none; /* Hide the step number on small screens */
  }
`;

const StepContent = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.6;
`;


// Common Concerns Section Styles
const ConcernsSection = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  text-align: left;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  max-width: 100%;
  margin: 10px auto;
`;

const ConcernContentContainer = styled.div`
  flex: 2;
`;

const ConcernsTitle = styled.h2`
  font-size: 36px;
  color: #b00000;
  margin-bottom: 40px;
`;

const ConcernsContent = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 40px;
  margin-top: 50px;
`;

const TipsTitle = styled.h3`
  font-size: 28px;
  color: #b00000;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TipsList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;

    @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Tip = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 180px;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

    @media (max-width: 768px) {
    max-width: 90px;
  }
`;

const TipIcon = styled.div`
  font-size: 40px;
  color: #b00000;
  margin-bottom: 10px;
`;

const TipText = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const TipDescription = styled.p`
  font-size: 14px;
  color: #666;
    text-align: left;

`;

const LearnMoreLink = styled.a`
  display: inline-block;
  margin-top: 40px;
  font-size: 18px;
  color: #b00000;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #b00000;
  border-radius: 30px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #b00000;
    color: #fff;
  }
`;

// Additional Styled Component for Recovery Concerns Section
const RecoverySection = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  text-align: left;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const RecoveryContentContainer = styled.div`
  flex: 2;
`;

const RecoveryTitle = styled.h2`
  font-size: 36px;
  color: #b00000;
  margin-bottom: 40px;
`;

const RecoveryContent = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 40px;
  margin-top: 50px;
`;

function DonationBasics() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Function to handle Donate Now button click
  const handleDonateNow = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <DonationBasicsContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Save Lives with Every Donation</HeroTitle>
          <HeroDescription>
            Whether through blood or stem cell donation, your contribution makes
            a powerful difference. Join us in supporting patients and families
            who rely on donations for hope and healing.
          </HeroDescription>
          <DonateButton onClick={handleDonateNow}>Donate Now</DonateButton>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage
            src="/images/istockphoto-1415405974-612x612.jpg"
            alt="Nurse holding tablet"
          />
        </HeroImageContainer>
      </HeroSection>

      {/* Steps Section */}
      <StepsSection>
        <StepList>
          <StepsTitle>How do I donate?</StepsTitle>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepContent>
              Register yourself. Check your eligibility and be ready to donate.
            </StepContent>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepContent>
              Choose the donation type that best suits you and make a life-saving
              difference!
            </StepContent>
          </StepItem>
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepContent>
              Find a donor centre. You can give life close to home — it’s simple
              to find a centre that suits you.
            </StepContent>
          </StepItem>
          <StepItem>
            <StepNumber>4</StepNumber>
            <StepContent>
              Book a donation. Get ready to start calling yourself a ‘life-saver’!
              Find a time and day that works for you.
            </StepContent>
          </StepItem>
        </StepList>
      </StepsSection>

      {/* Common Concerns Section */}
      <ConcernsSection>
        <ConcernContentContainer>
          <ConcernsTitle>Concerned About Health Impact?</ConcernsTitle>
          <ConcernsContent>
            <span
            // style={{ color: "#b00000", fontWeight: "bold", fontSize: "20px" }}
            >
              Many people wonder if donating blood or stem cells could affect
              their health. Rest assured, your body quickly replenishes what you donate, and
              safety measures ensure the process is low-risk.
            </span>

          </ConcernsContent>

          <TipsTitle>Try These Helpful Tips:</TipsTitle>
          <TipsList>
            <Tip>
              <TipIcon>💪</TipIcon>
              <TipText>Take Pride</TipText>
              <TipDescription>
                Focus on the lives you’re saving and the positive impact of your
                donation.
              </TipDescription>
            </Tip>
            <Tip>
              <TipIcon>📖</TipIcon>
              <TipText>Get Informed</TipText>
              <TipDescription>
                Learn about the donation process to feel confident and prepared.
              </TipDescription>
            </Tip>
            <Tip>
              <TipIcon>🎧</TipIcon>
              <TipText>Stay Relaxed</TipText>
              <TipDescription>
                Bring a book, music, or something relaxing for your appointment.
              </TipDescription>
            </Tip>
            <Tip>
              <TipIcon>🕒</TipIcon>
              <TipText>Plan Ahead</TipText>
              <TipDescription>
                Make sure to schedule your appointment at a convenient time for
                you.
              </TipDescription>
            </Tip>
          </TipsList>

        </ConcernContentContainer>
      </ConcernsSection>

      {/* Recovery Concerns Section */}
      <RecoverySection>
        <RecoveryContentContainer>
          <RecoveryTitle>Concerned About Time and Recovery?</RecoveryTitle>
          <RecoveryContent>
            <span
            // style={{ color: "#b00000", fontWeight: "bold", fontSize: "20px" }}
            >
              Many people wonder how long it takes to recover from a donation. Most people feel normal after a short rest, and recovery varies for
              blood and stem cell donors.
            </span>

          </RecoveryContent>

          <TipsTitle>Helpful Recovery Tips:</TipsTitle>
          <TipsList>
            <Tip>
              <TipIcon>⏳</TipIcon>
              <TipText>Rest Well</TipText>
              <TipDescription>
                Take time to relax after your donation.
              </TipDescription>
            </Tip>
            <Tip>
              <TipIcon>💧</TipIcon>
              <TipText>Stay Hydrated</TipText>
              <TipDescription>
                Drink plenty of water before and after donating.
              </TipDescription>
            </Tip>
            <Tip>
              <TipIcon>🥗</TipIcon>
              <TipText>Eat Healthy</TipText>
              <TipDescription>
                Consume a nutritious meal to aid recovery.
              </TipDescription>
            </Tip>
            <Tip>
              <TipIcon>🛏️</TipIcon>
              <TipText>Sleep Well</TipText>
              <TipDescription>
                Get a good night's sleep to help your body recover.
              </TipDescription>
            </Tip>
          </TipsList>

          <LearnMoreLink
            href="/check-eligibility"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More About Eligibility Requirements
          </LearnMoreLink>
        </RecoveryContentContainer>

      </RecoverySection>

    </DonationBasicsContainer>
  );
}

export default DonationBasics;
