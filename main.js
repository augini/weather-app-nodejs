if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//Call the secret key and dependencies
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const axios = require('axios')

//Call the dependencies
const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
    axios({
        url: url,
        responseType: 'json',
    }).then(data => res.json(data.data))
})


app.listen(5000, () => {
    console.log("Server started")
})