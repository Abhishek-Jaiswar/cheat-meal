import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized request"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await User.findById(decoded?.userId)
        if (!user) {
            return res.status(401).json({
                message: "Invalid access token"
            })
        }

        req.user = user;
        next()

    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token.' });
    }
}