const express = require("express");
const { getMeetings, createMeeting, deleteMeeting, updateMeeting, getSingleMeeting } = require("../controllers/NewMeetingController");
const router = express.Router();

router.get("/getMeetings", getMeetings )

router.post("/createMeeting", createMeeting)

router.delete("/deleteMeeting/:id", deleteMeeting)

router.put("/updateMeeting/:id", updateMeeting)

router.get("/getSingleMeeting/:id", getSingleMeeting)

module.exports = router;