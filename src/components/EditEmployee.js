// src/components/EditEmployee.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEmployee = ({ employeeId, closeEdit }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8080/employee/search-by-id?query=${employeeId}`
        );
        setEmployee(result.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated employee data to the backend via PUT request
      await axios.put("http://localhost:8080/employee/update-employee", employee);
      closeEdit();  // Close the edit form after update
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <h3>Edit Employee</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <button type="submit">Update</button>
        <button type="button" onClick={closeEdit}>Cancel</button>
      </form>
    </div>
  );
};

export default EditEmployee;
