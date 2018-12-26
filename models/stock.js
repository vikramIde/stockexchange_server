const Stock = require('../schema/stock')

const getStock = () => {
    return Stock.find().then(data => data)
}

const getStockBySymbol = (data) => {
	console.log('Hitting Stock Model fine!!')
    return Stock.find({symbol:data})
        .then((stocks) => {
        	console.log(stocks)
            if (stocks) { return stocks }
        })
}
const getAll = (data) => {
	console.log('Hitting GetAll Model fine!!')
    return Stock.find({}).limit(200)
        .then((stocks) => {
        	console.log(stocks)
            if (stocks) { return stocks }
        })
}

const getSymbol = (data) => {
	console.log('Hitting Symbol Model fine!!')

    return Stock.distinct("symbol")
        .then((symbol) => {
        	console.log(symbol)
            if (symbol) { return symbol }
        })
}

const getBestPrice = () => {
	console.log('Hitting Symbol Model fine!!')

    return Stock.find().sort({close:-1}).limit(1)
        .then((symbol) => {
        	console.log(symbol)
            if (symbol) { 
            	return getStockBySymbol(symbol[0].symbol)  
            }
        })
}

module.exports.getStockBySymbol = getStockBySymbol
module.exports.getAll = getAll
module.exports.getSymbol = getSymbol
module.exports.getBestPrice = getBestPrice
