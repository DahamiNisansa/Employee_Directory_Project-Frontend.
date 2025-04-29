// src/App.js
import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
  const [reload, setReload] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const refreshEmployeeList = () => {
    setReload(!reload);
  };

  const handleEditClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
  };

  const closeEdit = () => {
    setSelectedEmployeeId(null);
  };

  return (
    <div>
      <AddEmployee refreshEmployeeList={refreshEmployeeList} />
      {selectedEmployeeId ? (
        <EditEmployee
          employeeId={selectedEmployeeId}
          closeEdit={closeEdit}
          refreshEmployeeList={refreshEmployeeList}
        />
      ) : (
        <EmployeeList
          reload={reload}
          onEditClick={handleEditClick}
          refreshEmployeeList={refreshEmployeeList}
        />
      )}
    </div>
  );
}

export default App;
