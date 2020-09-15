const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/reactcom-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})