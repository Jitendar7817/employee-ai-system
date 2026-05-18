// src/components/EmployeeList.js

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function EmployeeList({ refresh }) {

  const [employees, setEmployees] = useState([]);

  const [recommendation, setRecommendation] =
    useState("");

  useEffect(() => {

    fetchEmployees();

  }, [refresh]);

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        ""
      );

      setEmployees(res.data.employees);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {

    try {

      await axios.delete(
        `https://employee-backend-j9uv.onrender.com/api/employees/${id}`
      );

      fetchEmployees();

    } catch (error) {

      console.log(error);
    }
  };

  const getRecommendation = async (
    employee
  ) => {

    try {

      const res = await axios.post(
        "https://employee-backend-j9uv.onrender.com/api/employees/recommend",
        employee
      );

      const aiText =
        res.data.data.choices[0].message.content;

      setRecommendation(aiText);

    } catch (error) {

      console.log(error);

      alert("AI Recommendation Error");
    }
  };

  return (

    <div style={{ marginTop: "30px" }}>

      <h2 style={{ color: "white" }}>
        Employee List
      </h2>

      {
        employees.map((employee) => (

          <div
            key={employee._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >

            <h3>{employee.name}</h3>

            <p>
              <b>Email:</b>
              {" "}
              {employee.email}
            </p>

            <p>
              <b>Department:</b>
              {" "}
              {employee.department}
            </p>

            <p>
              <b>Skills:</b>
              {" "}
              {employee.skills.join(", ")}
            </p>

            <p>
              <b>Performance Score:</b>
              {" "}
              {employee.performanceScore}
            </p>

            <p>
              <b>Experience:</b>
              {" "}
              {employee.experience} Years
            </p>

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >

              <button
                onClick={() =>
                  getRecommendation(employee)
                }
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                AI Recommendation
              </button>

              <button
                onClick={() =>
                  deleteEmployee(employee._id)
                }
                style={{
                  background: "red",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

            </div>

          </div>
        ))
      }

      {
        recommendation && (

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >

            <h2>
              AI Recommendation
            </h2>

            <pre
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {recommendation}
            </pre>

          </div>
        )
      }

    </div>
  );
}

export default EmployeeList;