const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        total: {
            type: Number,
            required: [true, "Total is required!"],
        },
        status: {
            type: String,
            enum: ['Delivered', 'Pending', 'Canceled' , 'Not Purchased'],
            default: 'Pending'
        },
        flowers: [{
            flowerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Flower',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
