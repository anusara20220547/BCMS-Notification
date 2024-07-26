const MeetingEvidence = require("../models/MeetingEvidenceModel");

// Store meeting evidence by created meeting id

const createMeetingEvidence = async (req, res) => {
  const { id } = req.params; 
  const attendeesDetails = req.body; 

  try {
    for (const detail of attendeesDetails) {
      const newEvidence = new MeetingEvidence({
        meetingId: id,
        attendeeId: detail.attendeeId,
        reason: detail.reason,
        actionNo: detail.actionNo,
        action: detail.action,
        targetDate: detail.targetDate,
        attended: detail.attended,
        status: detail.status,
      });

      await newEvidence.save();
    }

    res.status(201).json({ message: "Meeting evidence stored successfully" });
  } catch (error) {
    console.error("Error storing meeting evidence:", error);
    res
      .status(500)
      .json({ message: "Failed to store meeting evidence", error });
  }
};

// Get single meeting evidence by meeting id

const getSingleMeetingEvidence = async (req, res) => {
  const { id } = req.params;

  try {
    const meetingEvidence = await MeetingEvidence.find({ meetingId: id });
    res.json(meetingEvidence);
  } catch (error) {
    console.error("Error fetching meeting evidence:", error);
    res
     .status(500)
     .json({ message: "Failed to fetch meeting evidence", error });
  }
};


module.exports = {
  createMeetingEvidence,
  getSingleMeetingEvidence,
};
