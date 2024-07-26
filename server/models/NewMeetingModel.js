const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewMeetingSchema = new Schema(
  {
    purpose: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    attendees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],

    chairedBy: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  },
  {
    timestamps: true,
  }
);

const NewMeeting = mongoose.model("NewMeeting", NewMeetingSchema);

module.exports = NewMeeting;