import mongoose, { Document } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    contact: number;
    password: string;
    role: string;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    lastLogin?: Date;
    isVarified?: boolean;
    resetPasswordToken?: string,
    resetPasswordTokenExpiresIn?: Date,
    varificationToken?: string,
    verificationTokenExpiresIn?: Date,
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    address: {
        type: String,
        default: "Update your address"
    },
    city: {
        type: String,
        default: "Update your city"
    },
    country: {
        type: String,
        default: "Update your country"
    },
    profilePicture: {
        type: String,
        default: ""
    },
    admin: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresIn: Date,
    varificationToken: String,
    verificationTokenExpiresIn: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;