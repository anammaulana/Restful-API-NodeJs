const express = require('express')
const app = express()
const port = 3000
//import body parser
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//import route posts
const photosRouter = require('./routes/photos');
app.use('/api/photos', photosRouter); // use route posts di Express

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})