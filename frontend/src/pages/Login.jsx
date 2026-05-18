import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email:"",
      password:"",
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

      const res = await axios.post(
        "https://employee-backend-j9uv.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="auth-container">

      <h1>
        Employee Login
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;