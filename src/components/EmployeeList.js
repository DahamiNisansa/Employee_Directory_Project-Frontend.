// src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = ({ reload }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, [reload]); // Re-fetch when reload prop changes

  const loadEmployees = async () => {
    try {
      const result = await axios.get("http://localhost:8080/employee/getAll");
      setEmployees(result.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Directory</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.eid}>
              <td>{emp.eid}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.createdAt}</td>
              <td>{emp.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
