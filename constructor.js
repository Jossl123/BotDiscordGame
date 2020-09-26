const Main = require('./main');

module.exports.Player = class Player {
    constructor(name = "default", health = 100, speed = 10) {
        this.name = name;
        this.health = health;
        this.speed = speed;
        this.weapon = new Weapons();
        this.heal_potion = 10;
    }
    display(){
        Main.sendMessage(`${this.name} ${this.health} ${this.speed}`);
    }
    takeDammage(attaquant, Players){
        Main.sendMessage(`${attaquant.name} a fait perdre ${attaquant.weapon.dammage} hp à ${this.name}`);
        this.health -= attaquant.weapon.dammage;
        if(this.health <= 0){
            Main.sendMessage(`${this.name} est mort`);
            Main.splicePlayer(getPlayerProfil(this.name, Players));
        }
    }
    heal(){
        this.health += this.heal_potion;
        Main.sendMessage(`${this.name} s'est soigné de ${this.heal_potion}hp`);
    }
};

class Weapons {
    constructor(name = "Sword", health = 10, dammage = 50){
        this.name = name;
        this.health = health;
        this.dammage = dammage;
    }
};

module.exports.Fonctions = {
    getStatsPlayer,
    getPlayerProfil
}

function getStatsPlayer(playertag, Players, args){
    const i = getPlayerProfil(playertag, Players);
    if(args == ""){
        Main.sendMessage(`Vous êtes ${Players[i].name} et vous avez ${Players[i].health}hp `);
    }else{
        Main.sendMessage(`${Players[i].name} a ${Players[i].health}hp `);
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
            Main.sendMessage("Your user tag collapsed with another");
        }else{
            Main.sendMessage("Your user tag is not referenced");
        }
    }
};
