const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
//middlewares
app.use(express.json());
//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

module.exports = app;