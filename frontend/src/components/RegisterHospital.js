import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  //     @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    padding: 15px;
    box-sizing:border-box;
  }

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #b00000;
  margin-bottom: 20px;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FormField = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SelectTime = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #b00000;
    outline: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-content: left;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  accent-color: #b00000;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  accent-color: #b00000;
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

const RegisterHospital = () => {
  // State variables for form inputs
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [donationType, setDonationType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState(""); // Contact Number input
  const [operationalDays, setOperationalDays] = useState(""); // Array of selected days
  const [operationalHours, setOperationalHours] = useState({
    openingTime: "",
    closingTime: "",
  }); // Object with opening and closing times
  const [slotDuration, setSlotDuration] = useState(""); // Duration of booking slots
  const [agreeToTerms, setAgreeToTerms] = useState(false); // Checkbox for terms agreement

  const [errors, setErrors] = useState({}); // Object to hold validation errors

  // State variables to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); // React Router's navigation hook

  // Validation function to check form input correctness
  const validate = () => {
    const newErrors = {};

    // Validate hospital name
    if (!hospitalName.trim())
      newErrors.hospitalName = "Hospital Name is required";

    // Validate hospital type selection
    if (!hospitalType) newErrors.hospitalType = "Hospital Type is required";

    // Validate donation type selection
    if (!donationType) newErrors.donationType = "Donation Type is required";

    // Email validation - only lowercase allowed and valid email format
    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      newErrors.email = "Enter a valid email address using only lowercase letters";
    }

    // Password minimum length validation
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    // Confirm password must match password
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    // Address must not be empty
    if (!address.trim()) newErrors.address = "Address is required";

    // Contact number validation: optional but if present must be exactly 11 digits
    if (contactNumber && !/^\d{11}$/.test(contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 11 digits (numbers only)";
    }

    // Operational days must be a non-empty array (multiple days can be selected)
    if (!Array.isArray(operationalDays) || operationalDays.length === 0)
      newErrors.operationalDays = "Please select operational days";

    // Operational hours must have both opening and closing times selected
    if (!operationalHours.openingTime || !operationalHours.closingTime)
      newErrors.operationalHours = "Operational hours are required";

    // Slot duration must be a positive number
    if (!slotDuration || isNaN(slotDuration) || slotDuration <= 0)
      newErrors.slotDuration = "Slot duration must be a positive number";

    // Terms and policy checkbox must be checked
    if (!agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms and policy";

    // Set errors state
    setErrors(newErrors);

    // Return true if no errors, else false
    return Object.keys(newErrors).length === 0;
  };

  // Generate dropdown options for time selection in 30-minute intervals from 1:00 AM to 12:30 PM and PM equivalent
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      times.push(`${hour}:00 AM`);
      times.push(`${hour}:30 AM`);
    }
    for (let hour = 1; hour <= 12; hour++) {
      times.push(`${hour}:00 PM`);
      times.push(`${hour}:30 PM`);
    }
    return times;
  };

  // Handle checkbox changes for selecting multiple operational days
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add day to array if checked
      setOperationalDays((prev) => [...prev, value]);
    } else {
      // Remove day from array if unchecked
      setOperationalDays((prev) => prev.filter((day) => day !== value));
    }
  };

  // Form submit handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Validate form, stop submit if invalid
    if (!validate()) return;

    // Construct hospital data object for API
    const hospitalData = {
      name: hospitalName,
      email,
      password,
      confirmPassword,
      address,
      contactNumber,
      hospitalType,
      donationType,
      operationalDays,
      operationalHours,
      slotDuration,
    };

    try {
      // Post data to backend endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register-hospital`,
        hospitalData
      );

      // Save the returned user object in localStorage (for session persistence)
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Registration successful:", response.data);

      // Navigate to hospital dashboard/homepage on successful registration
      navigate("/hospitalhome");
    } catch (error) {
      // Handle API errors gracefully

      if (error.response?.data?.message) {
        if (error.response.data.message.includes("Email already registered")) {
          // Specific error for duplicate email
          setErrors({
            email: "Email is already registered",
          });
        } else {
          // Other API errors
          setErrors({
            apiError: error.response.data.message,
          });
        }
      } else {
        // Fallback generic error
        setErrors({
          apiError: "An error occurred during registration. Please try again.",
        });
      }
    }
  };

  // Real-time validation for confirm password input
  // Clears confirm password error if passwords match
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    if (password === e.target.value) {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors; // Remove confirmPassword error
        return rest;
      });
    }
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleRegisterSubmit}>
        <Title>Create an Account</Title>

        {/* Hospital Name */}
        <FormField>
          <Label htmlFor="hospitalName">Hospital Name</Label>
          <Input
            type="text"
            id="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Hospital Name"
            required
          />
          {errors.hospitalName && <ErrorText>{errors.hospitalName}</ErrorText>}
        </FormField>

        {/* Hospital Type */}
        <FormField>
          <Label htmlFor="hospitalType">Hospital Type</Label>
          <Select
            id="hospitalType"
            value={hospitalType}
            onChange={(e) => setHospitalType(e.target.value)}
            required
          >
            <option value="">Select Hospital Type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Select>
          {errors.hospitalType && <ErrorText>{errors.hospitalType}</ErrorText>}
        </FormField>

        {/* Donation Type */}
        <FormField>
          <Label htmlFor="donationType">Donation Type</Label>
          <Select
            id="donationType"
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            required
          >
            <option value="">Select Donation Type</option>
            <option value="Blood Donation">Blood Donation</option>
            <option value="Stem Cell Donation">Stem Cell Donation</option>
            <option value="Both">Both</option>
          </Select>
          {errors.donationType && <ErrorText>{errors.donationType}</ErrorText>}
        </FormField>

        {/* Operational Days */}
        <FormField>
          <Label htmlFor="operationalDays">Operational Days</Label>
          <CheckboxContainer id="operationalDays">
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((day) => (
              <CheckboxLabel key={day}>
                <CheckboxInput
                  type="checkbox"
                  value={day}
                  checked={operationalDays.includes(day)}
                  onChange={handleCheckboxChange}
                />
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
          {errors.operationalDays && (
            <ErrorText>{errors.operationalDays}</ErrorText>
          )}
        </FormField>

        {/* Operational Hours */}
        <FormField>
          <Label>Operational Hours</Label>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 2 }}>
              <SelectTime
                id="openingTime"
                value={operationalHours.openingTime}
                onChange={(e) =>
                  setOperationalHours({
                    ...operationalHours,
                    openingTime: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Opening Time</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </SelectTime>
            </div>
            <div style={{ flex: 2 }}>
              <SelectTime
                id="closingTime"
                value={operationalHours.closingTime}
                onChange={(e) =>
                  setOperationalHours({
                    ...operationalHours,
                    closingTime: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Closing Time</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </SelectTime>
            </div>
          </div>
          {errors.operationalHours && (
            <ErrorText>{errors.operationalHours}</ErrorText>
          )}
        </FormField>

        {/* Slot Duration */}
        <FormField>
          <Label htmlFor="slotDuration">Slot Duration</Label>
          <Input
            type="number"
            id="slotDuration"
            value={slotDuration}
            onChange={(e) => setSlotDuration(e.target.value)}
            placeholder="Slot Duration"
            required
          />
          {errors.slotDuration && <ErrorText>{errors.slotDuration}</ErrorText>}
        </FormField>

        {/* Email */}
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

        {/* Password */}
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

        {/* Address */}
        <FormField>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Address"
            required
          />
          {errors.address && <ErrorText>{errors.address}</ErrorText>}
        </FormField>

        {/* Contact Number */}
        <FormField>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            type="text"
            id="contactNumber"
            value={contactNumber}
            // onChange={(e) => setContactNumber(e.target.value)}
            onChange={(e) => {
              const newcontactNumber = e.target.value;
              setContactNumber(newcontactNumber);

              // Hide error message when the contact number reaches 11 digits
              if (newcontactNumber.length === 11) {
                setErrors((prevErrors) => ({ ...prevErrors, contactNumber: "" }));
              }
            }}
            placeholder="Contact Number"
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
        <ToggleLink onClick={() => navigate("/loginHospital")}>
          Already have an account? Login
        </ToggleLink>
      </AuthForm>
    </AuthContainer>
  );
};

export default RegisterHospital;
