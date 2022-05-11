import session from "express-session";
import connectMongo from "connect-mongo";
require('dotenv').config();

let MongoStore = connectMongo(session);

/**
 * This variable is where save session, in this case is mongodb
 */
let sessionStore = new MongoStore({
  // url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  url: `mongodb+srv://alochat:alochat@cluster0.pbiov.mongodb.net/alochat1retryWrites=true&w=majority`,
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
