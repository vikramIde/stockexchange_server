const mongoose = require('mongoose')

const Schema = mongoose.Schema

const masterRatingSchema = new Schema({
    stateId: { type: Number, required: true },
    storeId: { type: Number, required: true },
    userId: { type: String, required: true },
    value: { type: Number, required: true }
}, {timestamps: true, versionKey: false })

const MasterRating = mongoose.model('masterRating', masterRatingSchema)

module.exports = MasterRating