const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
//middlewares
app.use(express.json());
//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

app.all('*', (req, res, next) =>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//global error handling middleware
app.use(globalErrorHandler);



module.exports = app;