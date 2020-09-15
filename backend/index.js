const express = require('express');
require('./db/mongoose')
import data from './data';
const bodyParser = require('body-parser')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')

const app = express()
app.use(express.json())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(bodyParser.text({type: 'text/html'}))
const port = process.env.PORT || 5000

app.use('/api', userRouter)
app.use('/api', productRouter)

// app.get('/api/products', (req,res) => {
//     res.send(data.products)
// })

// app.get('/api/products/:id', async (req, res) => {
//     const id = req.params.id
//     const product = await data.products.find(x=> x._id === id)
//     if(!product){
//         return res.status(404).send({msg: 'Not found'})
//     }
//     res.send(product)
// })

app.listen(port, () => {
    console.log('listening at ', port)
})