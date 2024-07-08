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
        // console.log(req.query);
        //Building query
        const queryObj = {...req.query};
          const excludedFields = ['page', 'sort', 'limit', 'fields'];
          excludedFields.forEach(el => delete queryObj[el]);
        //1.filtering
         let queryStr=JSON.stringify(queryObj);
         queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        
        let query = Job.find(JSON.parse(queryStr));

        //2.sorting
        if(req.query.sort){
            // query = query.sort(req.query.sort)
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt')
        }

        //3.Limiting fields:allowing the clients which fields they want to see in response
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        }else{
            query = query.select('-__v')
        }

        //4.pagination
        const page = req.query.page *1 ||1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page -1)* limit;
        if(req.query.page){
            query = query.skip(skip).limit(limit);
        }
        //executing query
        const jobs  = await query;
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
exports.deleteJob = catchAsync(async(req,res,next) =>{
    
    const id  = req.params.id;
    //find whether the job exists or not
    const job = await Job.findById(id)
    // check if the userid and the postedby id is same 
    console.log('PostedBy:'+job.postedBy);
    console.log('userid:'+req.user.id)
    if(req.user.id ==job.postedBy ){
        await Job.findByIdAndDelete(req.params.id);
    }else{
        return next(new AppError('you are not allowed to manipulate job posts'))
    }
     res.status(200).json({
        status:'Deleted Successfully'
    })
    next();
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
    if(!req.user.id === job.postedBy.toString() ){
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