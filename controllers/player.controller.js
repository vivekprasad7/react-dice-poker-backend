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
    } catch(error){
        console.error("Error while fetching players from the database:", error)
    }
}

const deleteAllPlayers = async () => {
    try {
        const deletedPlayers = await Player.find()
        await Player.deleteMany();

        console.log({ message: 'All players deleted successfully' });
        return deletedPlayers;
    } catch (error) {
        console.error('Error:', error.message);
    }
}


const getWinner = async (req, res) => {
    try {
        const players = await Player.find();

        let highestPointsPlayer = players[0];
        for (let i = 1; i < players.length; i++) {
            if (players[i].points > highestPointsPlayer.points) {
                highestPointsPlayer = players[i];
            } else if (players[i].points === highestPointsPlayer.points) {
                if (players[i].sum > highestPointsPlayer.sum) {
                    highestPointsPlayer = players[i];
                }
            }
        }
        return highestPointsPlayer;
    } catch (error) {
        console.error('Error:', error.message);
    }
}




module.exports = {
    addPlayer,
    getPlayers,
    deleteAllPlayers,
    getWinner
}