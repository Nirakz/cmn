import mongoose from "mongoose";
import bluebird from "bluebird";
require('dotenv').config();

/**
 * Connect to MongoDB
 */
let connectDB = () => {
  mongoose.Promise = bluebird;
  // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  let URI = `mongodb+srv://alochat:alochat@cluster0.pbiov.mongodb.net/alochat1retryWrites=true&w=majority`;
  return mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:false});jorit
};

module.exports = connectDB;
