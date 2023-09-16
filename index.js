const express = require('express');
require('dotenv').config();
const app = express();
const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');
const db = require('./config/dbConnection/dbConnection');
const session = require('express-session');
const mongodbSession = require('connect-mongodb-session')(session);
app.use(express.json());
const cors = require('cors');
const PORT =process.env.PORT || 8001;

db();
app.use(cors({
    origin:"https://easytodoo.netlify.app"
}));
const store = new mongodbSession({
    uri:process.env.CONNECTION_STRING,
    collection:"sessions"
});

app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{path:'/',secure:false,maxAge:100000}
}));

app.use('/user',userRouter);
app.use('/todo',todoRouter);
app.listen(PORT,()=>{
    console.log("server started");
});
