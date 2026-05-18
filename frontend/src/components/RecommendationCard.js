import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Recommendation() {

  const [employees, setEmployees] =
    useState([]);

  const [recommendation, setRecommendation] =
    useState("");

  const [overallRecommendation,
    setOverallRecommendation] =
    useState("");

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/employees"
      );

      setEmployees(
        res.data.employees
      );

    } catch (error) {

      console.log(error);
    }
  };

  const generateRecommendation =
    async (employee) => {

      try {

        const res = await axios.post(
          "http://localhost:5000/api/ai/recommend",
          employee
        );

        const aiText =
          res.data.data.choices[0]
            .message.content;

        setRecommendation(aiText);

      } catch (error) {

        console.log(error);

        alert(
          "AI Recommendation Failed"
        );
      }
    };

  const generateOverallRecommendation =
    async () => {

      try {

        const overallData = {
          employees,
        };

        const res = await axios.post(
          "http://localhost:5000/api/ai/recommend",
          overallData
        );

        const aiText =
          res.data.data.choices[0]
            .message.content;

        setOverallRecommendation(
          aiText
        );

      } catch (error) {

        console.log(error);

        alert(
          "Overall Recommendation Failed"
        );
      }
    };

  return (

    <div className="page-container">

      <h1
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        AI Recommendation System
      </h1>

      {/* OVERALL BUTTON */}

      <button
        onClick={
          generateOverallRecommendation
        }
        style={{
          background: "#16a34a",
          color: "white",
          padding: "12px 18px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        Generate Overall AI Recommendation
      </button>

      {
        overallRecommendation && (

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >

            <h2>
              Overall AI Recommendation
            </h2>

            <pre
              style={{
                whiteSpace:
                  "pre-wrap",

                fontFamily:
                  "inherit",
              }}
            >
              {
                overallRecommendation
              }
            </pre>

          </div>
        )
      }

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

            <h2>
              {employee.name}
            </h2>

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

            <button
              onClick={() =>
                generateRecommendation(
                  employee
                )
              }
              style={{
                background: "#2563eb",
                color: "white",
                padding:
                  "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Generate AI Recommendation
            </button>

          </div>
        ))
      }

      {
        recommendation && (

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          >

            <h2>
              Employee AI Recommendation
            </h2>

            <pre
              style={{
                whiteSpace:
                  "pre-wrap",

                fontFamily:
                  "inherit",
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

export default Recommendation;