import express from "express";
import cors from "cors";
import session from "express-session";

import LoginRoute from "./routes/LoginRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ContentRoute from "./routes/ContentRoute.js";

import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized:true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(LoginRoute);
app.use(UserRoute);
app.use(ContentRoute);
app.use(AuthRoute);

// store.sync();


app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running ...');
});