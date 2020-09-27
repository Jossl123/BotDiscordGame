const Main = require('./main');

module.exports.Player = class Player {
    constructor(name = "default", health = 100) {
        this.name = name;
        this.health = health;
        this.heal_potion = 10;
        this.gold = 100;
        this.weapon = new Weapons();
    }
    takeDammage(attaquant, Players){
        Main.sendMessage(`${attaquant.name} a fait perdre ${attaquant.weapon.dammage} hp à ${this.name}`, "actions");
        this.health -= attaquant.weapon.dammage;
        if(this.health <= 0){
            Main.sendMessage(`${this.name} est mort`, "actions");
            Main.splicePlayer(getPlayerProfil(this.name, Players));
        }
    }
    heal(){
        this.health += this.heal_potion;
        Main.sendMessage(`${this.name} s'est soigné de ${this.heal_potion}hp`, "actions");
    }
};

class Weapons {
    constructor(name = "Sword", health = 10, dammage = 50){
        this.name = name;
        this.health = health;
        this.dammage = dammage;
    }
};

module.exports.Functions = {
    getStatsPlayer,
    getPlayerProfil
}

function getStatsPlayer(playertag, Players, args){
    const i = getPlayerProfil(playertag, Players);
    if(args == ""){
        Main.sendMessage(`Vous êtes ${Players[i].name} et vous avez ${Players[i].health}hp `, "general");
    }else{
        Main.sendMessage(`${Players[i].name} a ${Players[i].health}hp `, "general");
    }
}

function getPlayerProfil(playertag, Players){
    let i = 0
    let playerpos = [];
    for (let i = 0; i < Players.length; i++) {
        if(Players[i].name == playertag){
            playerpos += i;
        }
    }
    if(playerpos.length == 1){
        return playerpos;
    }else{
        if(playerpos.length > 1){
            Main.sendMessage("Your user tag collapsed with another", "error");
        }else{
            Main.sendMessage("Your user tag is not referenced", "error");
        }
    }
};
