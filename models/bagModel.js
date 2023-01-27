const mongoose = require("mongoose");

const bagSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
     image: {
        type: String,
        required: true
    },
        price: {
            type: String,
            required: true
        },
    cloudId: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

const bagPage = mongoose.model("bagPage", bagSchema);

module.exports = bagPage;