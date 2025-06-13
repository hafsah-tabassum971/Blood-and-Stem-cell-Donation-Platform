import React, { useState, useEffect } from "react";
import axios from "axios";
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
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    display: none;
  }
  `;

const TableRow = styled.tr`
  &:hover {
    background-color: #f4f4f4;
  }
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }

`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
    @media (max-width: 768px) {
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

  @media (max-width: 450px) {
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
  //   margin-bottom: 30px;

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


const ViewDonors = () => {
  const [donors, setDonors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDonor, setCurrentDonor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ text: "", success: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state


  useEffect(() => {
    fetchDonors();
  }, []);

  // useEffect(() => {
  //   if (currentVolunteer) {
  //     const latestApp = currentVolunteer.volunteerApplications?.[currentVolunteer.volunteerApplications.length - 1];
  //     if (latestApp) {
  //       setCurrentVolunteer((prev) => ({
  //         ...prev,
  //         availability: latestApp.availability || "",
  //         experience: latestApp.experience || "",
  //         role: latestApp.volunteerRole || "",
  //         hospital: latestApp.drive?.hospital?.user?.name || "",
  //       }));
  //     }
  //   }
  // }, [currentVolunteer]);

  const fetchDonors = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-donors`, {
        withCredentials: true,
      });
      setDonors(response.data.donors);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
    setLoading(false);

  };

  const deleteDonor = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-donor/${id}`, {
        withCredentials: true,
      });
      console.log("Response from server:", data);
      setDonors(donors.filter((donor) => donor._id !== id));
      setMessage({ text: data.message || "Donor deleted successfully", success: true });
    } catch (error) {
      console.error("Error deleting donor:", error);
      setMessage({
        text: error.response?.data?.message || "An error occurred while deleting the donor",
        success: false
      });
    }
  };

  const editDonor = (donor) => {
    setCurrentDonor(donor);
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    setCurrentDonor({ ...currentDonor, [e.target.name]: e.target.value });
  };


  const updateDonor = async (e) => {
    e.preventDefault();

    console.log("Updating Donor:", currentDonor);

    if (!currentDonor || !currentDonor._id) {
      console.error("No donor selected for update.");
      return;
    }

    try {
      console.log(`Sending PUT request to: ${process.env.REACT_APP_BASE_URL}/edit-donor/${currentDonor._id}`);

      // const {data} = await axios.put(
      //     `http://localhost:8000/api/v1/edit-donor/${currentDonor._id}`,
      //     currentDonor,
      //     { withCredentials: true }
      // );

      const { _id, name, email, contactNumber, address } = currentDonor;

      const updatedDonorData = {
        name,
        email,
        contactNumber,
        address
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/edit-donor/${_id}`,
        updatedDonorData,
        { withCredentials: true }
      );


      console.log("Response from server:", data);

      setDonors(
        donors.map((donor) =>
          donor._id === currentDonor._id ? data.donor : donor
        )
      );

      setIsEditing(false);
      setCurrentDonor(null);

      setMessage({ text: data.message || "Donor updated successfully", success: true }); // Success message
      console.log("Donor updated successfully!");
    } catch (error) {
      console.error("Error updating donor:", error);
      console.error("Server Response:", error.response?.data);

      setMessage({
        text: error.response?.data?.message || "An error occurred while updating the donor",
        success: false
      });

    }
  };



  // const filteredDonors = donors.filter((donor) => {
  //   const searchLower = searchTerm.toLowerCase();
  //   return (
  //     donor.name.toLowerCase().includes(searchLower) ||
  //     donor.email.toLowerCase().includes(searchLower) ||
  //     donor.hospital.toLowerCase().includes(searchLower) ||
  //     donor.gender.toLowerCase().includes(searchLower) ||
  //     donor.contactNumber.toLowerCase().includes(searchLower) ||
  //     donor.address.toLowerCase().includes(searchLower) ||
  //     donor.isVolunteer.toLowerCase().includes(searchLower)
  //   );
  // });

  const filteredDonors = donors.map((donor) => {
    const hospitalName = donor.donations.length > 0
      ? donor.donations[0].hospital?.user?.name || "N/A"
      : "N/A";

    return { ...donor, hospital: hospitalName };
  }).filter((donor) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (donor.name?.toLowerCase() || '').includes(searchLower) ||
      (donor.email?.toLowerCase() || '').includes(searchLower) ||
      (donor.hospital?.toLowerCase() || '').includes(searchLower) ||
      (donor.gender?.toLowerCase() || '').includes(searchLower) ||
      (donor.contactNumber?.toLowerCase() || '').includes(searchLower) ||
      (donor.address?.toLowerCase() || '').includes(searchLower) ||
      // donor.isVolunteer is either true or false, so we convert it to "yes" or "no" safely
      (donor.isVolunteer ? "yes" : "no").toLowerCase().includes(searchLower)
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
        <p>Loading donors...</p>  // Display loading message
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>  // Display error message
      ) : isEditing ? (
        <FormContainer>
          {message.text && <Message success={message.success}>{message.text}</Message>}
          <FormField>
            <Label>Name</Label>
            <Input type="text" name="name" value={currentDonor.name || ""} onChange={handleFormChange} required />
          </FormField>

          <FormField>
            <Label>Hospital</Label>
            <Input
              type="text"
              name="hospital"
              value={currentDonor.hospital === "" ? "" : currentDonor.hospital || "N/A"}
              readOnly
            // onChange={handleFormChange} required 
            />
          </FormField>

          <FormField>
            <Label>Email</Label>
            <Input type="email" name="email" value={currentDonor.email || ""} onChange={handleFormChange} required />
          </FormField>

          <FormField>
            <Label>Contact Number</Label>
            <Input type="text" name="contactNumber" value={currentDonor.contactNumber === "" ? "" : currentDonor.contactNumber || "N/A"} onChange={handleFormChange} required />
          </FormField>

          <FormField>
            <Label>Address</Label>
            <Input type="text" name="address" value={currentDonor.address === "" ? "" : currentDonor.address || "N/A"} onChange={handleFormChange} required />
          </FormField>

          {/* <FormField>
            <Label>Volunteer Status</Label>
            <Select name="volunteerStatus" value={currentDonor.volunteerStatus || ""} onChange={handleFormChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select> 
          </FormField> */}


          <FormField>
            <Label>Volunteer Status</Label>
            <Input
              type="text"
              name="isVolunteer"
              value={currentDonor.isVolunteer ? "Yes" : "No"}
              readOnly
            />
          </FormField>

          <Button type="submit" onClick={updateDonor}>Update Donor</Button>
        </FormContainer>
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <TableCell as="th">Donor Name</TableCell>
              <TableCell as="th">Hospital</TableCell>
              <TableCell as="th">Gender</TableCell>
              <TableCell as="th">Email</TableCell>
              <TableCell as="th">Contact Number</TableCell>
              <TableCell as="th">Address</TableCell>
              <TableCell as="th">Volunteer Status</TableCell>
              <TableCell as="th">Actions</TableCell>
            </tr>
          </TableHeader>
          <tbody>
            {filteredDonors.map((donor) => (
              <TableRow key={donor._id}>
                <TableCell data-label="Donor Name">{donor.name}</TableCell>
                <TableCell data-label="Hospital">{donor.hospital || "N/A"}</TableCell>
                <TableCell data-label="Gender">{donor.gender}</TableCell>
                <TableCell data-label="Email">{donor.email}</TableCell>
                <TableCell data-label="Phone">{donor.contactNumber || "N/A"}</TableCell>
                <TableCell data-label="Address">{donor.address || "N/A"}</TableCell>
                {/* <TableCell data-label="Volunteer Status">{donor.isVolunteer}</TableCell> */}
                <TableCell data-label="Volunteer Status">{donor.isVolunteer ? "Yes" : "No"}</TableCell>
                <TableCell data-label="Actions">
                  <Button onClick={() => editDonor(donor)}>Edit</Button>
                  <Button onClick={() => deleteDonor(donor._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewDonors;