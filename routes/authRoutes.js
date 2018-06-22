const router = require('express').Router()
const user = require('../models/userAuth')
const serialize = require('../common/serialize')

// auth login
router.post('/login', (req, res) => {
    if(req.body.data){
        user.userAuth(req.body.data)
            .then((response) => {
                res.status(200)
                res.send(serialize.success(response))
            }).catch((err) => {
                res.status(400)
                res.send(serialize.error(err))
            })
    } else {
        res.status(400)
        res.send(serialize.error())
    }

})

module.exports = router