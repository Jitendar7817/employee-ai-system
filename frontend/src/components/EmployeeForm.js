import React, { useState } from "react";

import axios from "axios";

function EmployeeForm() {

  const [formData, setFormData] =
    useState({
      name:"",
      email:"",
      department:"",
      skills:"",
      performanceScore:"",
      experience:"",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const employeeData = {
        ...formData,

        skills:
        formData.skills
        .split(","),
      };

      await axios.post(
        "https://employee-backend-j9uv.onrender.com/api/employees",
        employeeData
      );

      alert(
        "Employee Added Successfully"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Error Adding Employee"
      );
    }
  };

  return (

    <div className="form-section">

      <h2 className="section-title">
        Add Employee
      </h2>

      <form
        className="employee-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React,Node)"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="performanceScore"
          placeholder="Performance Score"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Employee
        </button>

      </form>

    </div>
  );
}

export default EmployeeForm;