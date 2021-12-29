const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema(
  {
    createdBy: { type: String, required: true },
    meetingCourse: { type: String, required: true },
    meetingDescription: { type: String, required: false },
    meetingMonth: { type: Number, required: true },
    meetingDay: { type: Number, required: true },
    meetingTime: { type: String, required: true },
    meetingPlayers: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meeting', MeetingSchema);
