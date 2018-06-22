const router = require('express').Router()
const rating = require('../models/masterRating')
const serialize = require('../common/serialize')
const jwtAuth = require('../common/jwtAuth')

//create state
router.post('/', (req, res) => {
    if(req.body.data){
        if(jwtAuth.verifyJWT(req.get('Authorization'))) {
            const userId = jwtAuth.decodeJWT(req.get('Authorization')).userId
            rating.masterRating(req.body.data, userId)
                .then((response) => {
                    res.send(serialize.success(response))
                })
        } else {
            res.status(403)
            res.send(serialize.error(403, 'User is not authorized to access this resource with an explicit deny!'))
        }
    } else {
        res.status(400)
        res.send(serialize.error())
    }
})

router.get('/', (req, res) => {
    if(jwtAuth.verifyJWT(req.get('Authorization'))) {
        rating.getRating()
            .then((response) => {
                res.send(serialize.success(response))
            })
    } else {
        res.status(403)
        res.send(serialize.error(403, 'User is not authorized to access this resource with an explicit deny!'))
    }
})

module.exports = router