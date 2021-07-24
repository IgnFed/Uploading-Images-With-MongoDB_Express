const express = require('express')
const app = express()
const {connect} = require('mongoose')
const handler = require('./handlers')
const Cors = require('./cors')
// Mongoose.connect
connect("mongodb://localhost:27017/products",{
      useNewUrlParser: true,
      useUnifiedTopology: true
   }, err=>err?console.log('CONNECTION REFUSE'):console.log('STABLE CONNECTION'));


//CONFIGS
const port = 3000

//MIDDLEWARES


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(Cors);

app.use('/products', require('./routes/products.routes'))
app.use('/public', express.static('public'));
app.use(express.raw({ limit: '1mb', type: ['image/png', 'image/jpg', 'image/jpeg'] }))
app.use(handler.processFileSize)





app.listen(port, ()=>{console.log(`Listening on http://localhost:${port}/`)})