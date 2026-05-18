import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="navbar">

      <div className="logo">
        Employee AI System
      </div>

      <div className="nav-links">

        {
          !token ? (

            <>

              <Link to="/">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>

            </>

          ) : (

            <>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/recommendation">
                Recommendations
              </Link>

              <button
                onClick={logoutHandler}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>

            </>
          )
        }

      </div>

    </div>
  );
}

export default Navbar;