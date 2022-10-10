const mongoose = require('mongoose')

const fishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: String,
    locality: {type: Array, required: true },
    bait: { type: Array, required: true },
    minimumSize: {type: String, required: true},
    bagLimit: { type: String, required: true},
    description: String
})

const Fish = mongoose.model('Fish', fishSchema)


module.exports = Fish


