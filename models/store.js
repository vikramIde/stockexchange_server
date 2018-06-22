const Store = require('../schema/store')
const masterRating = require('../schema/masterRating')
var moment = require('moment')

const today = moment().startOf('day')
const tomorrow = moment(today).endOf('day')

const getStore = (stateId, userId) => {
    return masterRating.find({ stateId: stateId, userId: userId, updatedAt: {$gte: today.toDate(),$lt: tomorrow.toDate()}})
        .then((data) => {
            const ratedStoreId = data.map(element => element.storeId)
            return Store.find({stateId: stateId, storeId: { $nin: ratedStoreId }}).then(data => data)
        })
}

module.exports.getStore = getStore
