const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: [true, "This field is required"]
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true
    },password: {
        type: String,
        require: [true, "password is required"],
    },token :{
        type: String
    },
    isAdmin :{
        type: Boolean,
        default: false
    },
    verify: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

const allUser = mongoose.model("Users", userSchema);

module.exports = allUser;