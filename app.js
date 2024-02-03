const express = require('express');
require('express-async-errors');
const app = express();
const port = process.env.PORT || 3090
const connectDB = require('./config/connectDb');

//const notFound=require("./middlewares/auth")

require('dotenv').config();

const dbConnect= async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        console.log("Connected to the database successfully...");
    } catch (error) {
        console.log(error);
    }
};

dbConnect(); 


// Middlewares
app.use(express.static("./public"))
app.use(express.json());

// routes
const userRouter=require('./routers/userRoute')

//routes
app.use("/api",userRouter)



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
