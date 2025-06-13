import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // Import axios for API calls
axios.defaults.withCredentials = true;

const Section = styled.div`
  text-align: left;
  
  h2 {
    color: #b00000; /* Dark Red */
     @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p{
 margin-top: 20px;
  margin-bottom: 20px;
 @media (max-width: 768px) {
      font-size: 0.9rem;
    }
       @media (max-width: 500px) {
      font-size: 0.7rem;
    }
  }
`;

const Question = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
  
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: #f0f0f0;
    border: 2px solid #b00000;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease, border 0.3s ease;
    
    @media (max-width: 768px) {
      width: 15px;
      height: 15px;
    }
      @media (max-width: 530px) {
      width: 12px;
      height: 12px;
    }
  }

  input[type="checkbox"]:checked {
    background-color: #8b0000;
    border-color: #8b0000;
  }

  input[type="checkbox"]:checked::after {
    content: "✓";
    color: white;
    position: absolute;
    top: 0;
    left: 4px;
    font-size: 14px;
     @media (max-width: 768px) {
    font-size: 10px;
    }
         @media (max-width: 530px) {
    font-size: 6px;
    }
  }

  label {
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
        @media (max-width: 500px) {
      font-size: 0.6rem;
    }
              @media (max-width: 400px) {
      font-size: 0.4rem;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;

  &:last-child {
    background-color: #b00000;
    color: white;
    margin-left: auto;
  }
     @media (max-width: 400px) {
    font-size: 0.7rem;
    padding: 10px 20px;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 16px;
   @media (max-width: 768px) {
    font-size: 0.9rem;
  }
       @media (max-width: 500px) {
    font-size: 0.7rem;
  }
           @media (max-width: 400px) {
    font-size: 0.5rem;
  }
`;

const FaqLink = styled.a`
  color: #b00000;
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;
  display: inline-block;
   @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const EligibilitySection = ({ onNext }) => {
  const [answers, setAnswers] = useState({
    unwell: false,
    weight: false,
    heartCondition: false,
    operation: false,
    antibiotics: false,
    pregnant: false,
    preExistingDisease: false,
    patientOfMigrane: false,
    none: false,
  });

  const [ineligibleMessages, setIneligibleMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message
  const [eligibilityStatus, setEligibilityStatus] = useState("");

  const faqUrl = "/faqs";

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Update the checkbox state
    setAnswers((prevAnswers) => {
      let updatedAnswers;

      if (name === "none" && checked) {
        // If "None of the above" is selected, deselect all other checkboxes and clear all messages
        updatedAnswers = { none: true };
        setIneligibleMessages([]); // Clear all messages when "None" is selected
      }
      else {
        // Update the specific checkbox and ensure "None" is deselected if others are selected
        updatedAnswers = {
          ...prevAnswers,
          [name]: checked,
          ...(name !== "none" && { none: false }), // Deselect "None" if any other checkbox is selected
        };


        // Hide the response if the checkbox is unchecked

        if (!checked) {

          // Filter out the specific message when the checkbox is unchecked
          setIneligibleMessages((prevMessages) => {
            // Each checkbox has a specific message filter
            switch (name) {
              case "unwell":
                return prevMessages.filter((message) => !message.toLowerCase().includes("unwell"));
              case "weight":
                return prevMessages.filter((message) => !message.toLowerCase().includes("weigh less"));
              case "heartCondition":
                return prevMessages.filter((message) => !message.toLowerCase().includes("heart condition"));
              case "operation":
                return prevMessages.filter((message) => !message.toLowerCase().includes("operation"));
              case "antibiotics":
                return prevMessages.filter((message) => !message.toLowerCase().includes("antibiotics"));
              case "pregnant":
                return prevMessages.filter((message) => !message.toLowerCase().includes("pregnant"));
              case "preExistingDisease":
                return prevMessages.filter((message) => !message.toLowerCase().includes("pre-existing"));
                 case "patientOfMigrane":
                return prevMessages.filter((message) => !message.toLowerCase().includes("patientOfMigrane"));
              default:
                return prevMessages;
            }
          });
        }
      }

      // Validate "None of the above" selection rule
      if (
        updatedAnswers.none &&
        Object.keys(updatedAnswers).some((key) => key !== "none" && updatedAnswers[key])
      ) {
        setErrorMessage("You cannot select 'None of the above' along with other options.");
      } else {
        setErrorMessage(""); // Clear error message
      }

      return updatedAnswers;
    });
  };



  const handleContinue = async () => {
    const isNoneSelected = answers.none;
    const otherOptionsSelected = Object.keys(answers).some((key) => key !== "none" && answers[key]);

    if (isNoneSelected && otherOptionsSelected) {
      setErrorMessage("You cannot select 'None of the above' along with other options.");
      return;
    }

    const selectedAnswers = Object.keys(answers)
      .filter((key) => answers[key] && key !== "none")
      .concat(isNoneSelected ? ["none"] : []);

    if (selectedAnswers.length === 0) {
      setErrorMessage("Please select at least one option to continue.");
      return;
    } else {
      setErrorMessage(""); // Clear error message

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/check-eligibility`,
          { answers: selectedAnswers },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          if (isNoneSelected) {
            setEligibilityStatus("Eligible");
            onNext("Eligible"); // Proceed if "None" is checked
          } else {
            setEligibilityStatus("Ineligible");
            alert("You are ineligible to donate.");
          }
        } else {
          setErrorMessage(response.data.message);
          if (response.data.reasons) {
            // Dynamically add messages for specific reasons
            setIneligibleMessages(response.data.reasons);
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage("Ineligibility detected");
            if (error.response.data.reasons) {
              setIneligibleMessages(error.response.data.reasons);
            }
          } else {
            setErrorMessage("An error occurred, please try again.");
          }
        } else {
          setErrorMessage("Network error, please try again.");
        }
        console.error("An error occurred:", error.message);
      }

    }
  };

  return (
    <Section>
      <h2>Check Your Eligibility</h2>
      <p>To protect the people who receive donated blood and the donors who give it, we ask questions before you can donate. Answer the questions to determine your eligibility to donate.</p>
      <form>
        <hr />
        <Question>
          <input
            type="checkbox"
            name="unwell"
            checked={answers.unwell}
            onChange={handleCheckboxChange}
          />
          <label>Have you been unwell in any way lately?</label>
        </Question>
        <Question>
          <input
            type="checkbox"
            name="weight"
            checked={answers.weight}
            onChange={handleCheckboxChange}
          />
          <label>Do you weigh less than 50kg?</label>
        </Question>
        <Question>
          <input
            type="checkbox"
            name="heartCondition"
            checked={answers.heartCondition}
            onChange={handleCheckboxChange}
          />
          <label>Do you have a serious heart condition?</label>
        </Question>
        <Question>
          <input
            type="checkbox"
            name="operation"
            checked={answers.operation}
            onChange={handleCheckboxChange}
          />
          <label>Have you had an operation in the last 6 months?</label>
        </Question>
        <Question>
          <input
            type="checkbox"
            name="antibiotics"
            checked={answers.antibiotics}
            onChange={handleCheckboxChange}
          />
          <label>Are you taking antibiotics?</label>
        </Question>
        <Question>
          <input
            type="checkbox"
            name="pregnant"
            checked={answers.pregnant}
            onChange={handleCheckboxChange}
          />
          <label>Are you pregnant, or have you been pregnant in the last 9 months?</label>
        </Question>
        <Question>
          <input
            type="checkbox"
            name="preExistingDisease"
            checked={answers.preExistingDisease}
            onChange={handleCheckboxChange}
          />
          <label>Do you have any serious pre-existing or current diseases like asthma, diabetes, cancer, or others?</label>
        </Question>

         <Question>
          <input
            type="checkbox"
            name="patientOfMigrane"
            checked={answers.patientOfMigrane}
            onChange={handleCheckboxChange}
          />
          <label>Are you a patient Of Migrane?</label>
        </Question>
        
        <Question>
          <input
            type="checkbox"
            name="none"
            checked={answers.none}
            onChange={handleCheckboxChange}
          />
          <label>None of the above apply to me</label>
        </Question>
      </form>

      {errorMessage && <Message>{errorMessage}</Message>}

      {ineligibleMessages.length > 0 && (
        <div>
          {ineligibleMessages.map((message, index) => (
            <Message key={index}>
              {message}
              <FaqLink href={faqUrl} target="_blank">Learn more in our FAQs</FaqLink>
            </Message>
          ))}
        </div>
      )}

      <ButtonsContainer>
        <Button onClick={handleContinue}>Continue</Button>
      </ButtonsContainer>
    </Section>
  );
};

export default EligibilitySection;


