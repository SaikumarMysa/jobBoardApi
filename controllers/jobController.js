const Job = require('./../models/jobModel');


//createJob

exports.createJob = async(req,res) =>{
    const {role,company,experience,salary,location,jobDescription,
        vacancies,education,skills,postedOn,industry,aboutCompany,postedBy
     } = req.body;
    try{
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

    }catch(err){
        console.log('Error')
    }

}


//showJobs
exports.showAllJobs = async(req,res) =>{
    try {
        const jobs = await Job.find();
        res.status(200).json({
            status:'success',
            results:jobs.length,
            data:{
                jobs
            }
        })    
    } catch (err) {
        console.log(err.message)    
    }
}

//deleteJob

exports.deleteJob = async(req,res) =>{
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'Deleted Successfully'
    })
}

//updateJob
exports.updateJob = async(req,res) =>{
    try {
        const updateJob = await Job.findByIdAndUpdate(req.params.id,req.body,
            {new:true,runValidators:true}

        )
        res.status(200).json({
            status:'Job Updated',
            data:{
                updatedJob:updateJob
            }
        })
    } catch (err) {
        console.log(err.message)    
    }
}