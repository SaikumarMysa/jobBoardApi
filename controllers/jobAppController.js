const jobApplication = require('./../models/jobApplicationModel');

const multer = require('multer');


const multerStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'uploads/resumes')
    },
    filename: (req,file,cb) =>{
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const upload = multer({
    storage:multerStorage,
    //fileFilter:multerFilter
})

exports.uploadUserResume = upload.single('resume');


//APPLY FOR JOB
exports.applyForJob = async(req,res) =>{
    // console.log(req.file);
    // console.log(req.body)
    const jobapp = new jobApplication({
        userId: req.user.id,
        jobId: req.body.jobId,
        resume: req.file.filename
    });
    await jobapp.save();
    res.status(201).json({
        status:'Job Applied',
        data:{
            jobapp
        }
    })
}

//BROWSE APPLICATIONS: Get all applications for a user by passing his application id

exports.getMyApplications = async(req,res) =>{
    //const userId = req.user.id;
    const applications = await jobApplication.findById(req.params.id).populate('jobId')
    const myApplications = (applications.jobId);
    res.status(200).json({
        status: 'Job Applications',
        //results:applications.length,
        data:{
            myApplications
        }
    })    
}

//GET JOB STATUS OF A USER by passing his application id
exports.getApplicationStatus = async(req,res) =>{
    const applications = await jobApplication.findById(req.params.id)
    const myStatus = applications.status;
    res.status(200).json({
        status: 'Application Status',
        data:{
            myStatus
        }
    })    
}