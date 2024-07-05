const express = require('express');
const jobController = require('./../controllers/jobController');
const userController = require('./../controllers/userController');
const router = express.Router();
router.post('/createJob',userController.restrictTo('employer'),jobController.createJob);
router.get('/',jobController.showAllJobs);
router.delete('/:id',userController.protect,jobController.deleteJob);
router.patch('/:id',userController.protect,jobController.updateJob);

module.exports = router;