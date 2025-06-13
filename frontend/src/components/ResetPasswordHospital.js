import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icon


const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  font-family: Arial, sans-serif;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ResetPasswordFormWrapper = styled.form`
  background-color: #eae1e1;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 500px) {
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const ResetPasswordTitle = styled.h2`
  text-align: center;
  color: #b00000;
  margin-bottom: 20px;
`;

const ResetPasswordFormField = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ResetPasswordLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const ResetPasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #b00000;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const ResetPasswordButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #b00000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: rgb(158, 25, 18);
    transform: scale(1.005);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 70%;
  transform: translateY(-50%);
  cursor: pointer;
`;

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const token = location.pathname.split("/").pop();
    if (!token) {
      setErrorMessage("Invalid or missing reset token.");
      return;
    }

    try {
      await axios.put(`h${process.env.REACT_APP_BASE_URL}/hospital/reset-password/${token}`, {
        password: newPassword,
        confirmPassword,
      });

      alert("Password has been reset successfully.");
      navigate("/loginHospital");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <ResetPasswordContainer>
      <ResetPasswordFormWrapper onSubmit={handleResetPassword}>
        <ResetPasswordTitle>Reset Password</ResetPasswordTitle>
        <ResetPasswordFormField>
          <ResetPasswordLabel>New Password</ResetPasswordLabel>
          <div style={{ position: "relative" }}>

            <ResetPasswordInput
              type={isPasswordVisible ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <IconWrapper onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </IconWrapper>
          </div>
        </ResetPasswordFormField>
        <ResetPasswordFormField>
          <ResetPasswordLabel>Confirm Password</ResetPasswordLabel>
          <div style={{ position: "relative" }}>

            <ResetPasswordInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <IconWrapper onClick={toggleConfirmPasswordVisibility}>
              {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </IconWrapper>
          </div>
        </ResetPasswordFormField>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <ResetPasswordButton type="submit">Reset Password</ResetPasswordButton>
      </ResetPasswordFormWrapper>
    </ResetPasswordContainer>
  );
}

export default ResetPassword;
