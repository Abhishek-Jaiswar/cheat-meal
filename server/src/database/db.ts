import mongoose from "mongoose";
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI!;

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        console.log('Database connected successfully', connection.connection.host);

    } catch (error) {
        console.log("Failed to connect database!", error);
        process.exit(1);
    }
}

export default connectToDb;