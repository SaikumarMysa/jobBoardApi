const Job = require('./../models/jobModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const globalErrorHandler = require('./errorController');

//createJob

exports.createJob = catchAsync(async(req,res,next) =>{
    const {role,company,experience,salary,location,jobDescription,
        vacancies,education,skills,postedOn,industry,aboutCompany,postedBy
     } = req.body;
        const newJob = await Job.create({
            role,
            company,
            experience,
            salary,
            location,
            jobDescription,
            vacancies,
            education,
            skills,
            postedOn,
            industry,
            aboutCompany,
            postedBy
        })

        res.status(201).json({
            status:'Job Posted',
            data:{
                newJob
            }
        })
    next();
    })


//showJobs
exports.showAllJobs = catchAsync(async(req,res,next) =>{
        const jobs = await Job.find();
        res.status(200).json({
            status:'success',
            results:jobs.length,
            data:{
                jobs
            }
        }) 
    next();   
})

//deleteJob

exports.deleteJob = catchAsync(async(req,res) =>{
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'Deleted Successfully'
    })
})

//updateJob
exports.updateJob = catchAsync(async(req,res,next) =>{
    const jobId = req.params.id;
    const job = await Job.findOne({_id:jobId})   
    //check if there is a job present with the id given
    if(!job){
        return next(new AppError('No Job is found with the id', 404))
    }
    // check if the userid and the postedby id is same 
    if(req.user.id === job.postedBy.toString() ){
        return next(new AppError('you are not allowed to manipulated job posts'))
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id,req.body,
                 {new:true,runValidators:true})
    //here id present in params is the job id
        res.status(200).json({
            status:'Job Updated',
            data:{
                updatedJob
            }
        })
    next();
})