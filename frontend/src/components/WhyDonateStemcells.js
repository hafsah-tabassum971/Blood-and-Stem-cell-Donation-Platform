import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FaHeart,
  FaHandHoldingHeart,
  FaCalendarCheck,
  FaFlask,
  FaSyringe,
  FaUserMd,
  FaBone,
} from "react-icons/fa";

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
  background-image: url("/images/whys.jpg");
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
  background-color: #eae1e1;
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
`;

// Real Life Stories Section
const RealLifeStorySection = styled.div`
  margin-top: 40px;
  background-color: white;
  padding: 40px 20px;
  border-radius: 10px;
`;

const StoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Center the items */
    gap: 10px; /* Reduce gap between text and image */
  }
`;

const StoryText = styled.div`
  flex: 1;
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center; /* Center the text for smaller screens */
  }
`;

const StoryImage = styled.img`
  flex: 1;
  max-width: 50%;
  height: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 100%; /* Adjust image width for smaller screens */
    margin-top: 20px; /* Add some space above the image */
  }
`;

const StoryTitle = styled.h3`
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 20px;
  color: #b00000;

  @media (max-width: 768px) {
    text-align: left; /* Center title for smaller screens */
    font-size: 1.8rem; /* Reduce font size */
  }
`;

const StoryDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem; /* Reduce font size */
    text-align: left; /* Center text on smaller screens */
  }
`;



// How Stem Cell Donation Helps Section Component
function HowStemCellDonationHelps() {

      useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  return (
    <ImpactSection>
      <ImpactCard>
        <ImpactIcon>
          <FaFlask />
        </ImpactIcon>
        <ImpactTitle>Cancer Treatment</ImpactTitle>
        <ImpactText>
          Stem cell donations play a crucial role in treating cancers like
          leukemia, where patients need bone marrow transplants to survive. Your
          donation could provide the cells needed to help regenerate healthy
          blood cells.
        </ImpactText>
      </ImpactCard>
      <ImpactCard>
        <ImpactIcon>
          <FaSyringe />
        </ImpactIcon>
        <ImpactTitle>Regenerative Medicine</ImpactTitle>
        <ImpactText>
          Stem cells are used in regenerative therapies to repair damaged
          tissues and organs. Your donation can help treat conditions like heart
          disease and spinal cord injuries.
        </ImpactText>
      </ImpactCard>
      <ImpactCard>
        <ImpactIcon>
          <FaUserMd />
        </ImpactIcon>
        <ImpactTitle>Genetic Disorders</ImpactTitle>
        <ImpactText>
          For patients suffering from genetic disorders like sickle cell anemia,
          stem cell transplants can provide a life-saving cure. Your donation
          can change the course of their lives.
        </ImpactText>
      </ImpactCard>
      <ImpactCard>
        <ImpactIcon>
          <FaBone />
        </ImpactIcon>
        <ImpactTitle>Bone Marrow Failure</ImpactTitle>
        <ImpactText>
          Stem cells are essential for patients with bone marrow failure, where
          their bone marrow is no longer producing enough healthy cells. Your
          donation could restore normal blood cell production.
        </ImpactText>
      </ImpactCard>
    </ImpactSection>
  );
}

function RealLifeStories() {
  return (
    <RealLifeStorySection>
      <StoryContainer>
        <StoryText>
          <StoryTitle>The Story of Ahmed from Karachi</StoryTitle>
          <StoryDescription>
            Ahmed, a young man from Karachi, was diagnosed with leukemia at the
            age of 26. After months of chemotherapy, his doctors suggested a
            stem cell transplant as his only hope for survival. Luckily, a donor
            match was found, and Ahmed received a successful stem cell
            transplant that saved his life. Today, he is healthy and thriving,
            thanks to the generosity of stem cell donors like you. Ahmed's story
            is a testament to the power of stem cell donation in giving people a
            second chance at life.
          </StoryDescription>
        </StoryText>
        <StoryImage src="/images/story.jpg" alt="Ahmed from Karachi" />
      </StoryContainer>
    </RealLifeStorySection>
  );
}

// Main Component
function WhyDonateStemcells() {
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
          <HeroTitle>Be a Lifesaver: Donate Stem Cells Today</HeroTitle>
          <HeroDescription>
            Stem cell donation is one of the most impactful ways to help save
            lives. Whether it’s treating cancer, genetic disorders, or helping
            regenerate tissues, your donation can make a world of difference.
          </HeroDescription>
          <HeroButton onClick={handleDonateNow}>
            <FaHeart style={{ marginRight: "10px" }} /> Donate Now
          </HeroButton>
        </HeroContent>
      </HeroSection>

      {/* Detailed Content Section */}
      <DetailedContentWrapper>
        <TextBlock>
          <TextBlockTitle>
            <FaHandHoldingHeart style={{ marginRight: "10px" }} />
            Why Donate Stem Cells?
          </TextBlockTitle>
          <TextBlockDescription>
            Stem cell donation is crucial for treating life-threatening
            conditions like leukemia, lymphoma, and certain genetic disorders.
            It’s also used in groundbreaking therapies for tissue regeneration
            and bone marrow failure. By donating stem cells, you provide hope
            for patients battling serious illnesses.
          </TextBlockDescription>
        </TextBlock>

        <TextBlock>
          <TextBlockTitle>
            <FaCalendarCheck style={{ marginRight: "10px" }} />
            The Impact of Stem Cell Donation
          </TextBlockTitle>
          <TextBlockDescription>
            Your stem cell donation can help regenerate healthy blood cells for
            cancer patients, aid in bone marrow transplants, and even support
            the development of regenerative therapies. This selfless act can
            literally save lives and improve the quality of life for many
            patients.
          </TextBlockDescription>
        </TextBlock>

        {/* How Stem Cell Donation Helps Section */}
        <HowStemCellDonationHelps />

        {/* Real Life Stories Section */}
        <RealLifeStories />

        {/* Call to Action */}
        <CallToAction>
          <CallToActionTitle>Ready to Make a Difference?</CallToActionTitle>
          <CallToActionText>
            Join us in saving lives by donating stem cells. Your donation can
            change the future for people with life-threatening conditions.
            Together, let’s make a powerful impact!
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

export default WhyDonateStemcells;
