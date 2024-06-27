const express = require('express');
const jobController = require('./../controllers/jobController');
const router = express.Router();
router.post('/createJob',jobController.createJob);
router.get('/',jobController.showAllJobs);
router.delete('/:id',jobController.deleteJob);
router.patch('/:id',jobController.updateJob);

module.exports = router;