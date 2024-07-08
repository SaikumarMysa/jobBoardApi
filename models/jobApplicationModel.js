const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    jobId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Job'
    },
    status:{
        type: String,
        enum:['pending', 'processing', 'rejected', 'interview'],
        default:'processing'
    },
    resume:String,
    appliedAt:{
        type: String,
        default: Date.now
    }
})

const jobApplication = mongoose.model('jobApplication' , JobApplicationSchema);
module.exports = jobApplication;
