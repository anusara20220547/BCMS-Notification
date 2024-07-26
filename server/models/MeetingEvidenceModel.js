const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingEvidenceSchema = new Schema(
    {
        meetingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meeting',
            required: true,
          },
          attendeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
          },
          reason: {
            type: String,
            required: false,
          },
          actionNo: {
            type: Number,
            required: false,
          },
          action: {
            type: String,
            required: false,
          },
          targetDate: {
            type: String,
            required: false,
          },
          attended: {
            type: Boolean,
            required: true,
          },
          status: {
            type: Boolean,
            required: true,
          },
    },
    {
        timestamps: true,
    }
);

const MeetingEvidence = mongoose.model("MeetingEvidence", MeetingEvidenceSchema);

module.exports = MeetingEvidence;