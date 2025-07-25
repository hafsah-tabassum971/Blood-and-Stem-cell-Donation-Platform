import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import styled from "styled-components";
import { FaTint, FaDna } from "react-icons/fa";

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
  width: 100%;
  height: 90vh;
  margin-bottom: 40px;
  background-color: #eae1e1;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    background-image: url('/images/Donorpanel img/types&compatibility.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4); /* Black overlay with 40% opacity */
      z-index: 1;
    }
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding: 40px;
  text-align: left;
  color: #333;
  position: relative;
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
    text-align: left;
    color: white;
  }
`;

const HeroDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: left;
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

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #b00000;
  margin-bottom: 30px;
  margin-top: 70px;
  text-align: left;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: left;
  margin-left: 10px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #777;
  text-align: left;
  margin-bottom: 50px;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  margin-left: 10px;
  }
`;

const Section = styled.div`
  margin-bottom: 60px;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InfoBox = styled.div`
  background-color: #ffffff;
  padding: 30px;
  min-height: 350px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const IconCircle = styled.div`
  background-color: #b00000;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-size: 2.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #b00000;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;

const PopulationText = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #888;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;

const TypesandCompatibility = () => {
  const bloodTypes = [
    {
      type: "O+",
      population: "38%",
      description:
        "O+ blood is the most common and highly versatile, making it the go-to blood type for many transfusions. It can be given to anyone with positive blood types and is in constant demand across hospitals.",
    },
    {
      type: "O-",
      population: "7%",
      description:
        "O- blood is rare and is the universal donor type for red blood cells. It can be given to any patient, regardless of their blood type, making it incredibly valuable in emergencies.",
    },
    {
      type: "A+",
      population: "32%",
      description:
        "A+ is one of the most common blood types and is crucial for transfusions. It can donate to other A+ and AB+ individuals and is often needed for surgeries and medical treatments.",
    },
    {
      type: "A-",
      population: "6%",
      description:
        "A- blood is rare and highly valued, as it can donate to both A- and AB- blood types. Its importance lies in its ability to serve patients with specific needs, like those requiring organ transplants.",
    },
    {
      type: "B+",
      population: "9%",
      description:
        "B+ blood is less common but still critical for those in need of transfusions. It can be given to anyone with B+ or AB+ blood types.",
    },
    {
      type: "B-",
      population: "2%",
      description:
        "B- blood is rare and highly sought after for its compatibility with both B- and AB- blood types. It's used less frequently but is essential in the right circumstances.",
    },
    {
      type: "AB+",
      population: "3%",
      description:
        "AB+ blood is known as the universal plasma donor. While rare, AB+ donors are critical for plasma transfusions, which are crucial in treating burn victims and patients undergoing cancer treatments.",
    },
    {
      type: "AB-",
      population: "1%",
      description:
        "AB- is the rarest blood type, but it’s incredibly important for its compatibility with other blood types in specific medical scenarios. Only a small portion of the population can donate AB- blood.",
    },
  ];

  const stemCellTypes = [
    {
      type: "Autologous",
      description:
        "Autologous stem cell donation uses a patient's own stem cells, which reduces the risk of rejection. This is commonly used in patients undergoing cancer treatments such as chemotherapy.",
    },
    {
      type: "Allogeneic",
      description:
        "Allogeneic stem cell donation involves using stem cells from a donor. This could be a sibling, a parent, or an unrelated person with matching genetic markers. It's often used for treating blood disorders like leukemia.",
    },
    {
      type: "Syngeneic",
      description:
        "Syngeneic stem cell donation occurs between identical twins. The genetic match eliminates the risk of rejection, making it a reliable form of treatment for certain types of blood cancer.",
    },
    {
      type: "Cord Blood",
      description:
        "Cord blood stem cells, collected from the umbilical cord after birth, are rich in hematopoietic stem cells. These cells are used for patients in need of a stem cell transplant, especially for pediatric cancers.",
    },
  ];
  const location = useLocation();


      useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Become a Lifesaver: Donate Blood & Stem Cells</HeroTitle>
          <HeroDescription>
            Donating blood and stem cells can save lives and offer hope to those
            in need. Learn about the different blood types and stem cell
            donation options that can make a significant difference in someone's
            life.
          </HeroDescription>
        </HeroContent>

        <HeroImageContainer>
          <HeroImage
            src="/images/Donorpanel img/types&compatibility.jpg"
            alt="Healthcare professionals and donation"
          />
        </HeroImageContainer>
      </HeroSection>

      <Title>Blood Types & Compatibility</Title>
      <Description>
        Every blood type has unique characteristics and compatibility with other
        blood types. Understanding these helps ensure safe and effective
        transfusions.
      </Description>

      <Section>
        <InfoSection>
          {bloodTypes.map((blood, index) => (
            <InfoBox key={index}>
              <IconCircle>
                <FaTint />
              </IconCircle>
              <CardTitle>Blood type: {blood.type}</CardTitle>
              <PopulationText>
                % of population: {blood.population}
              </PopulationText>
              <CardDescription>{blood.description}</CardDescription>
            </InfoBox>
          ))}
        </InfoSection>
      </Section>

      <Section>
        <Title>Stem Cell Types & Compatibility</Title>
        <Description>
          Stem cell donation is categorized by the source of the cells and the
          compatibility between donor and recipient. Each type has its unique
          role in medical treatments.
        </Description>

        <InfoSection>
          {stemCellTypes.map((stemCell, index) => (
            <InfoBox key={index}>
              <IconCircle>
                <FaDna />
              </IconCircle>
              <CardTitle>{stemCell.type}</CardTitle>
              <CardDescription>{stemCell.description}</CardDescription>
            </InfoBox>
          ))}
        </InfoSection>
      </Section>
    </Container>
  );
};

export default TypesandCompatibility;
