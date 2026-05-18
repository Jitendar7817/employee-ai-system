// routes/employeeRoutes.js

const express = require("express");

const router = express.Router();

const {
  addEmployee,
  getEmployees,
  searchEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post("/", addEmployee);

router.get("/", getEmployees);

router.get("/search", searchEmployee);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;