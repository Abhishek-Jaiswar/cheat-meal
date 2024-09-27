import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../models/user.model";

export const generateToken = (res: Response, user: IUser) => {
    const token = jwt.sign(
        { userId: user },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
    );

    res.cookie("token", token,
        {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }
     )

     return token;
}