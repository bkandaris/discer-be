const router = require('express').Router();
const Meetup = require('../models/Meeting');

// create meetup
router.post('/', async (req, res) => {
  const newMeetup = new Meetup(req.body);
  try {
    const savedMeetup = await newMeetup.save();
    res.status(200).json(savedMeetup);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update meetup
router.put('/:id', async (req, res) => {
  try {
    const updatedMeetup = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMeetup);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deleting a course
router.delete('/:id', async (req, res) => {
  try {
    await Meetup.findByIdAndDelete(req.params.id);
    res.status(200).json('Meetup has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});
