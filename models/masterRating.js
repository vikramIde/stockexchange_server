const MasterRating = require('../schema/masterRating')
var moment = require('moment')

const today = moment().startOf('day')
const tomorrow = moment(today).endOf('day')

const masterRating = (data, userId) => {
    return MasterRating.findOne({storeId: data.attributes.storeId, userId: userId, updatedAt: {$gte: today.toDate(),$lt: tomorrow.toDate()}})
        .then((currentRating) => {
            if (currentRating) { return currentRating }
            return new MasterRating({
                stateId: data.attributes.stateId,
                storeId: data.attributes.storeId,
                userId: userId,
                value: data.attributes.value
                })
                .save()
                .then(newRating => newRating)
        })
}

const getRating = () => {
    return MasterRating.find({updatedAt: {$gte: today.toDate(),$lt: tomorrow.toDate()}})
        .then(data => data)
}

module.exports.masterRating = masterRating
module.exports.getRating = getRating