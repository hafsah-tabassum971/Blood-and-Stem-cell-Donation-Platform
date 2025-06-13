import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  // padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 60px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  @media (max-width: 1000px) {
    display: grid;
    border: 0;
  }
`;

const TableHeader = styled.thead`
  background-color: #b00000;
  color: white;
  padding: 10px;
  text-align: center;
  // font-size: 13px;
  @media (max-width: 1000px) {
    display: none;
  }
  `;

const TableRow = styled.tr`
  &:hover {
    background-color: #f4f4f4;
  }
      @media (max-width: 1000px) {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }

`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
   @media (max-width: 1000px) {
    display: block;
    text-align: left;
    padding-left: 50%;
    position: relative;
    border: none;

    &:before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      top: 10px;
      font-weight: bold;
      color: #333;
    }
  }
      @media (max-width: 650px) {
      font-size: 11px;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #b00000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: rgb(158, 25, 18);
  }
`;

const FilterInput = styled.input`
  // padding: 8px;
  // margin: 10px;
  //     margin-bottom: 30px;
  // border: 1px solid #ddd;
  // border-radius: 5px;
  // width: 200px;
  // font-size: 16px;
    padding: 8px;
  margin: 5px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FormContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Message = styled.p`
  color: ${(props) => (props.success ? "green" : "red")};
  font-weight: bold;
  margin-bottom: 30px;
`;

const FormField = styled.div`
  margin-bottom: 10px;
  margin-right: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;


function ManageHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHospital, setCurrentHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ text: "", success: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state



  useEffect(() => {
    fetchHospitals();
  }, []);


  const fetchHospitals = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-hospitals`, {
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      setHospitals(response.data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
    setLoading(false);

  };

  const deleteHospital = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-hospital/${id}`, {
        withCredentials: true,
      });
      console.log("Response from server:", data);
      setHospitals(hospitals.filter((hospital) => hospital._id !== id));
      setMessage({ text: data.message || "Hospital deleted successfully", success: true });
    } catch (error) {
      console.error("Error deleting hospital:", error);
      setMessage({
        text: error.response?.data?.message || "An error occurred while deleting the hospital",
        success: false
      });
    }
  };


  const editHospital = (hospital) => {
    console.log("Editing hospital:", hospital);

    setCurrentHospital({
      ...hospital,
      user: {
        name: hospital.user?.name || "",
        address: hospital.user?.address || "",
        contactNumber: hospital.user?.contactNumber || "",
        email: hospital.user?.email || "",
      },
      operationalHours: {
        openingTime: hospital.operationalHours?.openingTime || "",
        closingTime: hospital.operationalHours?.closingTime || "",
      },
    });

    setIsEditing(true);
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("user.")) {
      const field = name.split(".")[1]; // Extract 'name', 'address', etc.
      setCurrentHospital((prevHospital) => ({
        ...prevHospital,
        user: {
          ...(prevHospital.user || {}),
          [field]: value,
        },
      }));
    } else if (name.startsWith("operationalHours.")) {
      const field = name.split(".")[1]; // Extract 'openingTime' or 'closingTime'
      setCurrentHospital((prevHospital) => ({
        ...prevHospital,
        operationalHours: {
          ...(prevHospital.operationalHours || {}),
          [field]: value,
        },
      }));
    } else {
      setCurrentHospital({ ...currentHospital, [name]: value });
    }
  };



  const updateHospital = async (e) => {
    e.preventDefault();
    console.log("Updating Hospital:", currentHospital);

    if (!currentHospital || !currentHospital._id) {
      console.error("No hospital selected for update.");
      return;
    }

    try {
      const { _id, user, ...hospitalData } = currentHospital;

      const payload = {
        ...hospitalData,
        user: {
          name: user.name,
          address: user.address,
          contactNumber: user.contactNumber,
          email: user.email,
        }
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/edit-hospital/${_id}`,
        payload,
        { withCredentials: true }
      );

      console.log("Response from server:", data);

      await fetchHospitals(); // Fetch fresh data instead of manually updating state
      setIsEditing(false);
      setCurrentHospital(null);
      setMessage({ text: data.message || "Hospital updated successfully", success: true });
    } catch (error) {
      console.error("Error updating hospital:", error);
      setMessage({
        text: error.response?.data?.message || "An error occurred while updating the hospital",
        success: false,
      });
    }
  };



  const filteredHospitals = hospitals.filter((hospital) => {
    const searchLower = searchTerm.toLowerCase();

    // Check each property to ensure it exists before calling toLowerCase
    return (
      (hospital.user?.name?.toLowerCase() || '').includes(searchLower) ||
      (hospital.type?.toLowerCase() || '').includes(searchLower) ||
      (hospital.donationType?.toLowerCase() || '').includes(searchLower) ||
      (hospital.user?.address?.toLowerCase() || '').includes(searchLower) ||
      (hospital.user?.email?.toLowerCase() || '').includes(searchLower) ||
      (hospital.user?.contactNumber?.toLowerCase() || '').includes(searchLower)
    );
  });

  return (
    <Container>
      {!isEditing && (
        <div>
          <label>Search: </label>
          <FilterInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter here..."
          />
        </div>
      )}
      {loading ? (
        <p>Loading hospitals...</p>  // Display loading message
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>  // Display error message
      ) : isEditing ? (<FormContainer>
        <form onSubmit={updateHospital} style={{ width: "100%" }}>
          <FormField>
            <Label>Hospital Name</Label>
            <Input
              type="text"
              name="user.name"
              value={currentHospital.user?.name || ""}
              onChange={handleFormChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Hospital Type</Label>
            <Select
              name="type"
              value={currentHospital.type || ""}
              onChange={handleFormChange}
              required
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </Select>
          </FormField>
          <FormField>
            <Label>Donation Type</Label>
            <Select
              name="donationType"
              value={currentHospital.donationType || ""}
              onChange={handleFormChange}
              required
            >
              <option value="Blood Donation">Blood Donation</option>
              <option value="Stem Cell Donation">Stem Cell Donation</option>
              <option value="Both">Both</option>
            </Select>
          </FormField>
          <FormField>
            <Label>Operational Days</Label>
            <Input
              type="text"
              name="operationalDays"
              value={currentHospital.operationalDays || ""}
              onChange={handleFormChange}
              required
            />
          </FormField>
          {/* <FormField>
              <Label>Operational Hours</Label>
              <Input
                type="text"
                name="operationalHours"
                value={currentHospital.operationalHours || ""}
                onChange={handleFormChange}
                required
              />
            </FormField> */}
          <FormField>
            <Label>Opening Time</Label>
            <Input
              type="text"
              name="operationalHours.openingTime"
              value={currentHospital.operationalHours?.openingTime || ""}
              onChange={(e) =>
                setCurrentHospital({
                  ...currentHospital,
                  operationalHours: {
                    ...(currentHospital.operationalHours || {}),
                    openingTime: e.target.value,
                  },
                })
              }
              required
            />
          </FormField>

          <FormField>
            <Label>Closing Time</Label>
            <Input
              type="text"
              name="closingTime"
              value={currentHospital.operationalHours?.closingTime || ""}
              onChange={(e) =>
                setCurrentHospital({
                  ...currentHospital,
                  operationalHours: {
                    ...(currentHospital.operationalHours || {}),
                    closingTime: e.target.value,
                  },
                })
              }
              required
            />
          </FormField>


          <FormField>
            <Label>Slot Duration</Label>
            <Input
              type="text"
              name="slotDuration"
              value={currentHospital.slotDuration || ""}
              onChange={handleFormChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Address</Label>
            <Input
              type="text"
              name="user.address"
              value={currentHospital.user?.address || ""}
              onChange={handleFormChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Contact</Label>
            <Input
              type="text"
              name="user.contactNumber"
              value={currentHospital.user?.contactNumber || ""}
              onChange={handleFormChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Email</Label>
            <Input
              type="email"
              name="user.email"
              value={currentHospital.user?.email || ""}
              onChange={handleFormChange}
              required
            />
          </FormField>
          <Button type="submit">Update Hospital</Button>
        </form>
      </FormContainer>
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <th>Hospital Name</th>
              <th>Type</th>
              <th>Donation Type</th>
              <th>Operational Days</th>
              <th>Operational Hours</th>
              <th>Slot Duration</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </TableHeader>
          <tbody>
            {filteredHospitals.map((hospital) => (
              <TableRow key={hospital._id}>
                <TableData data-label="Hospital Name">{hospital.user?.name}</TableData>
                <TableData data-label="Type">{hospital.type ? hospital.type : "N/A"}</TableData>
                <TableData data-label="Donation Type">{hospital.donationType}</TableData>

                <TableData data-label="Operational Days">
                  {hospital.operationalDays?.length === 6 &&
                    hospital.operationalDays.includes("Monday") &&
                    hospital.operationalDays.includes("Tuesday") &&
                    hospital.operationalDays.includes("Wednesday") &&
                    hospital.operationalDays.includes("Thursday") &&
                    hospital.operationalDays.includes("Friday") &&
                    hospital.operationalDays.includes("Saturday")
                    ? "Monday to Saturday"
                    : hospital.operationalDays?.join(", ")}
                </TableData>

                <TableData data-label="Operational Hours">
                  {hospital.operationalHours
                    ? `${hospital.operationalHours.openingTime} - ${hospital.operationalHours.closingTime}`
                    : "N/A"}
                </TableData>

                <TableData data-label="Slot Duration">{hospital.slotDuration}</TableData>
                <TableData data-label="Address">{hospital.user?.address}</TableData>
                <TableData data-label="Contact Number">{hospital.user?.contactNumber || "N/A"}</TableData>
                <TableData data-label="Email">{hospital.user?.email || "N/A"}</TableData>

                <TableData data-label="Actions">
                  <Button onClick={() => editHospital(hospital)}>Edit</Button>
                  <Button onClick={() => deleteHospital(hospital._id)}>Delete</Button>
                </TableData>

              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ManageHospitals;

