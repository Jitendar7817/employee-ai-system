import { useEffect, useState } from "react";

import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API =
process.env.REACT_APP_API_URL ||
"https://candidate-shortlisting-backend.onrender.com";
function JobForm({ activePage }) {

  const [name, setName] =
  useState("");

  const [email, setEmail] =
  useState("");

  const [skills, setSkills] =
  useState("");

  const [experience,
    setExperience] = useState("");

  const [bio, setBio] =
  useState("");

  const [candidates,
    setCandidates] = useState([]);

  const [requiredSkills,
    setRequiredSkills] = useState("");

  const [minExperience,
    setMinExperience] = useState("");

  const [results,
    setResults] = useState([]);

  const [aiResponse,
    setAiResponse] = useState("");

  useEffect(() => {

    fetchCandidates();

  }, []);

  const fetchCandidates =
  async () => {

    try {

      const response =
        await axios.get(
          `${API}/api/candidates`
        );

      setCandidates(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const addCandidate =
  async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        `${API}/api/candidates`,

        {
          name,
          email,

          skills:
          skills.split(","),

          experience,
          bio
        }
      );

      alert("Candidate Added");

      fetchCandidates();

      setName("");
      setEmail("");
      setSkills("");
      setExperience("");
      setBio("");

    } catch (error) {

      console.log(error);

    }
  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(

        `${API}/api/match`,

        {
          requiredSkills:
            requiredSkills.split(","),

          minExperience
        }
      );

      setResults(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const getAIShortlist =
  async () => {

    try {

      setAiResponse(
        "Generating AI Recommendation..."
      );

      const response =
        await axios.post(
          `${API}/api/ai/shortlist`
        );

      setAiResponse(
        response.data
      );

    } catch (error) {

      console.log(error);

      setAiResponse(
        "AI Recommendation Failed"
      );

    }
  };

  const chartData = {

    labels: results.map(
      candidate => candidate.name
    ),

    datasets: [
      {
        label: "Match Score",

        data: results.map(
          candidate =>
          candidate.matchScore
        ),

        backgroundColor:
        "rgba(37,99,235,0.7)",

        borderRadius: 10
      }
    ]
  };

  return (

    <div>

      {

        activePage ===
        "dashboard" && (

          <div className="stats">

            <div className="stat-card">

              <p>Total Candidates</p>

              <h2>
                {candidates.length}
              </h2>

            </div>

            <div className="stat-card">

              <p>Matches</p>

              <h2>
                {results.length}
              </h2>

            </div>

            <div className="stat-card">

              <p>AI Shortlists</p>

              <h2>
                {aiResponse ? 1 : 0}
              </h2>

            </div>

          </div>

        )

      }

      {

        activePage ===
        "add" && (

          <div className="card">

            <h2>
              Add Candidate
            </h2>

            <form
              onSubmit={addCandidate}
            >

              <input
                type="text"

                placeholder="Name"

                value={name}

                onChange={(e)=>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                type="email"

                placeholder="Email"

                value={email}

                onChange={(e)=>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <input
                type="text"

                placeholder="Skills"

                value={skills}

                onChange={(e)=>
                  setSkills(
                    e.target.value
                  )
                }
              />

              <input
                type="number"

                placeholder=
                "Experience"

                value={experience}

                onChange={(e)=>
                  setExperience(
                    e.target.value
                  )
                }
              />

              <textarea

                placeholder="Bio"

                value={bio}

                onChange={(e)=>
                  setBio(
                    e.target.value
                  )
                }

              />

              <button type="submit">

                Add Candidate

              </button>

            </form>

          </div>

        )

      }

      {

        activePage ===
        "list" && (

          <div className="candidate-grid">

            {

              candidates.map(
                (candidate,index)=>(

                <div
                  key={index}

                  className=
                  "candidate-card"
                >

                  <h3>
                    {candidate.name}
                  </h3>

                  <p>
                    {candidate.email}
                  </p>

                  <p>

                    Skills:
                    {candidate.skills.join(", ")}

                  </p>

                  <p>

                    Experience:
                    {candidate.experience}
                    years

                  </p>

                  <p>
                    {candidate.bio}
                  </p>

                </div>

              ))

            }

          </div>

        )

      }

      {

        activePage ===
        "match" && (

          <div className="card">

            <h2>
              Match Candidates
            </h2>

            <form
              onSubmit={handleSubmit}
            >

              <input
                type="text"

                placeholder=
                "Required Skills"

                value={requiredSkills}

                onChange={(e)=>
                  setRequiredSkills(
                    e.target.value
                  )
                }
              />

              <input
                type="number"

                placeholder=
                "Minimum Experience"

                value={minExperience}

                onChange={(e)=>
                  setMinExperience(
                    e.target.value
                  )
                }
              />

              <button type="submit">

                Match Candidates

              </button>

            </form>

          </div>

        )

      }

      {

        results.length > 0 && (

          <div className="candidate-grid">

            {

              results.map(
                (candidate,index)=>(

                <div
                  key={index}

                  className=
                  "candidate-card"
                >

                  <h3>
                    {candidate.name}
                  </h3>

                  <p>

                    Skills:
                    {candidate.skills.join(", ")}

                  </p>

                  <p>

                    Experience:
                    {candidate.experience}
                    years

                  </p>

                  <p>

                    Match Score:
                    {candidate.matchScore}%

                  </p>

                  <p
                    className={

                      candidate.rank ===
                      "High Match"

                      ? "high"

                      : candidate.rank ===
                      "Medium Match"

                      ? "medium"

                      : "low"
                    }
                  >

                    {candidate.rank}

                  </p>

                </div>

              ))

            }

          </div>

        )

      }

      {

        activePage ===
        "analytics" &&
        results.length > 0 && (

          <div className="graph-box">

            <h2>
              Analytics
            </h2>

            <Bar data={chartData} />

          </div>

        )

      }

      {

        activePage ===
        "ai" && (

          <div className="card">

            <button
              onClick={
                getAIShortlist
              }
            >

              Generate Fresh AI Shortlist

            </button>

          </div>

        )

      }

      {

        aiResponse && (

          <div className="ai-box">

            <h2>
              AI Recommendation
            </h2>

            <pre>
              {aiResponse}
            </pre>

          </div>

        )

      }

    </div>
  );
}

export default JobForm;