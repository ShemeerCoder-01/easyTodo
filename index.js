const express = require('express');
require('dotenv').config();
const app = express();
const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');
const db = require('./config/dbConnection/dbConnection');
const tokenValidate = require('./middlewares/tokenValidation');
app.use(express.json());
const cors = require('cors');
const PORT =process.env.PORT || 8001;

db();
app.use(cors({
    origin:"https://easy-todo-app.vercel.app"
    // origin:"*"
}));


app.use('/user',userRouter);
app.use('/todo',tokenValidate,todoRouter);
app.listen(PORT,()=>{
    console.log("server started",PORT);
});
