const express = require("express");
const {createMeetingEvidence, getSingleMeetingEvidence } = require("../controllers/MeetingEvidenceController");
const router = express.Router();


router.post("/createMeetingEvidence/:id", createMeetingEvidence)

router.get("/getSingleMeetingEvidence/:id", getSingleMeetingEvidence)

module.exports = router;