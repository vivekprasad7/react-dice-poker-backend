const express = require("express")

const {
    addPlayer,
    getPlayers,
    deleteAllPlayers,
    getWinner
} = require("../controllers/player.controller.js")

const playerRouter = express.Router()

playerRouter.get("/", async(req, res) => {
    try {
        const players = await getPlayers()
        res.status(200).json({message:"Players Retrieved Successfully"})
    } catch (error) {
        res.status(500).json({error:"Failed to retrieve players from the database", error})
    }
})

playerRouter.post("/", async(req, res) => {
    try {
        const { playerData} = req.body;
        const addedPlayer = await addPlayer(playerData)
        if (addedPlayer) {
            res.status(200).json({ message: "Player added successfully", addedPlayer });
          } else {
            res.status(404).json({ message: "Failed to Add Player to DB" });
          }
    } catch (error) {
            res.status(500).json({message:"Error while adding player to DB"})
    }
})

playerRouter.delete("/", async (req, res) => {
    try {
        const result = await playerController.deleteAllPlayers();
        res.status(200).json({ message: "All players deleted successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete all players", error });
    }
});

playerRouter.get("/winner", async (req, res) => {
    try {
        const winner = await playerController.getWinner();
        res.status(200).json({ message: "Winner Retrieved Successfully", winner });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve winner", error });
    }
});


module.exports = playerRouter;