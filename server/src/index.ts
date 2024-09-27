import express from "express"
import app from './app';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/user.route';
import connectToDb from "./database/db";
import cookieParser from 'cookie-parser'

dotenv.config();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRoute);

const startServer = async () => {
    try {
        await connectToDb()
        .then(() => {
            console.log("Database is running along with server");
        })
        .catch((error) => {
            console.log("Server running failed. ", error);
        })


        app.listen(PORT, () => {
            console.log(`Server is listening at port http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Failed to start server");
        
    }
}

startServer()