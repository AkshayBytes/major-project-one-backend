const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    productImgUrl: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productStarRating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productActualPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productSize: [
        {
            type: String,
            enum: ["S", "M", "XL", "XXL"]
        }
    ],
    description: {
        type: String,
        required: true
    },
    // categoriesArray: { type: mongoose.Schema.Types.ObjectId, ref: "theCategry"},
},
{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;