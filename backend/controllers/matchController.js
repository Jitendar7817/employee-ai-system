const axios =
require("axios");

const Candidate =
require("../models/Candidate");

const matchCandidates =
async (req, res) => {

  try {

    const {
      requiredSkills,
      minExperience
    } = req.body;

    const candidates =
      await Candidate.find();

    const ranked =

      candidates.map(candidate => {

        const matchedSkills =

          candidate.skills.filter(
            skill =>

            requiredSkills.includes(
              skill
            )
          );

        const score =

          (
            matchedSkills.length /

            requiredSkills.length

          ) * 100;

        let rank =
        "Low Match";

        if (score >= 80) {

          rank =
          "High Match";

        }

        else if (score >= 50) {

          rank =
          "Medium Match";

        }

        return {

          name:
          candidate.name,

          email:
          candidate.email,

          skills:
          candidate.skills,

          experience:
          candidate.experience,

          bio:
          candidate.bio,

          matchScore:
          Math.round(score),

          rank
        };

      })

      .filter(candidate =>

        candidate.experience >=
        minExperience

      )

      .sort((a, b) =>

        b.matchScore -
        a.matchScore

      );

    res.json(ranked);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      "Matching Failed"

    });

  }
};

const aiShortlist =
async (req, res) => {

  try {

    const candidates =
      await Candidate.find();

    if (candidates.length === 0) {

      return res.status(400).json({

        message:
        "No candidates found"

      });

    }

    const prompt = `

You are a professional HR recruiter.

Analyze ALL candidates carefully.

Compare candidates based on:
- Skills
- Experience
- Technical Knowledge
- Project Relevance
- Overall Suitability

IMPORTANT:
- Do NOT always choose first candidate.
- Compare every candidate fairly.
- Rank honestly from best to worst.

Candidates:
${JSON.stringify(candidates)}

Output Format:

1. Best Candidate
Reason

2. Second Best Candidate
Reason

3. Third Best Candidate
Reason

Also mention:
- strongest skills
- weaknesses
- final hiring recommendation

`;

    const response =

      await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        model:
        "arcee-ai/trinity-large-thinking:free",

        messages: [

          {
            role: "user",

            content:
            prompt
          }

        ]

      },

      {

        headers: {

          Authorization:
          `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
          "application/json"

        }

      }

    );

    const aiMessage =

      response.data
      .choices[0]
      .message.content;

    res.json(aiMessage);

  }

  catch (error) {

    console.log(

      "AI ERROR:",
      error.response?.data ||
      error.message

    );

    res.status(500).json({

      message:
      "AI Recommendation Failed",

      error:
      error.response?.data ||
      error.message

    });

  }
};

module.exports = {

  matchCandidates,
  aiShortlist

};