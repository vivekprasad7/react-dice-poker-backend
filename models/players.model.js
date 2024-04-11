const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    scoreCard:{
        type:[Number],
    },
    points:{
        type:Number,
    },
    sum:{
        type:Number,
    },
}, {timestamps: true})


const Player = mongoose.model("Player", playerSchema)

module.exports = {Player}
