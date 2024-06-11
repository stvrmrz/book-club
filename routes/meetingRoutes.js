const router = require('express').Router();
const meetingController = require('../controllers/meetingController');

// Route to get all meetings
router.get('/', meetingController.getAllMeetings);

// Route to get a specific meeting by ID
router.get('/:id', meetingController.getMeetingById);

// Route to create a new meeting
router.post('/', meetingController.createMeeting);

// Route to update a meeting by ID
router.put('/:id', meetingController.updateMeeting);

// Route to delete a meeting by ID
router.delete('/:id', meetingController.deleteMeeting);

module.exports = router;
