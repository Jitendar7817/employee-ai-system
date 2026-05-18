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

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        "https://employee-backend-j9uv.onrender.com/api/employees"
      );

      console.log(res.data);

      setEmployees(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const generateRecommendation =
    async (employee) => {

      try {

        const res = await axios.post(
          "https://employee-backend-j9uv.onrender.com/api/ai/recommend",
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

  return (

    <div className="page-container">

      <h1 className="page-title">
        AI Recommendation System
      </h1>

      {
        employees.length === 0 ? (

          <div
            className="employee-card"
          >
            <h2>
              No Employees Found
            </h2>
          </div>

        ) : (

          employees.map((employee) => (

            <div
              key={employee._id}
              className="employee-card"
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
                {
                  employee.skills.join(
                    ", "
                  )
                }
              </p>

              <button
                className="ai-btn"
                onClick={() =>
                  generateRecommendation(
                    employee
                  )
                }
              >
                Generate AI Recommendation
              </button>

            </div>
          ))
        )
      }

      {
        recommendation && (

          <div
            className="recommendation-box"
          >

            <h2>
              AI Recommendation
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