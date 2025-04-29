// src/components/AddEmployee.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AddEmployee = ({ refreshEmployeeList }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/employee/add-employee", // adjust your endpoint as needed
        employee
      );
      alert("Employee added successfully!");
      setEmployee({ name: "", email: "", department: "" }); // Reset form fields
      refreshEmployeeList(); // Refresh the employee list in parent component
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
