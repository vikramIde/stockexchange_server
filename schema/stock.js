const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema({
    date: { type: String, required: true },
    symbol: { type: String, required: true },
    open: { type: String, required: true },
    close: { type: Number, required: true },
    low: { type: Number, required: true },
    high: { type: Number, required: true },
    volume: { type: Number, required: true },
}, {timestamps: true, versionKey: false })

const Stocks = mongoose.model('stocks6', stockSchema)

module.exports = Stocks