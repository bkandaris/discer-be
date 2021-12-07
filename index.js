const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// CLUSTER 0 - Mongodb
const app = express();
// trying for pics
// const bodyParser = require('body-parser');
// app.use(bodyParser.json({ limit: '50mb' }));
// trying for pics
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// routes
const userRoute = require('./routes/users');

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
app.listen(PORT, () => {
  console.log(`backend running on port: ${PORT}`);
});
