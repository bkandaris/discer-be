const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// routes
const userRoute = require('./routes/users');
const courseRoute = require('./routes/course');
const meetingRoute = require('./routes/meeting');

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('mongo connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/user', userRoute);
app.use('/api/course', courseRoute);
app.use('/api/meeting', meetingRoute);

app.listen(PORT, () => {
  console.log(`backend running on port: ${PORT}`);
});
