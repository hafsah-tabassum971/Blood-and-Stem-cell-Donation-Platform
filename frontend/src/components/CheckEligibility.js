import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUserCheck, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link for routing


const EligibilityCheckContainer = styled.div`
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
    background-image: url('/images/eli.jpg');
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

  // margin-bottom: 10px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #b00000;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
  
`;

const QuestionBox = styled.div`
  margin-bottom: 2rem;

`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: ${(props) => (props.variant === 'yes' ? '#4caf50' : '#f44336')};
  width: 300px;
  margin: 10px;
  // margin-left: 0px;


  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%; // Full width for small screens
    padding: 0.8rem 1.6rem; // Adjust padding for better fitting
    font-size: 1rem; // Adjust font size
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: left; // Center buttons on smaller screens
  gap: 2rem;
  // flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column; // Stack buttons vertically on small screens
    gap: 1rem; // Adjust gap between buttons
  }
`;


const ResultMessage = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const ResultTitle = styled.h2`
  color: #b00000;
  font-size: 2rem;
`;

const StartQuizButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: #b00000;
  margin-top: 20px;
  width: 500px;

  &:hover {
    background-color: rgb(158, 25, 18);
    transform: scale(1.05);

  }
      @media (max-width: 768px) {
  width: 380px;

  }
`;

const MiddleContentSection = styled.div`
  margin-bottom: 2rem;
`;

const MiddleTitle = styled.h2`
  font-size: 1.5rem;
  color: #b00000;
  margin-bottom: 1rem;
`;

const MiddleDescription = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
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
    background-image: url("/images/eli2.jpg");
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
function CheckEligibility() {
  // State to track the current quiz question step
  const [step, setStep] = useState(1);
  
  // State to determine if user is eligible or not
  const [isEligible, setIsEligible] = useState(true);

  // State to track whether the quiz has started
  const [quizStarted, setQuizStarted] = useState(false);

  // State to track which quiz type is active: 'blood' or 'stemCell'
  const [quizType, setQuizType] = useState(null);

  // State to track if the quiz button has already been clicked (to hide it after starting)
  const [isQuizButtonClicked, setIsQuizButtonClicked] = useState({
    blood: false,
    stemCell: false,
  });

  const navigate = useNavigate();

  // Questions for the blood donation quiz
  const bloodDonationQuestions = [
    "Are you at least 18 years old?",
    "Are you in good general health?",
    "Do you weigh at least 50kg?",
    "Have you not donated in the last 3 months?",
    "Are you free of transmissible diseases?",
    "Have you not recently gotten a tattoo or piercing?"
  ];

  // Questions for the stem cell donation quiz
  const stemCellDonationQuestions = [
    "Are you between 18 and 44 years old?",
    "Are you in good general health?",
    "Have you not donated in the last 3 months?",
    "Are you willing to undergo HLA testing?",
    "Are you free of chronic illnesses like diabetes or hypertension?",
    "Can you commit to the donation process if selected?",
  ];

  // Select current set of questions based on quiz type
  const questions = quizType === "blood" ? bloodDonationQuestions : stemCellDonationQuestions;

  // Get the current question to display
  const currentQuestion = questions[step - 1];

  // Function to start the quiz for a selected donation type
  const startEligibilityQuiz = (type) => {
    setQuizType(type);
    setQuizStarted(true);
    setStep(1); // Reset to first question
    setIsQuizButtonClicked((prevState) => ({
      ...prevState,
      [type]: true, // Hide the quiz start button once clicked
    }));
  };

  // When user answers "Yes", go to the next question or show result if it's the last one
  const handleYes = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setIsEligible(true); // All answers were "Yes"
      setStep(questions.length + 1); // Proceed to result
    }
  };

  // When user answers "No", mark as ineligible and proceed to result
  const handleNo = () => {
    setIsEligible(false);
    setStep(questions.length + 1);
  };

  const location = useLocation();

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // const startQuiz = (type) => {
  //   setQuizType(type);
  //   setQuizStarted(true);
  //   setStep(1); // Reset step to the first question when starting the quiz
  //   setIsQuizButtonClicked((prevState) => ({
  //     ...prevState,
  //     [type]: true, // Mark the quiz button as clicked for the respective type
  //   }));
  // };

  return (
    <EligibilityCheckContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Check Your Eligibility to Donate</HeroTitle>
          <HeroDescription>
            Wondering if you're eligible to donate blood or stem cells? Answer a few simple questions to find out. Your donation can save lives, and we want to ensure that you're ready to help. It's quick, easy, and your contribution can make all the difference.
          </HeroDescription>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage src="/images/eli.jpg" alt="Nurse holding tablet" />
        </HeroImageContainer>
      </HeroSection>

      <Section>
        <Title>Eligibility for Blood and Stem Cell Donation</Title>
        <Description>
          Blood and stem cell donation is a noble act of kindness that can save lives. However, there are certain criteria to ensure both the donor's and recipient's safety. By understanding the requirements before you donate, you help maintain a healthy and effective donation process.
        </Description>

        <MiddleContentSection>
          <MiddleTitle>Basic Eligibility Criteria for Blood Donation</MiddleTitle>
          <MiddleDescription>
            <ul>
              <li>Be at least 18 years old (up to 60 years old for first-time donors; for regular donors, the age limit may extend beyond 60 depending on health and doctor's approval).</li>
              <li>Be in good general health and feeling well on the day of donation (no cold, flu, or fever symptoms, and not on medication that could affect donation).</li>
              <li>Weigh at least 50 kg (110 lbs). Weighing less than this may cause a drop in blood pressure during donation and put the donor's health at risk.</li>
              <li>Not have donated blood in the last 3 months (or 56 days for whole blood donations) to allow the body adequate time to replenish red blood cells and iron levels.</li>
              <li>Be free of transmissible diseases (e.g., HIV, Hepatitis B/C, syphilis, etc.) and have no history of any blood-borne infections. Donors are typically screened for such conditions prior to donation.</li>
              <li>Not have recently gotten a tattoo, piercing, or undergone major surgery (within the last 6 months). These activities can increase the risk of infection or affect blood quality.</li>
            </ul>
          </MiddleDescription>

          {/* Conditionally render the Start Quiz button based on whether it has been clicked */}
          {!isQuizButtonClicked.blood && (
            <ButtonGroup>
              <StartQuizButton onClick={() => startEligibilityQuiz("blood")}>
                Start Blood Donation Quiz
              </StartQuizButton>

            </ButtonGroup>
          )}
        </MiddleContentSection>

        {/* Blood Donation Quiz Section */}
        {quizStarted && quizType === "blood" && (
          <Section>
            {/* <Title>Blood Donation Quiz</Title> */}
            <QuestionBox>
              <p>{currentQuestion}</p>
            </QuestionBox>

            {/* Render buttons only if the quiz is not completed*/}
            {step <= bloodDonationQuestions.length && (
              <ButtonGroup>
                <Button onClick={handleYes} variant="yes">Yes</Button>
                <Button onClick={handleNo} variant="no">No</Button>
              </ButtonGroup>
            )}

            {step > bloodDonationQuestions.length && (
              <ResultMessage>
                <ResultTitle>
                  {isEligible ? "You are eligible to donate!" : "You are not eligible to donate."}
                </ResultTitle>
              </ResultMessage>
            )}
          </Section>
        )}
      </Section>

      <Section>
        <MiddleContentSection>
          <MiddleTitle>Basic Eligibility Criteria for Stem Cell Donation</MiddleTitle>
          <MiddleDescription>
            <ul>
              <li>Be between 18 and 44 years old (for initial registration). The age range ensures a higher likelihood of successful stem cell collection and donation, as younger donors generally have healthier stem cells).</li>
              <li>Be in general good health. Donors should not have conditions that might compromise the donation process or the health of the recipient, such as active infections or weakened immune systems.</li>
              <li>Not have donated in the last 6 months. This waiting period allows the body to recover from any previous donation, ensuring that the donor is in optimal health for the next donation process.</li>
              <li>Undergo HLA testing and be a match with a patient in need. The Human Leukocyte Antigen (HLA) test is used to determine genetic compatibility with a patient who needs a stem cell transplant. Donors must be a match for the process to proceed.</li>
              <li>Be free of chronic illnesses like diabetes or hypertension. These conditions can interfere with the donation process or post-donation recovery, so donors must be in good, stable health with no long-term medical conditions.</li>
              <li>Commit to the process, including possible travel and recovery time. Stem cell donation can take several hours, and the process may require the donor to travel for collection at a specialized center. Recovery may take some time, and donors should be prepared for potential follow-up appointments.</li>
              <li>Understand and consent to the detailed stem cell donation procedure. Donors should be fully aware of the steps involved, including potential side effects, recovery times, and the fact that stem cell collection may be done through peripheral blood collection or bone marrow aspiration, depending on the method used for donation.</li>
            </ul>
          </MiddleDescription>

          {/* Conditionally render the Start Quiz button based on whether it has been clicked */}
          {!isQuizButtonClicked.stemCell && (
            <ButtonGroup>
              <StartQuizButton onClick={() => startEligibilityQuiz("stemCell")}>
                Start Stem Cell Donation Quiz
              </StartQuizButton>
            </ButtonGroup>
          )}
        </MiddleContentSection>

        {/* Stem Cell Donation Quiz Section */}
        {quizStarted && quizType === "stemCell" && (
          <Section>
            {/* <Title>Stem Cell Donation Quiz</Title> */}
            <QuestionBox>
              <p>{currentQuestion}</p>
            </QuestionBox>

            {/* Render buttons only if the quiz is not completed */}
            {step <= stemCellDonationQuestions.length && (
              <ButtonGroup>
                <Button onClick={handleYes} variant="yes">Yes</Button>
                <Button onClick={handleNo} variant="no">No</Button>
              </ButtonGroup>
            )}

            {step > stemCellDonationQuestions.length && (
              <ResultMessage>
                <ResultTitle>
                  {isEligible ? "You are eligible to donate!" : "You are not eligible to donate."}
                </ResultTitle>
              </ResultMessage>
            )}
          </Section>
        )}
      </Section>

      {/* Other sections like Help and Support */}
      <LastSection>
        <ImageContainer>
          <SectionImage src="/images/eli2.jpg" alt="Community Involvement" />
        </ImageContainer>
        <SectionContent>
          <HelpOptions>
            <HelpCard>
              <HelpIcon><FiUserCheck /></HelpIcon>
              <HelpText>Ready to Register?</HelpText>
              <HelpDescription to="/login">Join us now →</HelpDescription>
            </HelpCard>
            <HelpCard>
              <HelpIcon><FiHelpCircle /></HelpIcon>
              <HelpText>More on Eligibility</HelpText>
              <HelpDescription to="/faqs">Read FAQS →</HelpDescription>
            </HelpCard>
          </HelpOptions>
        </SectionContent>
      </LastSection>
    </EligibilityCheckContainer>
  );
}

export default CheckEligibility;
