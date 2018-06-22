const router = require('express').Router()
const state = require('../models/state')
const serialize = require('../common/serialize')
const jwtAuth = require('../common/jwtAuth')

//create state
router.get('/', (req, res) => {
    if(jwtAuth.verifyJWT(req.get('Authorization'))) {
        state.getState()
            .then((response) => {
                res.send(serialize.success(response))
            })
    } else {
        res.status(403)
        res.send(serialize.error(403, 'User is not authorized to access this resource with an explicit deny!'))
    }
})

module.exports = router