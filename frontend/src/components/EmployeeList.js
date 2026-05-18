import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function EmployeeList() {

  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        "https://employee-backend-j9uv.onrender.com/api/employees"
      );

      if (
        Array.isArray(res.data)
      ) {

        setEmployees(res.data);

      } else {

        setEmployees(
          res.data.employees || []
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div>

      <h1 className="page-title">
        Employee List
      </h1>

      {
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

            <p>
              <b>Experience:</b>
              {" "}
              {employee.experience}
              Years
            </p>

          </div>
        ))
      }

    </div>
  );
}

export default EmployeeList;