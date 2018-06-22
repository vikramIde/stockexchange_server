const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stateSchema = new Schema({
    stateId: { type: Number, required: true },
    stateName: { type: String, required: true }
}, {timestamps: true, versionKey: false })

const State = mongoose.model('state', stateSchema)

module.exports = State