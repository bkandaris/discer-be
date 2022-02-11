const router = require('express').Router();
const Course = require('../models/Course');

// creating a course
router.post('/', async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});

// updating a course
router.put('/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Deleting a course
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json('Course has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

//   Find a single course
router.get('/find/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
