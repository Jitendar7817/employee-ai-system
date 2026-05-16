const express = require("express");

const router = express.Router();

const {

  addCandidate,
  getCandidates

} = require(
  "../controllers/candidateController"
);

router.post(
  "/candidates",
  addCandidate
);

router.get(
  "/candidates",
  getCandidates
);

module.exports = router;