const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    experience:{
        type:String
    },
    salary:{
        type:String,
        default:'not disclosed'
    },
    location:{
        type:String,
        default:'Hyderabad'
    },
    jobDescription:{
        type:String,
        lowercase:true
    },
    vacancies:{
        type:Number,
        default:'Not mentioned'

    },
    education:{
        type:String,
        required:[true,'Please provide educational details']
    },
    skills:{
        type:String,
        required:[true,'mention skills']

    },
    postedOn:{
        type:Date,
        default:Date.now()
    },
    
    industry:{
        type:String,
        enum:['engineering','consulting']
    },
    aboutCompany:{
        type:String
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})
const Job = mongoose.model('Job',jobSchema);
module.exports = Job;