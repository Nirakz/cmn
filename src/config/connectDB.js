import mongoose from "mongoose";
import bluebird from "bluebird";
require('dotenv').config();

/**
 * Connect to MongoDB
 */
let connectDB = () => {
  mongoose.Promise = bluebird;
  // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  let URI = `mongodb://alochat:alochat@cluster0-shard-00-00.ncleb.mongodb.net:27017,cluster0-shard-00-01.ncleb.mongodb.net:27017,cluster0-shard-00-02.ncleb.mongodb.net:27017/alochat1?ssl=true&replicaSet=atlas-xvs9mq-shard-0&authSource=admin&retryWrites=true&w=majority`;
  return mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:false});
};

module.exports = connectDB;
