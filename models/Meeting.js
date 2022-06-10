const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema(
  {
    createdById: { type: String, required: true },
    meetingCourse: { type: String, required: true },
    meetingDescription: { type: String, required: true },
    meetingDate: { type: String, required: true },
    meetingTime: { type: String, required: true },
    meetingPlayers: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meeting', MeetingSchema);
