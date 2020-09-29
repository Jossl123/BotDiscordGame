const Main = require('./main.js');
const weaponsConstructor = require('./weaponsConstructor.js').Functions;
let weaponsArr = require('./weaponsConstructor.js').WeaponsArr;

module.exports = {
    shop
}

function shop(){

    weaponsConstructor.createWeapons();
    
    Main.sendMessage(
`.     /(-)\\     
.   _/     \\_   
._______________`, "shop"); 

    Main.sendMessage("Hey hello adventurer. Here you can buy what you want... if you can...", "shop");
    
    for (let i = 0; i < weaponsArr.length; i++) {
        Main.sendMessage(`${weaponsArr[i].name} : health : ${weaponsArr[i].health}hp, dammage : ${weaponsArr[i].dammage}`, "shop");
    }
}