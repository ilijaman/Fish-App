const mongoose = require('mongoose')

const fishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: File, required: true },
    locality: {type: String, required: true },
    bait: { type: String, required: true },
    minimumSize: {type: String, required: true},
    bagLimit: { type: String, required: true},
    description: String
})

const Fish = mongoose.model('Fish', fishSchema)


module.exports = Fish


