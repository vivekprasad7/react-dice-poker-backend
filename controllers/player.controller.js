const {Player} = require("../models/players.model.js")

const addPlayer = async (playerData) => {
    try {
        const newPlayer = new Player(playerData)
        const savedPlayer = await newPlayer.save()

        if(savedPlayer){
            console.log("Player Saved Successfully: ", savedPlayer);
            return savedPlayer;
        } else {
            console.log("Unable to add player to DB")
        }
        
    } catch (error) {
        console.error("Error while saving the player", error.message)
    }
}


const getPlayers = async () => {
    try{
        const allPlayers = await Player.find()
        console.log("Players Fetched Successfully from DB,", allPlayers)
        return allPlayers
    } catch(errpr){
        console.error("Error while fetching players from the database:", error.message)
    }
}

const deleteAllPlayers = async (req, res) => {
    try {
        await Player.deleteMany();

        res.status(200).json({ message: 'All players deleted successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const getWinner =  async (req, res) =>  {
    try {
        const players = await Player.find();

        let highestPointsPlayer = players[0];
        for (let i = 1; i < players.length; i++) {
            if (players[i].points > highestPointsPlayer.points) {
                highestPointsPlayer = players[i];
            }
        }
        res.json(highestPointsPlayer);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    addPlayer,
    getPlayers,
    deleteAllPlayers,
    getWinner
}