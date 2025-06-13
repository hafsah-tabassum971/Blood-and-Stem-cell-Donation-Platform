import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 30px auto;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 30px auto;
   @media (max-width: 768px) {
    padding: 25px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  padding-left: 0px;
  display: flex;
  align-items: center;
  gap: 10px; /* Input aur text ke darmiyan gap */
  margin-bottom: 8px;

  input {
    padding-left: 0px;
    margin-left: 0px;
    width: 20px;
    height: 20px;
    accent-color: #b00000; /* Checkbox ka color */
    cursor: pointer;
  }

   @media (max-width: 480px) {
    font-size: 16px;
  }
`;


const Input = styled.input`
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 25px;
    @media (max-width: 480px) {
    padding: 8px;
  }
`;

const Button = styled.button`
  background: #b00000;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: rgb(158, 25, 18);
  }

    @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-weight: 500;
  color: ${(props) => (props.type === "success" ? "green" : "red")};
  background-color: ${(props) =>
    props.type === "success" ? "#eafae7" : "#fdecea"};
  border: 1px solid
    ${(props) => (props.type === "success" ? "#a2d5a2" : "#f5c2c7")};
  padding: 10px 16px;
  border-radius: 6px;
`;


const SlotManager = () => {
  const [yearWide, setYearWide] = useState(false);
  const [date, setDate] = useState("");
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  //RECENTLY ADDED
  const [weekWide, setWeekWide] = useState(false);
  const [monthWide, setMonthWide] = useState(false);
  const [startDate, setStartDate] = useState(""); // For weekly generation
  const [month, setMonth] = useState("");         // For monthly generation
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  const handleSubmit = async () => {


    //RECENTLY ADDED
    if (!yearWide && !weekWide && !monthWide && !date) {
      setMessage("Please select a date or option before submitting.");
      setMessageType("error");
      return;
    }

    if (weekWide && !startDate) {
      setMessage("Please select a start date for weekly slots.");
      setMessageType("error");
      return;
    }

    //RECENTLY ADDED
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-slots`, {
        yearWide,
        weekWide,
        monthWide,
        date: !yearWide && !weekWide && !monthWide ? date : undefined,
        startDate: weekWide ? startDate : undefined,
        month: monthWide ? Number(month) : undefined,
        year: yearWide || monthWide ? year : undefined,
      });

      console.log("Response from API:", response.data);
      setMessage(response.data.message || "Slots added successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
      setMessageType("error");
    }
  };

  return (
    <Container>
      <Card>

        {/* RECENTLY ADDED */}
        <Label>
          <input
            type="checkbox"
            checked={weekWide}
            onChange={(e) => {
              setWeekWide(e.target.checked);
              if (e.target.checked) {
                setYearWide(false);
                setMonthWide(false);
              }
            }}
          />
          Generate slots for a week
        </Label>

        <Label>
          <input
            type="checkbox"
            checked={monthWide}
            onChange={(e) => {
              setMonthWide(e.target.checked);
              if (e.target.checked) {
                setYearWide(false);
                setWeekWide(false);
              }
            }}
          />
          Generate slots for a month
        </Label>

        <Label>
          <input
            type="checkbox"
            checked={yearWide}
            onChange={(e) => {
              setYearWide(e.target.checked);
              if (e.target.checked) {
                setMonthWide(false);
                setWeekWide(false);
              }
            }} />
          Generate slots for the whole year
        </Label>

        {/* RECENTLY ADDED */}
        {!yearWide && !weekWide && !monthWide && (
          <>
            <Label>Select Date:</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </>
        )}

        {weekWide && (
          <>
            <Label>Select Week Start Date:</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </>
        )}

        {monthWide && (
          <>
            <Label>Enter Month (1-12):</Label>
            <Input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </>
        )}

        {(yearWide || monthWide) && (
          <>
            <Label>Enter Year:</Label>
            <Input
              type="number"
              value={year}
              min={new Date().getFullYear()}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </>
        )}


        {/* RECENTLY ADDED */}
        <Button onClick={handleSubmit} disabled={!yearWide && !weekWide && !monthWide && !date}>
          Add Slots
        </Button>

        {/* {message && <p>{message}</p>} */}
        {message && <Message type={messageType}>{message}</Message>}

      </Card>
    </Container>
  );
};

export default SlotManager;