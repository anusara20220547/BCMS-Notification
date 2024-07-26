const NewMeeting = require("../models/NewMeetingModel");
const Employee = require("../models/EmployeeModel");
const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sltmobitelbcmssystem@gmail.com',
    pass: 'lvbr ypwc atoa qcfi',
  },
});

// Update a meeting
const updateMeeting = async (req, res) => {
  const { purpose, location, date, startTime, endTime, attendees, chairedBy } = req.body;

  // Check if chairedBy field is provided
  if (!chairedBy) {
    return res.status(400).json({ error: "ChairedBy field is required." });
  }

  try {
    const meeting = await NewMeeting.findById(req.params.id);
    
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    meeting.purpose = purpose;
    meeting.location = location;
    meeting.date = date;
    meeting.startTime = startTime;
    meeting.endTime = endTime;
    meeting.attendees = attendees;
    meeting.chairedBy = chairedBy;

    await meeting.save();

    // Fetch emails and names of all attendees
    const attendeeDetails = await Employee.find({
      _id: { $in: attendees }
    }).select('email name');

    // Fetch the name of the person chairing the meeting
    const chairperson = await Employee.findById(chairedBy).select('name');

    // Prepare the list of attendee names
    const attendeeNames = attendeeDetails.map(att => att.name).join(', ');

    // Log attendees and chairperson details
    console.log('Attendees:', attendeeDetails);
    console.log('Chairperson:', chairperson);

    // Send individual emails to each attendee
    for (const attendee of attendeeDetails) {
      const mailOptions = {
        from: 'sltmobitelbcmssystem@gmail.com',
        to: attendee.email,
        subject: 'Meeting Updated',
        text: `Dear ${attendee.name},\n\nThe details of your scheduled meeting have been updated. New details:\n
               Purpose: ${purpose}\n
               Location: ${location}\n
               Date: ${date}\n
               Start Time: ${startTime}\n
               End Time: ${endTime}\n
               Chaired By: ${chairperson.name}\n
               Attendees: ${attendeeNames}\n\n
               Note: This is an auto-generated email. Please do not reply to this email.`
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent to:', attendee.email, info.response);
      } catch (error) {
        console.error('Error sending email to:', attendee.email, error);
      }
    }

    res.json("Meeting updated!");
  } catch (err) {
    console.error('Error updating meeting or sending emails:', err);
    res.status(400).json({ error: err.message });
  }
};

// Delete a meeting
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await NewMeeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    // Fetch emails and names of all attendees
    const attendeeDetails = await Employee.find({
      _id: { $in: meeting.attendees }
    }).select('email name');

    // Fetch the name of the person who chaired the meeting
    const chairperson = await Employee.findById(meeting.chairedBy).select('name');

    // Send individual emails to each attendee
    attendeeDetails.forEach((attendee) => {
      const mailOptions = {
        from: 'sltmobitelbcmssystem@gmail.com',
        to: attendee.email,
        subject: 'Meeting Cancelled',
        text: `Dear ${attendee.name},\n\nThe meeting scheduled for the following details has been cancelled:\n
               Purpose: ${meeting.purpose}\n
               Location: ${meeting.location}\n
               Date: ${meeting.date}\n
               Start Time: ${meeting.startTime}\n
               End Time: ${meeting.endTime}\n
               Chaired By: ${chairperson.name}\n\n
              
               Note: This is an auto-generated email. Please do not reply to this email.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email to:', attendee.email, error);
        } else {
          console.log('Email sent to:', attendee.email, info.response);
        }
      });
    });

    res.json("Meeting deleted.");
  } catch (err) {
    console.error('Error deleting meeting or sending emails:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get all meetings data
const getMeetings = (req, res) => {
  NewMeeting.find()
    .then((meetings) => res.status(200).json(meetings))
    .catch((err) => res.status(400).json({ message: err }));
};

// Store new meeting data
const createMeeting = async (req, res) => {
  const { purpose, location, date, startTime, endTime, attendees, chairedBy } = req.body;
  const newMeeting = new NewMeeting({
    purpose,
    location,
    date,
    startTime,
    endTime,
    attendees,
    chairedBy,
  });

  try {
    await newMeeting.save();

    // Fetch emails and names of all attendees
    const attendeeDetails = await Employee.find({
      _id: { $in: attendees }
    }).select('email name');

    // Fetch the name of the person chairing the meeting
    const chairperson = await Employee.findById(chairedBy).select('name');

    // Prepare the list of attendee names
    const attendeeNames = attendeeDetails.map(att => att.name).join(', ');

    // Send individual emails to each attendee
    attendeeDetails.forEach((attendee) => {
      const mailOptions = {
        from: 'sltmobitelbcmssystem@gmail.com',
        to: attendee.email,
        subject: 'Meeting Updated',
        text: `Dear ${attendee.name},\n\nThe details of your scheduled meeting have been updated. New details:\n
               Purpose: ${purpose}\n
               Location: ${location}\n
               Date: ${date}\n
               Start Time: ${startTime}\n
               End Time: ${endTime}\n
               Chaired By: ${chairperson.name}\n
               Attendees: ${attendeeNames}\n\n
               Note: This is an auto-generated email. Please do not reply to this email.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email to:', attendee.email, error);
        } else {
          console.log('Email sent to:', attendee.email, info.response);
        }
      });
    });

    res.status(200).json("Meeting added successfully");
  } catch (err) {
    console.error('Error creating meeting or sending emails:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get a single meeting
const getSingleMeeting = (req, res) => {
  NewMeeting.findById(req.params.id)
    .then((meeting) => res.json(meeting))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getMeetings,
  createMeeting,
  deleteMeeting,
  updateMeeting,
  getSingleMeeting
};