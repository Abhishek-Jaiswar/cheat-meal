import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}