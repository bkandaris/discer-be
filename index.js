const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// CLUSTER 0 - Mongodb
// update to get server running
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// routes
const userRoute = require('./routes/users');
const courseRoute = require('./routes/course');

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('mongo connected');
  })
  .catch((err) => {
    console.log(err);
  });
// using routes
app.use('/api/user', userRoute);
app.use('/api/course', courseRoute);

app.listen(PORT, () => {
  console.log(`backend running on port: ${PORT}`);
});
