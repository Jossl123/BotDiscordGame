const Main = require('./main');

module.exports = {
    shop
}

function shop(){
    Main.sendMessage("Hey hello adventurer. Here you can buy what you want, if you can...", "shop");
    Main.sendMessage(`   _/     \_   `, "shop");   
    Main.sendMessage(`_______________`, "shop");   
}