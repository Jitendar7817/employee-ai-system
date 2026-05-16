import { useState } from "react";

import "./index.css";

import JobForm from "./components/JobForm";

function App() {

  const [activePage,
    setActivePage] =
    useState("dashboard");

  return (

    <div className="main-layout">

      <div className="sidebar">

        <h2>
          AI Candidate
          <br />
          Shortlisting
        </h2>

        <ul>

          <li
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
          >
            Dashboard
          </li>

          <li
            onClick={() =>
              setActivePage(
                "add"
              )
            }
          >
            Add Candidate
          </li>

          <li
            onClick={() =>
              setActivePage(
                "list"
              )
            }
          >
            Candidate List
          </li>

          <li
            onClick={() =>
              setActivePage(
                "match"
              )
            }
          >
            Match Candidates
          </li>

          <li
            onClick={() =>
              setActivePage(
                "ai"
              )
            }
          >
            AI Shortlist
          </li>

          <li
            onClick={() =>
              setActivePage(
                "analytics"
              )
            }
          >
            Analytics
          </li>

        </ul>

      </div>

      <div className="content">

        <h1>
          AI Candidate Shortlisting System
        </h1>

        <p className="subtitle">
          Smart Recruitment.
          Better Decisions.
        </p>

        <JobForm
          activePage={activePage}
        />

      </div>

    </div>
  );
}

export default App;