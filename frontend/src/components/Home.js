import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomeContainer = styled.div`
  padding-top: 20px;
  max-width: 100%;
  margin: auto;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  padding-left: 0px;
  padding-right: 0px;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 90vh; /* Full viewport height */
  background-image: url("/images/Blood-Donation-Saves-Lives.jpg"); /* Background image */
  background-size: cover; /* Cover the entire area */
  object-fit: cover;
  background-position: center;
  border-radius: 10px;
  color: white;
  text-align: left;
  margin-bottom: 40px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    text-align: center;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  z-index: 1;
`;

const HeroText = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px 40px; /* Adds padding for left alignment */
  // max-width: 600px; /* Optional: Limit width for better readability */
  text-align: left;
      padding: 20px;


  @media (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
    text-align: left;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeroDescription = styled.p`
  font-size: 28px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    font-size: 18px;
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

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
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
  font-size: 26px;
  padding-bottom: 10px;
  text-align: center;
`;

const DonationOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 15px;
  }
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
    // max-width: 90%;
    margin-bottom: 20px;
  }
`;

const DonationImage = styled.img.attrs({
  loading: "lazy", // This enables lazy loading for all images
})`  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const OptionTitle = styled.h3`
  font-size: 20px;
  color: #b00000;
  margin-top: 10px;
  margin-bottom: 10px;

  transition: color 0.3s;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const OptionDescription = styled.p`
  font-size: 16px;
  color: #666;
  padding: 0 10px;
  margin-top: 5px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 14px;
    text-align: left;
    margin-bottom: auto;
  }
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

function Home() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle Donate Now button click
  const handleDonateNow = () => {
    navigate("/login");
  };

  return (
    <HomeContainer>
      <HeroSection>
        <Overlay />
        <HeroText>
          <HeroTitle>Make a Difference with Your Donation
          </HeroTitle>
          <HeroDescription>
            Your donation can save lives and help those in need.
            Whether it's
            blood or stem cells, your contribution makes a significant impact.
            Step forward and join us in our mission to support patients and families in critical
            situations.
          </HeroDescription>
          <DonateButton onClick={handleDonateNow}>Donate Now</DonateButton>{" "}
          {/* Attach the click handler */}
        </HeroText>
      </HeroSection>

      <Section>
        <Title>Ways You Can Make a Difference</Title>
        <DonationOptionsContainer>
          <DonationOption>
            <DonationImage
              src="/images/istockphoto-1415405974-612x612.jpg"
              alt="Blood donation"
            />
            <OptionTitle>Donate Blood</OptionTitle>
            <OptionDescription>
              Blood donations are vital for surgeries, trauma care, and medical
              treatments. Every donation can help save up to three lives. Join
              our community of heroes and give the gift of life today!
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => (window.location.href = "/blood-donation")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>
          <DonationOption>
            <DonationImage
              src="/images/istockphoto-1437141702-612x612.jpg"
              alt="stemcell-donation"
            />
            <OptionTitle>Donate Stem Cells</OptionTitle>
            <OptionDescription>
              Stem cell donation provides hope to patients suffering from blood
              disorders and certain types of cancer. Your stem cells could be
              the match that saves a life. Join our mission to help those in
              need!
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => (window.location.href = "/stemcell-donation")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>
          <DonationOption>
            <DonationImage
              src="/images/istockphoto-1625310710-612x612.jpg"
              alt="Apply as a Volunteer"
            />
            <OptionTitle>Apply as a Volunteer</OptionTitle>
            <OptionDescription>
              As a volunteer, you play a crucial role in supporting patients and
              families. Join a passionate team dedicated to blood and stem cell
              donation awareness, healthcare excellence, and community impact.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => (window.location.href = "/JoinOurTeam")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>
        </DonationOptionsContainer>
      </Section>

      <Section>
        <Title>Learn Before Donating</Title>
        <DonationOptionsContainer>
          <DonationOption>
            <DonationImage
              src="/images/istockphoto-1279523857-612x612.jpg"
              alt="Donation Process"
            />
            <OptionTitle>Donation Process</OptionTitle>
            <OptionDescription>
              Understanding the donation process is crucial to making a safe and
              impactful contribution. The donation process involves several
              important steps to ensure both your safety and the recipient's
              well-being.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => (window.location.href = "/donation-basics")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          <DonationOption>
            <DonationImage
              src="/images/tc1.jpg"
              alt="Types and Compatibility"
            />
            <OptionTitle>Types and Compatibility</OptionTitle>
            <OptionDescription>
              Donating blood and stem cells can save lives and offer hope to
              those in need. Learn about the different blood types and stem cell
              donation options that can make a significant difference in
              someone's life.{" "}
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() =>
                (window.location.href = "/types-and-compatibility")
              }
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>

          <DonationOption>
            <DonationImage
              src="/images/istockphoto-494852296-612x612.jpg"
              alt="FAQs"
            />
            <OptionTitle>FAQs</OptionTitle>
            <OptionDescription>
              Have questions? We have answers. Our Frequently Asked Questions
              section has all the answers you need. Learn about the donation
              process, eligibility, and how your donation can help save lives.
            </OptionDescription>
            <ExploreMoreContainer
              onClick={() => (window.location.href = "/faqs")}
            >
              <ExploreMore>Explore More</ExploreMore>
              <Arrow>→</Arrow>
            </ExploreMoreContainer>
          </DonationOption>
        </DonationOptionsContainer>
      </Section>
    </HomeContainer>
  );
}

export default Home;
