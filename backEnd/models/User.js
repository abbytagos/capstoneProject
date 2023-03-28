const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        deliveryaddres: {type: String, required: false, default:""},
        phonenumber: {type: String, required: false, default:""},
        isAdmin: {
            type: Boolean,
            default: false, 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);