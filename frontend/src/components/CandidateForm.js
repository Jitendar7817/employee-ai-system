import { useState } from "react";
import axios from "axios";

function CandidateForm() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      skills: "",
      experience: "",
      bio: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/candidates",
        {
          ...formData,
          skills: formData.skills.split(",")
        }
      );

      alert("Candidate Added");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="card">

      <h2>Add Candidate</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="React, Node.js"
          onChange={handleChange}
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
        />

        <button type="submit">
          Add Candidate
        </button>

      </form>

    </div>
  );
}

export default CandidateForm;