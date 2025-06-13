import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icon


// Styled Components
const LoginContainer = styled.div`
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

const LoginFormWrapper = styled.form`
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
    box-sizing:border-box;
  }
`;

const LoginTitle = styled.h2`
  text-align: center;
  color: #b00000;
  margin-bottom: 20px;
`;

const LoginFormField = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const LoginLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const LoginInput = styled.input`
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

const LoginButton = styled.button`
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

const LoginToggleLink = styled.p`
  text-align: center;
  color: #b00000;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 15px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SuccessText = styled.p`
  color: green;
  font-size: 16px;
  text-align: center;
  margin: 20px 20px;
`;

const ForgotPasswordLink = styled.p`
  text-align: center;
  color: #b00000;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 5px;
  }
`;

const ForgotPasswordFormWrapper = styled.form`
  background-color: #eae1e1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;


function LoginHospital() {
  // State variables for storing form inputs and messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");          // For backend or validation errors
  const [successMessage, setSuccessMessage] = useState("");      // For success notifications (e.g., forgot password)
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggles between login and forgot password form
  const [showPassword, setShowPassword] = useState(false);       // Controls password visibility toggle
  const [errors, setErrors] = useState({});                      // Stores frontend validation errors

  const navigate = useNavigate();        // Used for redirecting to other routes
  const location = useLocation();        // Used to monitor URL/location changes

  // Scroll to top whenever the page is loaded or route is changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handles forgot password form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form reload behavior

    try {
      // Sends POST request to hospital-specific forgot password route
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/hospital/forgot-password`, { email });

      // On success, show success message and reset state
      setSuccessMessage(data.message);
      setErrorMessage("");
      setEmail("");
    } catch (error) {
      // If error occurs, show relevant message
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setSuccessMessage("");
    }
  };

  // Validates login input fields (email and password)
  const validateLogin = () => {
    const newErrors = {};

    // Regex pattern: only lowercase email characters allowed
    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      newErrors.email = "Enter a valid email address using only lowercase letters";
    }

    // Check if password has minimum 8 characters
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handles login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading page

    if (!validateLogin()) return; // If validation fails, do not proceed

    try {
      // Sends login request to hospital login endpoint
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/login-hospital`, {
        email,
        password,
      });

      // Store token and hospital user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("hospital", JSON.stringify(data.user));

      // Navigate hospital user to hospital home dashboard
      navigate("/hospitalhome");
    } catch (error) {
      // Show error if login fails
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <LoginContainer>
      {isForgotPassword ? (
        <ForgotPasswordFormWrapper onSubmit={handleForgotPassword} >
          <LoginTitle>Forgot Password</LoginTitle>

          <LoginFormField>
            <LoginLabel htmlFor="email">Email</LoginLabel>
            <LoginInput
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(""); // Hide backend error message when user types
                setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Clear validation error if any
              }}

              placeholder="Your Email"
              required
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </LoginFormField>

          {successMessage && <SuccessText>{successMessage}</SuccessText>}

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}


          <LoginButton type="submit">Send Reset Password Link</LoginButton>
          <LoginToggleLink onClick={() => setIsForgotPassword(false)}>
            Back to Login
          </LoginToggleLink>
        </ForgotPasswordFormWrapper>
      ) : (
        <LoginFormWrapper onSubmit={handleLoginSubmit}>
          <LoginTitle>Login</LoginTitle>

          <LoginFormField>
            <LoginLabel htmlFor="email">Email</LoginLabel>
            <LoginInput
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(""); // Hide error message on new input
              }}
              placeholder="Your Email"
              required
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </LoginFormField>

          <LoginFormField>
            <LoginLabel htmlFor="password">Password</LoginLabel>
            <div style={{ position: "relative" }}>

              <LoginInput
                type={showPassword ? "text" : "password"}  // Toggle password visibility
                id="password"
                value={password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword);

                  // Hide error message when password length is valid
                  if (newPassword.length >= 8) {
                    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
                  }

                  setErrorMessage(""); // Hide backend error message on typing
                }}
                placeholder="Your Password"
                required
              /> <div
                style={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}  // Toggle password visibility on icon click
              > 
            
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            </div>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </LoginFormField>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

          <LoginButton type="submit">Login</LoginButton>
          <ForgotPasswordLink
            onClick={() => {
              setIsForgotPassword(true);
              setErrorMessage("");
              setErrors({});
              setPassword("");
            }}
          >
            Forgot Password?
          </ForgotPasswordLink>
          <LoginToggleLink onClick={() => navigate("/registerHospital")}>
            Don't have an account? Register
          </LoginToggleLink>
        </LoginFormWrapper>
      )}
    </LoginContainer>
  );
}

export default LoginHospital;