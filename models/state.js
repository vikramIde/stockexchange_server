const State = require('../schema/state')

const getState = () => {
    return State.find().then(data => data)
}

module.exports.getState = getState
