// src/components/EmployeeForm.js

import React, { useState } from "react";

import axios from "axios";

function EmployeeForm({ setRefresh }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const employeeData = {

        ...formData,

        skills: formData.skills.split(","),

        performanceScore: Number(
          formData.performanceScore
        ),

        experience: Number(
          formData.experience
        ),
      };

      await axios.post(
        "http://localhost:5000/api/employees",
        employeeData
      );

      alert("Employee Added Successfully");

      setFormData({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: "",
      });

      setRefresh((prev) => !prev);

    } catch (error) {

      console.log(error);

      alert("Error Adding Employee");
    }
  };

  return (

    <div>

      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React,Node)"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="performanceScore"
          placeholder="Performance Score"
          value={formData.performanceScore}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
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