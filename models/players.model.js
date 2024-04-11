const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    scoreCard:{
        type:[Number],
        required:true
    },
    points:{
        type:Number,
        required:true
    }
    
}, {timestamps: true})


const Player = mongoose.model("Player", playerSchema)

module.exports = Player
