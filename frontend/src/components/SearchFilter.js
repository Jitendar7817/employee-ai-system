// src/components/SearchFilter.js

import { useState } from "react";

import axios from "axios";

function SearchFilter({ setEmployees }) {

  const [department, setDepartment] = useState("");

  const searchEmployee = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/employees/search?department=${department}`
      );

      setEmployees(res.data.employees);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div style={{ marginBottom: "20px" }}>

      <input
        type="text"
        placeholder="Search By Department"
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
      />

      <button
        onClick={searchEmployee}
      >
        Search
      </button>

    </div>
  );
}

export default SearchFilter;