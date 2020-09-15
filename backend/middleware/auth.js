const jwt = require('jsonwebtoken')

const auth = (user) => {
    return jwt.sign({ _id: user._id }, 'myjwtsecret', {
        expiresIn: '24hr'
    })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(400).send('Please Autherize')
    }
    const unToken = token.slice(7, token.length)
    const verify = jwt.verify(unToken, 'myjwtsecret', (err, decode) => {
        if (err) {
            res.status(401).send('Invalid token')
        }
        req.user = decode
        next()
    })
}

module.exports = {auth, isAuth}