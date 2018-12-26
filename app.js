require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const stateRoutes = require('./routes/stateRoutes')
const masterStockRoutes = require('./routes/masterStockRoutes')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
//cors for all route
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//set up view engine
app.set('view engine', 'ejs')

//set up routes
app.use('/auth', authRoutes)
app.use('/stock', masterStockRoutes)

//create home route
app.get('/', (req, res) => {
    res.render('home');
})

// var upload = require('./upload.js');
// app.post('/', upload.post);
// console.log(mongoose)
//connect to mongoDB and start server
mongoose.connect(process.env.mongoDBURL, () => {

    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log('Web Api is now listening for request on port '+ PORT)
    })
}).catch(err => console.log('Error while connecting DB', err))