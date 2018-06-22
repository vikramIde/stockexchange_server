const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    storeId: { type: Number, required: true },
    storeName: { type: String, required: true },
    stateId: { type: Number, required: true }
}, {timestamps: true, versionKey: false })

const Store = mongoose.model('store', storeSchema)

module.exports = Store