import session from "express-session";
import connectMongo from "connect-mongo";
require('dotenv').config();

let MongoStore = connectMongo(session);

/**
 * This variable is where save session, in this case is mongodb
 */
let sessionStore = new MongoStore({
  // url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  url: `mongodb://alochat:alochat@cluster0-shard-00-00.ncleb.mongodb.net:27017,cluster0-shard-00-01.ncleb.mongodb.net:27017,cluster0-shard-00-02.ncleb.mongodb.net:27017/alochat1?ssl=true&replicaSet=atlas-xvs9mq-shard-0&authSource=admin&retryWrites=true&w=majority`,
  autoReconnect: true
  // autoRemove: "native"
});

/**
 * Config session for app
 * @param app from exactly express module
 */
let config = (app) => {
  app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12 // 12h
    }
  }));
};

module.exports = {
  config: config,
  sessionStore: sessionStore
};
