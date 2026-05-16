const Candidate =
require("../models/Candidate");

exports.addCandidate =
async (req, res) => {

  try {

    const candidate =
    new Candidate(req.body);

    await candidate.save();

    res.status(201).json(candidate);

  } catch (error) {

    res.status(500).json(error);

  }
};

exports.getCandidates =
async (req, res) => {

  try {

    const candidates =
    await Candidate.find();

    res.json(candidates);

  } catch (error) {

    res.status(500).json(error);

  }
};