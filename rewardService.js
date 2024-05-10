const NReq = require('./NReq');

const rewardService = {
    collectReward: async (playerId) => {
        // Check player level
        const playerLevel = await getPlayerLevel(playerId);
        if (playerLevel > 1) {
            return { code: 2, msg: 'player cannot collect this rewards' };
        }

        // Call API to collect reward
        const payload = { player_id: playerId };
        NReq.post('http', '<ip/localhost>:10002/first_reward/collect', payload);

        return { code: 1, msg: 'player collected this rewards' };
    }
};

// Function to get player level (mocked for example)
async function getPlayerLevel(playerId) {
    // Mocked player level retrieval
    const playerData = await getPlayerData(playerId);
    return playerData.level;
}

// Mocked function to get player data
async function getPlayerData(playerId) {
    // Assume fetching player data from database or API
    return { player_id: playerId, level: 1 };
}

module.exports = rewardService;
