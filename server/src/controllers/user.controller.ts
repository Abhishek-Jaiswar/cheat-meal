import { Request, Response } from "express"
import User from "../models/user.model";
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import cloudinary from "../services/cloudinary";
import { generateVerificationCode } from "../services/generateVerificationCode";
import { generateToken } from "../services/generateToken";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password, contact, } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists with this email.",
                success: false
            })
        }

        const hashPassword = bcrypt.hash(password, 10);

        const varificationToken = generateVerificationCode();

        user = await User.create({
            username,
            email,
            password: hashPassword,
            contact: contact.Number(),
            varificationToken,
            verificationTokenExpiresIn: Date.now() * 24 * 60 * 60 * 1000
        })

        // generate token
        generateToken(res, user);

        // await sendVerificationEmail(email, verificationToken)

        const userWithOutPassword = await User.findOne({ email }).select("-password")

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            user: userWithOutPassword
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, contact, password } = req.body;

        if (!email || !contact || !password) {
            return res.status(401).json({
                message: "All the fields are required.",
                success: false
            })
        }

        const userExists = await User.findOne({
            $or: [{ email: email }, { contact: contact }]
        })
        if (!userExists) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            })
        }

        userExists.lastLogin = new Date();
        await userExists.save()

        const userWithOutPassword = await User.findOne({ email }).select("-password")

        return res.status(200).json({
            message: "Welcome back",
            user: userWithOutPassword
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { verificationCode } = req.body;

        const user = await User.findOne({
            varificationToken: verificationCode,
            verificationTokenExpiresIn: { $gt: Date.now() }
        }).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Invalid or expired verification token",
                success: false
            })
        }

        user.isVarified = true;
        user.varificationToken = undefined;
        user.verificationTokenExpiresIn = undefined;

        await user.save();

        // send welcome email
        // await sendWelcomeEmail(user.email, user.username);

        return res.status(200).json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const logout = async (_: Request, res: Response) => {
    try {
        return res.clearCookie("token").status(200).json({
            message: "Logged out successfull",
            success: true
        })
    } catch (error) {
        return res.status(200).json({
            message: "Failed to logout",
            success: true
        })
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User dosen't exist.",
                success: false
            })
        }

        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpiresIn = new Date(Date.now() * 1 * 60 * 60 * 1000);

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresIn = resetTokenExpiresIn;

        await user.save();

        // send password reset email 
        // await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`)

        return res.status(200).json({
            message: "Password reset link sent to your email",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "Failed to send reset link",
            success: true
        })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresIn: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(404).json({
                message: "Invalid or expired reset token",
                success: false
            })
        };

        const hashedPassword = await bcrypt.hash(newPassword, user.password);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresIn = undefined;

        // send successfull reset email

        // await sendSuccessResetEmail(user.email)

        return res.status(200).json({
            message: "Password reseted successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "Failed to reset password",
            success: true
        })
    }
}

export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "Failed to check auth",
            success: true
        });
    };
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.id;

        const { username, email, address, city, country, profilePicture } = req.body;
        //upload image on cloudinary

        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);
        const updateData = { username, email, address, city, country, profilePicture };

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "Invalid user id",
                success: false
            });
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "Failed to update profile",
            success: true
        });
    };
};