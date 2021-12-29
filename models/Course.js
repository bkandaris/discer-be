const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, unique: true },
    courseAddress: { type: String, required: true },
    courseCity: { type: String, required: true },
    courseState: { type: String, required: true },
    description: { type: String, required: false },
    coursePicture: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
