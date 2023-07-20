const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    email: String,
    password: String
    },
    {
        timestamps: true
    }
)

const UsersModel = mongoose.model("users", userSchema);

module.exports = {
    UsersModel
}