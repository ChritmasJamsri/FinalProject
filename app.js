const express = require('express');
const { MongoClient } = require('mongodb');
const NReq = require('./NReq');
const playerService = require('./playerService');
const rewardService = require('./rewardService');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB configuration
const db_protocol = 'mongodb+srv://';
const db_path = '/';
const db_host = 'pxmp.oiy2muw.mongodb.net';
const db_url = `${db_protocol}${db_host}${db_path}`;

const authuser = {
    username: 'krisamas1996',
    password: 'pump0624502045'
};

const authmech = 'SCRAM-SHA-1';

const options = {
    auth: authuser,
    authMechanism: authmech
};

// MongoDB connection function
function connectMongo() {
    const client = new MongoClient(db_url, options);
    return client.connect();
}

// API endpoints
app.use(express.json());

app.post('/player/get/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    try {
        const playerData = await playerService.getPlayerById(playerId);
        res.json(playerData);
    } catch (error) {
        console.error('Error getting player data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/reward/collect', async (req, res) => {
    const playerId = req.body.player_id;
    try {
        const result = await rewardService.collectReward(playerId);
        res.json(result);
    } catch (error) {
        console.error('Error collecting reward:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
