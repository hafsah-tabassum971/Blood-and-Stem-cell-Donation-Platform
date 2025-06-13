import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icon


// Styled Components
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  font-family: Arial, sans-serif;
  padding: 20px;

  //   @media (max-width: 768px) {
  // align-items: unset;
  // }
`;

const AuthForm = styled.form`
  background-color: #eae1e1;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 15px;
    // max-width: 100%;
    box-sizing:border-box;

  }
`;

const Title = styled.h2`
  text-align: center;
  color: #b00000;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
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
`;

const Select = styled.select`
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

`;



const SubmitButton = styled.button`
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
    color: white;
    background-color: rgb(158, 25, 18);
    transform: scale(1.005);
  }
`;

const ToggleLink = styled.p`
  text-align: center;
  color: #b00000;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  accent-color: #b00000;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const PasswordToggleIcon = styled.span`
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 70%;
  transform: translateY(-50%);
`;

const FormFieldWithIcon = styled(FormField)`
  position: relative;
`;


const Register = () => {
  // State variables to hold user input data
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // State for holding validation errors for each field
  const [errors, setErrors] = useState({});

  // States to toggle password visibility for password and confirm password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hook from react-router-dom to navigate programmatically after registration
  const navigate = useNavigate();

  /**
   * validate - function to validate all form inputs before submission
   * Sets errors for each field if invalid and returns boolean for form validity
   */
  const validate = () => {
    const newErrors = {};

    // Email validation - must be lowercase letters only, numbers, and allowed symbols, with proper format
    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      newErrors.email = "Enter a valid email address using only lowercase letters";
    }

    // Password length validation (min 8 characters)
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password must match password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Required fields validation - Name, Gender, DOB, Address must not be empty
    if (!name.trim()) newErrors.name = "Name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!address.trim()) newErrors.address = "Address is required";

    // Contact number validation - optional, but if provided, must be exactly 11 digits
    if (contactNumber && !/^\d{11}$/.test(contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 11 digits (numbers only)";
    }

    // Terms and conditions checkbox must be checked
    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and policy";
    }

    // Set errors state for displaying on the form
    setErrors(newErrors);

    // Return true if no errors, false if any error
    return Object.keys(newErrors).length === 0;
  };

  /**
   * handleRegisterSubmit - async function to handle form submission
   * Validates inputs, sends registration data to backend, and handles success/errors
   */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log("Form submission started");

    // Validate form fields before sending data
    if (!validate()) {
      console.log("Validation failed. Errors:", errors);
      return; // Stop submission if validation fails
    }

    console.log("Validation successful. Proceeding with registration...");

    // Prepare the donor data object to send to the backend
    const donorData = {
      name,
      email,
      password,
      confirmPassword,
      gender,
      dateOfBirth,
      address,
      contactNumber,
    };

    try {
      // POST request to the backend registration endpoint using axios
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, donorData);

      console.log("Registration successful:", response.data);

      // Save the registered user information to localStorage for session persistence
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to donor dashboard/homepage on successful registration
      navigate("/donorhome");
    } catch (error) {
      // If the email is already registered, display a specific error message
      if (error.response?.data?.message === "Email already registered") {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Email is already registered" }));
      } else {
        // Generic API error message for other errors
        setErrors({ apiError: "Registration failed. Please try again." });
      }
    }
  };

  /**
   * handleConfirmPasswordChange - function to handle real-time validation for confirm password field
   * Clears confirmPassword error if passwords match as user types
   */
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    // Remove confirmPassword error if passwords match
    if (password === e.target.value) {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  };


  return (
    <AuthContainer>
      <AuthForm onSubmit={handleRegisterSubmit}>
        <Title>Create an Account</Title>

        <FormField>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="gender">Gender</Label>
          <Select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          {errors.dateOfBirth && <ErrorText>{errors.dateOfBirth}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              const newEmail = e.target.value;
              setEmail(newEmail);

              // Clear error message for email when the user starts typing a new email
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: newEmail ? "" : prevErrors.email,
              }));
            }} placeholder="Your Email"
            required
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </FormField>

        <FormFieldWithIcon>
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}  // Toggle password visibility
            id="password"
            value={password}
            // onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => {
              const newPassword = e.target.value;
              setPassword(newPassword);

              // Hide error message when the contact number reaches 11 digits
              if (newPassword.length === 8) {
                setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
              }
            }}

            placeholder="Your Password"
            required
          />
          <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggleIcon>
          {errors.password && <ErrorText>{errors.password}</ErrorText>}

        </FormFieldWithIcon>

        <FormFieldWithIcon>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
  type={showConfirmPassword ? "text" : "password"}  // ✅ Use the correct state variable
            id="confirmPassword"
            value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            onChange={handleConfirmPasswordChange}

            placeholder="Confirm Your Password"
            required
          />
          <PasswordToggleIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggleIcon>
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
        </FormFieldWithIcon>
        
        <FormField>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);

              // Clear custom error message when user starts typing
              e.target.setCustomValidity("");
            }}
            onInvalid={(e) => {
              if (!address.trim()) {
                e.target.setCustomValidity("Please fill out this field.");
              }
            }}
            placeholder="Your Address"
            required
          />
        </FormField>


        {/* <FormField>
          <Label htmlFor="contactNumber">Contact Number </Label>
          <Input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => {
              const newContactNumber = e.target.value;
              setContactNumber(newContactNumber);
        
              // Hide error message when the contact number reaches 11 digits
              if (newContactNumber.length === 11) {
                setErrors((prevErrors) => ({ ...prevErrors, contactNumber: "" }));
              }
            }}     
           placeholder="Your Contact Number"
          />
                    {errors.contactNumber && <ErrorText>{errors.contactNumber}</ErrorText>}

        </FormField> */}

        <FormField>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => {
              const newContactNumber = e.target.value;
              setContactNumber(newContactNumber);

              // Clear custom validity when user types
              e.target.setCustomValidity("");

              // Hide error message when the contact number reaches 11 digits
              if (newContactNumber.length === 11) {
                setErrors((prevErrors) => ({ ...prevErrors, contactNumber: "" }));
              }
            }}
            onInvalid={(e) => {
              if (!contactNumber) {
                e.target.setCustomValidity("Please fill out this field.");
              } else if (!/^\d{11}$/.test(contactNumber)) {
                e.target.setCustomValidity("Contact number must be an 11-digit number.");
              }
            }}
            placeholder="Your Contact Number"
            required
          />
          {errors.contactNumber && <ErrorText>{errors.contactNumber}</ErrorText>}
        </FormField>


        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="agreeToTerms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
          />
          <Label htmlFor="agreeToTerms">I agree to the terms and policy</Label>
        </CheckboxContainer>
        {errors.agreeToTerms && <ErrorText>{errors.agreeToTerms}</ErrorText>}

        {errors.apiError && <ErrorText>{errors.apiError}</ErrorText>}

        <SubmitButton type="submit">Register</SubmitButton>

        <ToggleLink onClick={() => navigate("/login")}>
          Already have an account? Login
        </ToggleLink>
      </AuthForm>
    </AuthContainer>
  );
};

export default Register;
