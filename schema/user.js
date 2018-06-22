const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userId: { type: Number, required: true },
    userName: { type: String, required: true },
    typeOfLogin: { type: String, required: true },
    accessToken: { type: String, required: true },
    profileImageUrl: { type: String, required: true }
}, {timestamps: true, versionKey: false })

const User = mongoose.model('user', userSchema)

module.exports = User