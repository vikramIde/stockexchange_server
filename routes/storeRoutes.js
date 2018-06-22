const router = require('express').Router()
const store = require('../models/store')
const serialize = require('../common/serialize')
const jwtAuth = require('../common/jwtAuth')

//create state
router.get('/', (req, res) => {
    if(jwtAuth.verifyJWT(req.get('Authorization'))) {
        const userId = jwtAuth.decodeJWT(req.get('Authorization')).userId
        if(req.query.stateId && userId) {
            store.getStore(req.query.stateId, userId)
                .then((response) => {
                    res.send(serialize.success(response))
                })
        } else {
            res.status(400)
            res.send(serialize.error(400, 'State Id is required field!'))
        }
    } else {
        res.status(403)
        res.send(serialize.error(403, 'User is not authorized to access this resource with an explicit deny!'))
    }
})

module.exports = router