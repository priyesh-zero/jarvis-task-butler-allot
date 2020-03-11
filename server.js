const express = require('express')
const app = express()

// Using .json middleware to parse body for post data
app.use(express.json())

// Api routes directed to routes/api.js
app.use('/api', require('./routes/api'))

// Setting up a static folder
app.use(express.static('public'))

// Creating a route for home page
app.get('/', (request, response) => {
	response.sendFile("index.html")
})
app.listen('3000', (err, success) => {
	if(err) throw err
	console.log(`We are live on port 3000`)
})
