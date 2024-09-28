import express from 'express';
import cors from 'cors';
import userRoute from './routes/user.route';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';

const app = express();

// middlewares
app.use(cookieParser())
app.use(express.json());

const corsOption = {
    origin: "http://localhost:5173",
    credential: true
}
app.use(cors(corsOption));

app.use(bodyParser.json({
    limit: '10mb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}))


// routes

app.use('/api/v1/user', userRoute);

export default app;
