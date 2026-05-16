import { useEffect, useState }
from "react";

import axios from "axios";

function CandidateList() {

  const [candidates,
    setCandidates] = useState([]);

  const fetchCandidates = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/candidates"
        );

      setCandidates(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchCandidates();

    const interval =
      setInterval(fetchCandidates, 2000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="card">

      <h2>Candidate List</h2>

      {

        candidates.map((candidate, index) => (

          <div
            key={index}
            className="candidate-card"
          >

            <h3>{candidate.name}</h3>

            <p>{candidate.email}</p>

            <p>
              {candidate.skills.join(", ")}
            </p>

            <p>
              {candidate.experience}
              years experience
            </p>

          </div>

        ))

      }

    </div>
  );
}

export default CandidateList;