const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/register',userController.register)

router.post('/login',userController.login)

router.get('/myProfile',userController.protect,userController.userProfile,userController.getUserById)

router.patch('/updateMe',userController.protect,userController.updateMe)

router.delete('/deleteMe',userController.protect,userController.deleteMe)

router.patch('/saved-jobs',userController.protect, userController.saveJob)

router.get('/show-savedJobs',userController.protect, userController.savedJobs)

module.exports = router;