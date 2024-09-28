import express from "express"
import app from './app';
import dotenv from 'dotenv';

import connectToDb from "./database/db";


dotenv.config();
const PORT = process.env.PORT || 8000;

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