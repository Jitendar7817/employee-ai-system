import React, { useState } from "react";

import EmployeeForm from "../components/EmployeeForm";

import EmployeeList from "../components/EmployeeList";

function Dashboard() {

  const [refresh, setRefresh] = useState(false);

  return (

    <div className="page-container">

      <h1 className="dashboard-title">
        Employee Performance Dashboard
      </h1>

      <div className="card">

        <EmployeeForm setRefresh={setRefresh} />

      </div>

      <EmployeeList refresh={refresh} />

    </div>
  );
}

export default Dashboard;