const { Meeting } = require('../models');

// Function to get all meetings
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll();
    res.json(meetings);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to get a specific meeting by ID
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }
    res.json(meeting);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to create a new meeting
const createMeeting = async (req, res) => {
  try {
    const newMeeting = await Meeting.create(req.body);
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to update a meeting by ID
const updateMeeting = async (req, res) => {
  try {
    const updatedMeeting = await Meeting.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedMeeting[0]) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }
    res.json({ message: 'Meeting updated' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to delete a meeting by ID
const deleteMeeting = async (req, res) => {
  try {
    const result = await Meeting.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!result) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }
    res.json({ message: 'Meeting deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting
};
