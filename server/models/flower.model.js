const mongoose = require("mongoose");

const FlowerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required!"],
        },
        image_url: {
            type: String,
            required: [true, "Image URL is required!"],
        },
        description: {
            type: String,
        },
        categorie: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "Price is required!"],
        },
        stock: {
            type: Number,
            required: [true, "Stock is required!"],
        },
    },
    { timestamps: true }
);

const Flower = mongoose.model("Flower", FlowerSchema);

module.exports = Flower;
