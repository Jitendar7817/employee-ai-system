// controllers/aiController.js

const axios = require("axios");

exports.getRecommendation = async (req, res) => {

  try {

    const employee = req.body;

    const prompt = `
    Employee Name: ${employee.name}
    Department: ${employee.department}
    Skills: ${employee.skills}
    Performance Score: ${employee.performanceScore}
    Experience: ${employee.experience}

    Please provide:
    1. Promotion Recommendation
    2. Training Suggestions
    3. Employee Feedback
    4. Employee Ranking
    `;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "arcee-ai/trinity-large-thinking:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

      },

      {
        headers: {

          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "HTTP-Referer": "http://localhost:5000",

          "X-Title": "Employee System",

          "Content-Type": "application/json",

        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};