const router = require('express').Router()
const stock = require('../models/stock')
const serialize = require('../common/serialize')
console.log('Hitting Stock APifine!!')

router.get('/', (req, res) => {
    try {
        if(req.query.symbol) {
            console.log('Got the Symbol fine!!')
            stock.getStockBySymbol(req.query.symbol)
                .then((response) => {
                    res.send(serialize.success(response))
                })
        }
        else {
            res.status(400)
            res.send(serialize.error(400, 'symbol Id is required field!'))
        }
    } catch(err) {
        console.log(err)
        res.status(403)
        res.send(serialize.error(403, 'Error'))
    }
})

router.get('/all', (req, res) => {
    try {
        
            console.log('Got the Symbol fine!!')
            stock.getAll()
                .then((response) => {
                    res.send(serialize.success(response))
                })
        
    } catch(err) {
        console.log(err)
        res.status(403)
        res.send(serialize.error(403, 'Error'))
    }
})

router.get('/company',(req,res)=>{
    try{

        console.log('company')
        stock.getSymbol()
            .then(response=>{
                res.send(serialize.success(response))
            })
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get('/default',(req,res)=>{
    try{
         console.log('default')
        stock.getBestPrice()
            .then(response=>{
                res.send(serialize.success(response))
            })
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router