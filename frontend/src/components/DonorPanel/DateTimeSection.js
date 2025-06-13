import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const CalendarWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  text-align: left;
  width: 100%;
  h2 {
    color: #b00000;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;

  &:first-child {
    background-color: white;
    color: #b00000;
    border: solid #b00000;
  }
  &:last-child {
    background-color: #b00000;
    color: white;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(7, minmax(30px, 1fr));
    font-size: 0.7rem;
  }

  @media (max-width: 450px) {
    grid-template-columns: repeat(7, minmax(20px, 1fr));
    font-size: 0.5rem;
  }
`;

const StatusContainer = styled.div`
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  border: solid ${(props) => (props.available ? "#2e7d32" : "#b71c1c")};
  color: ${(props) => (props.available ? "#2e7d32" : "#b71c1c")};
  font-size: 0.9rem;
  text-transform: uppercase;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.3rem;
  }
      @media (max-width: 500px) {
    font-size: 0.2rem;
  }
`;

const DayBox = styled.div`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => (props.available ? "#e6e6e6" : "#e6e6e6")};

  &:hover {
    opacity: 0.9;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  & p:first-child {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & p:last-child {
    font-size: 0.9rem;
  }

   @media (max-width: 768px) {
    // padding: 0.4rem;
    font-size: 0.8rem;
  }
  //      @media (max-width: 400px) {
  //   // padding: 0.4rem;
  //   font-size: 0.8rem;
  //   width:25px
  //   margin: 0.1rem;
  // }
`;

const SlotDropdown = styled.select`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const InfoMessage = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #616161;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const DayName = styled.div`
  // font-size: 1.1rem;
  font-weight: bold;
  color: #b00000;
  border: solid #e6e6e6;
  text-transform: uppercase;
  text-align: center;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
`;

// Array of month names for display
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Main functional component
const DateTimeSection = ({ hospitalId, onNext, onBack, setAppointmentDate, setAppointmentTime }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availabilityData, setAvailabilityData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2025);


  // Fetch availability data based on hospitalId (passed from parent component)
  const fetchAvailability = async () => {
    if (!hospitalId) return; //Agar hospitalId nahi mili to API call na karein

    try {
      console.log("Fetching availability for:", hospitalId); // Debugging
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/availability`, {
        params: { hospitalId }, //Directly hospitalId pass karein
      });
      console.log("API Response:", response.data); // Debugging

      if (response.data.success) {
        setAvailabilityData(response.data.availability);
      }
    } catch (err) {
      console.error("Failed to fetch availability:", err.response ? err.response.data : err);
    }
  };

  // Fetch data when the component mounts or hospitalId changes
  useEffect(() => {
    console.log("Selected hospitalId:", hospitalId); // Debug log
    fetchAvailability();
  }, [hospitalId, currentMonth, currentYear]); //Dependency array ko hospitalId ke mutabiq update karein




  // Function to handle month changes
  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }
    } else if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    }
    setSelectedDate(null);
  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot("");
  };

  // Function to handle time slot selection
  const handleSlotSelect = (e) => {
    setSelectedSlot(e.target.value);
  };

  // Handle continue logic (move to next step and pass date/time to parent)
  const handleContinue = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select both date and time.");
      return;
    }
    // Pass date and time to parent component
    setAppointmentDate(selectedDate);
    setAppointmentTime(selectedSlot);
    onNext(); // Move to next step
  };

  // Function to render the calendar days for the current month
  const renderCalendarDays = () => {
    // Calculate the number of days in the current month
    // new Date(year, month + 1, 0) gives the last day of the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Create a string key for the current month in format YYYY-MM
    const monthKey = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}`; // E.g., "2025-06"

    // Array of day names to display as calendar headers
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Determine which day of the week the 1st day of the month falls on
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    // Create an array of null values to align the first day of the month correctly in the calendar grid
    const emptyDays = Array(firstDayOfMonth).fill(null); // E.g., if 1st is Thursday, add 4 empty slots


    return (
      <DateContainer>
        {dayNames.map((dayName) => (
          <DayName key={dayName}>{dayName}</DayName>
        ))}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          // Calculate the actual day number (1-based index)
          const day = index + 1;

          // Create a date key in format YYYY-MM-DD, e.g., "2025-06-05"
          const dateKey = `${monthKey}-${day.toString().padStart(2, "0")}`;

          // Get the availability info for the current date
          const availability = availabilityData[dateKey];

          return (
            <DayBox
              key={day}
              available={availability?.available} // Pass availability status to style the box accordingly
              onClick={() => availability?.available && handleDateSelect(dateKey)}
            >
              <p>{day}</p>

              {/* Show availability status (e.g., Free or N/A) inside the day box */}
              <StatusContainer available={availability?.available}>
                {availability?.available
                  ? ` Free`
                  : "N/A"}
              </StatusContainer>
            </DayBox>
          );
        })}
      </DateContainer>
    );
  };

  return (
    <Section>
      <h2>Select date and time</h2>
      <CalendarWrapper>
        <CalendarHeader>
          <Button onClick={() => handleMonthChange("prev")}>&lt;</Button>
          <h2>{months[currentMonth]} {currentYear}</h2>
          <Button onClick={() => handleMonthChange("next")}>&gt;</Button>
        </CalendarHeader>
        {renderCalendarDays()}
        {selectedDate && availabilityData[selectedDate]?.available && (
          <SlotDropdown onChange={handleSlotSelect} value={selectedSlot}>
            <option value="" disabled>Select a time slot</option>
            {/* {availabilityData[selectedDate].slots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))} */}
            {availabilityData[selectedDate].slots
              .filter(slot => slot.isAvailable) // Sirf available slots ko filter kar raha hai
              .map(slot => (
                <option key={slot._id} value={slot.time}>{slot.time}</option>
              ))}
          </SlotDropdown>
        )}
        {selectedDate && !availabilityData[selectedDate]?.available && (
          <InfoMessage>No slots available for the selected date.</InfoMessage>
        )}
        <ButtonsContainer>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={handleContinue} disabled={!selectedDate || !selectedSlot}>Continue</Button>
        </ButtonsContainer>
      </CalendarWrapper>
    </Section>
  );
};

export default DateTimeSection;

