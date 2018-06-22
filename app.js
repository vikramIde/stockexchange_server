require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const stateRoutes = require('./routes/stateRoutes')
const storeRoutes = require('./routes/storeRoutes')
const masterRatingRoutes = require('./routes/masterRatingRoutes')
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
app.use('/state', stateRoutes)
app.use('/store', storeRoutes)
app.use('/masterRating', masterRatingRoutes)

//create home route
app.get('/', (req, res) => {
    res.render('home');
})

//connect to mongoDB and start server
mongoose.connect(process.env.mongoDBURL, () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log('Web Api is now listening for request on port '+ PORT)
    })
}).catch(err => console.log('Error while connecting DB', err))