const dotenv = require("dotenv")
dotenv.config({
    path:'./.env'
})

const {Player} = require("./models/players.model.js")


require("./db/db.connect.js")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const playerRouter = require("./routes/player.routes.js")


const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use("/players", playerRouter);



app.get("/",(req, res) => {
    res.send("Hello")
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({error: "Something went wrong."})
})

app.use((req, res) => {
    res.status(404).json({error:"Route Not Found"})
})

app.listen(`${PORT}`, () => {
    console.log(`Server is running on port: ${PORT}`)
})