module.exports = {
    generateMap
};

function generateMap(bot){
    channel = bot.channels.cache.find(ch => ch.name === 'map')
};