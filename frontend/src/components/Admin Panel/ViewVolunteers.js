import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
                  value={currentVolunteer.experience || ""}
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
  margin: 30px 0;

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

const ViewVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVolunteer, setCurrentVolunteer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ text: "", success: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    fetchVolunteers();
  }, []);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", success: false });
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [message]);

  const fetchVolunteers = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-volunteers`, {
        withCredentials: true,
      });
      setVolunteers(data.volunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
    setLoading(false);

  };

  const deleteVolunteer = async (id) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/remove-volunteer-status/${id}`, {
        withCredentials: true,
      });
      setVolunteers(volunteers.filter((v) => v._id !== id));
      setMessage({ text: data.message || "Volunteer status removed", success: true });
    } catch (error) {
      console.error("Error removing volunteer:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to remove volunteer status",
        success: false,
      });
    }
  };


  const editVolunteer = (volunteer) => {
    const latestApp = volunteer.volunteerApplications?.[volunteer.volunteerApplications.length - 1];

    setCurrentVolunteer({
      ...volunteer,
      role: latestApp?.volunteerRole || '',
      experience: latestApp?.experience || '',
      availability: latestApp?.availability?.slice(0, 10) || '',
      hospital: latestApp?.drive?.hospital?.user?.name || '',
    });


    setIsEditing(true);
  };


  const handleFormChange = (e) => {
    setCurrentVolunteer({ ...currentVolunteer, [e.target.name]: e.target.value });
  };

  const updateVolunteer = async (e) => {
    e.preventDefault();

    if (!currentVolunteer || !currentVolunteer._id) {
      return;
    }

    const { _id, name, email, contactNumber, availability, role, experience } = currentVolunteer;

    const updatedData = { name, email, contactNumber, availability, role, experience };

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/edit-volunteer/${_id}`,
        updatedData,
        { withCredentials: true }
      );

      setVolunteers(
        volunteers.map((vol) => (vol._id === _id ? data.volunteer : vol))
      );
      setMessage({ text: data.message || "Volunteer updated successfully", success: true });
      setIsEditing(false);
      setCurrentVolunteer(null);
    } catch (error) {
      console.error("Update error:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to update volunteer",
        success: false,
      });
    }
  };

  const filteredVolunteers = volunteers.filter((v) => {
    const search = searchTerm.toLowerCase();
    return (
      (v.name?.toLowerCase() || '').includes(search) ||
      (v.email?.toLowerCase() || '').includes(search) ||
      (v.hospital?.toLowerCase() || '').includes(search) ||
      (v.contactNumber?.toLowerCase() || '').includes(search) ||
      (v.availability?.toLowerCase() || '').includes(search) ||
      (v.role?.toLowerCase() || '').includes(search) ||
      (v.experience?.toLowerCase() || '').includes(search)
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

      {message.text && <Message success={message.success}>{message.text}</Message>}

      {loading ? (
        <p>Loading volunteers...</p>  // Display loading message
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>  // Display error message
      ) : isEditing ? (
        <FormContainer>
          {message.text && <Message success={message.success}>{message.text}</Message>}
          <form onSubmit={updateVolunteer}>
            <FormField>
              <Label>Name</Label>
              <Input name="name" value={currentVolunteer.name || ""} onChange={handleFormChange} required />
            </FormField>
            <FormField>
              <Label>Hospital</Label>
              <Input name="hospital" value={currentVolunteer.hospital || ""} onChange={handleFormChange} required />
            </FormField>
            <FormField>
              <Label>Email</Label>
              <Input type="email" name="email" value={currentVolunteer.email || ""} onChange={handleFormChange} required />
            </FormField>
            <FormField>
              <Label>Contact</Label>
              <Input name="contactNumber" value={currentVolunteer.contactNumber || "N/A"} onChange={handleFormChange} required />
            </FormField>
            <FormField>
              <Label>Availability</Label>
              <Input name="availability" value={currentVolunteer.availability || ""} onChange={handleFormChange} required />
            </FormField>
            <FormField>
              <Label>Role</Label>
              <Select name="role" value={currentVolunteer.role || ""} onChange={handleFormChange} required>
                <option value="">Select Role</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Blood Collection Staff">Blood Collection Staff</option>
                <option value="Donor Assistance">Donor Assistance</option>
                <option value="Logistics Support">Logistics Support</option>
              </Select>
            </FormField>
            <FormField>
              <Label>Experience</Label>
              <Input name="experience" value={currentVolunteer.experience || "N/A"} onChange={handleFormChange} required />
            </FormField>
            <Button type="submit">Update Volunteer</Button>
          </form>
        </FormContainer>
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <tbody>
            {filteredVolunteers.map((v) => {
              const latestApplication = v.volunteerApplications?.[v.volunteerApplications.length - 1];
              const drive = latestApplication?.drive;
              const hospitalName = drive?.hospital?.user?.name || "N/A";
              const availability = latestApplication?.availability
                ? new Date(latestApplication.availability).toLocaleDateString('en-GB').replace(/\//g, '-')
                : "N/A";
              const role = latestApplication?.volunteerRole || "N/A";
              const experience = latestApplication?.experience || "N/A";

              return (
                <TableRow key={v._id}>
                  <TableCell data-label="Name">{v.name}</TableCell>
                  <TableCell data-label="Hospital">{hospitalName}</TableCell>
                  <TableCell data-label="Email">{v.email}</TableCell>
                  <TableCell data-label="Contact No">{v.contactNumber || "N/A"}</TableCell>
                  <TableCell data-label="Availability">{availability}</TableCell>
                  <TableCell data-label="Role">{role}</TableCell>
                  <TableCell data-label="Experience">{experience}</TableCell>
                  <TableCell data-label="Actions">
                    <Button onClick={() => editVolunteer(v)}>Edit</Button>
                    <Button onClick={() => deleteVolunteer(v._id)}>Remove</Button>
                  </TableCell>

                </TableRow>
              );
            })}

          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewVolunteers;

