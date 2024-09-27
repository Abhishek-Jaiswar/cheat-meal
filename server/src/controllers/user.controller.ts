import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { set } from "mongoose";

export const registerHandler = async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                message: "Fill all the required fields"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        const randomId = () => {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            return numbers[randomIndex];
        };

        const cheatMealRandomId = (idLength: number) => {
            let cheatMealId = "";
            for (let i = 0; i < idLength; i++) {
                cheatMealId += randomId();
            }
            return cheatMealId;
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashPassword,
            email,
            cheatMealId: "@CM" + cheatMealRandomId(5)
        });

        return res.status(200).json({
            message: "User created successfully",
            newUser
        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Failed to register user"
        });
    }
};


export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, cheatMealId, password } = req.body;

        if ((!email && !cheatMealId) || !password) {
            return res.status(400).json({
                message: "Please fill all the details"
            })
        }

        const user = await User.findOne({
            $or: [{ email: email }, { cheatMealId: cheatMealId }]
        })
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const isValidPassword = bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            })
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET!,
            { expiresIn: '1h' } 
        );

        res.cookie("authToken", token, 
            {   
                httpOnly: true,
                secure: true
            }
        )

        return res.status(200).json({
            message: "Login successfuly",
            user: {
                id: user._id,
                cheatMealId: user.cheatMealId,
                role: user.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Login failed"
        })
    }
}

export const logout = async (req: any, res: Response) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    authToken: undefined
                }
            },
            {
                new: true
            }
        );

        return res.status(200).clearCookie('authToken', {
            secure: true,
            httpOnly: true
        })
        .json({
            message: "User logged out"
        })

    } catch (error) {
        
    }
}