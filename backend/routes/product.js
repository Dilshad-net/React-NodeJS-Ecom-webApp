const express = require('express')
const router = new express.Router()
const mongoose = require('../db/mongoose')
const Product = require('../models/product')
const {auth, isAuth} = require('../middleware/auth')

router.get('/products', async (req, res) => {
    try {
        const product = await Product.find({})
        if (!product) {
            return res.status(404).send('Sorry no products')
        }
        // res.send({ products : product })
        res.send(product)
    } catch (error) {
        res.status(500).send('Internal error')
    }
})

router.post('/products', isAuth, async (req, res) => {
    try {
        const product = new Product({ 
            name: req.body.name,
            description: req.body.description, 
            price: req.body.price, 
            category: req.body.category, 
            brand: req.body.brand, 
            incount: req.body.incount
        })
        await product.save()
        res.send('Saved successfully')
    } catch (error) {
        res.status(400).send({ error: 'Some error' })
    }
})

router.get('/products/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })
    if (!product) {
        return res.status(404).send('Sorry no such product found')
    }
    res.send(product)
})

router.put('/products/:id', isAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'price', 'category', 'brand', 'incount']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        res.status(400).send('Sorry Update not valid')
    }
    try {
        const product = await Product.findOne({ _id: req.params.id })

        if (!product) {
            return res.status(404).send('Sorry no such product')
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send('Product update successfull')

    } catch (error) {
        res.status(500).send('Some internal error')
    }
})

router.delete('/products/:id', isAuth, async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findByIdAndDelete({ _id: productId})
        if (!product) {
            return res.status(404).send('sorry no suct product')
        }
        res.send('Deleted successfully')
    } catch (error) {
        res.status(500).send('Internal error')
    }
})

module.exports = router