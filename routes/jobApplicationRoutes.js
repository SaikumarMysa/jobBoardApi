const express = require('express');

const jobAppController = require('./../controllers/jobAppController');

const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/apply', userController.protect, jobAppController.uploadUserResume, jobAppController.applyForJob)

router.get('/myApplications/:id', userController.protect,jobAppController.getMyApplications )

router.get('/status/:id', userController.protect, jobAppController.getApplicationStatus)

module.exports = router;