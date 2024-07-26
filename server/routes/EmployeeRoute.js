const express = require("express");
const { getEmployees } = require("../controllers/EmployeeController");
const router = express.Router();

router.get("/getEmployees", getEmployees )


module.exports = router;
