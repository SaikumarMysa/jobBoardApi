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
        type:Number,
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
    
    jobCategory:{
        type:String,
        enum:['IT','Electronics','Business/Management','Graphic Design','Consulting','Information Security','Customer Support']
    },
    employmentType:{
        type: String,
        enum:['Full-time', 'Short-term', 'Internship', 'Contract']
    },
    aboutCompany:{
        type:String
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
},
{
    timestamps:true
})
const Job = mongoose.model('Job',jobSchema);
module.exports = Job;