const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
//getUserById
exports.getUserById = catchAsync(async(req,res) =>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
})

//user-register
exports.register = catchAsync(async(req,res,next) =>{
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword
        })
        res.status(201).json({
            status:'success',
            data:{
                newUser
            }
        })
    next();
})

//user-login

exports.login = catchAsync(async(req,res,next) =>{
    const {email,password} = req.body;
    if(!email || ! password) return res.status(404).json({
        status:'fail',
        message:'Not found'
    })
    const user = await User.findOne({email}).select('+password')
    const correct = await user.correctPassword(password,user.password)
    if(!user||!correct) return res.status(404).json({
        status:'fail',
        message:'Not found'
    })
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_PASSWORD,{expiresIn:process.env.JWT_EXPIRES_IN});
    res.status(200).json({
        status:'login success',
        token
    })
    next();
})

//protect routes
exports.protect = catchAsync(async(req,res,next) =>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) res.status(400).json({
        message:'You are not logged in!'
    })
    const decoded = await jwt.verify(token,process.env.JWT_SECRET_PASSWORD)
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) res.status(400).json({
        status:'Not Found',
        message:'The User belonging to this token doesnot exists!'
    })
    req.user = currentUser;
    next();
})

//userProfile
exports.userProfile = (req,res,next)=>{
    req.params.id = req.user.id;
    next();
}

//updateMe

exports.updateMe = catchAsync(async(req,res,next) =>{
        const updateCurrentUser = await User.findByIdAndUpdate(req.user.id,req.body,
            {new:true,runValidators:true}
        )
        res.status(200).json({
            status:'Data Updated successfully',
            data:{
                updateCurrentUser
            }

        })
        next();   
 })


//deleteMe

exports.deleteMe = catchAsync(async(req,res,next) =>{
   
        const deleteCurrentUser = await User.findByIdAndDelete(req.user.id)
        res.status(200).json({
            status:'user deleted'
        })
        next();   
    })
   


// restrictTo

exports.restrictTo = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:'You do not have permission to perform this action'
            })
        }
        next();
    }
}

