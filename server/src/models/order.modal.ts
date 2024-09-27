import mongoose from "mongoose";

type TDeliveryDetails = {
    email: string;
    name: string;
    address: string;
    city: string;
}

type TCartItems = {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number
}

export interface IOrder {
    user: mongoose.Schema.Types.ObjectId;
    restaurant: mongoose.Schema.Types.ObjectId;
    deliveryDetails: TDeliveryDetails;
    cartItems: TCartItems;
    totalAmount: number;
    status: "pending" | "delivered" | "preparing" | "outfordelivery" | "confirmed";
}

const orderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    deliveryDetails: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
    },
    cartItems: [{
        menuId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "preparing", "outfordelivery", "confirmed"],
        required: true
    }
})

export const Order = mongoose.model("Order", orderSchema);