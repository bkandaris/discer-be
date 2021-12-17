const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, unique: true },
    courseLocation: { type: String, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: false },
    coursePicture: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
