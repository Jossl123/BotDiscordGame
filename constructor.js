const Main = require('./main');
const WeaponsArr = require('./weaponsConstructor').WeaponsArr;

module.exports.Player = class Player {
    constructor(name = "default", health = 100, heal_potion = 10, gold = 100, weapon = WeaponsArr[0]) {
        this.name = name;
        this.health = health;
        this.heal_potion = heal_potion;
        this.gold = gold;
        this.weapon = weapon;
        this.inventaire = []
        this.inventaire[0] = this.weapon;
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
    NewWeapon(name, health, dammage){
        this.weapon = new WeaponsConstructor(name, health, dammage);
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
        Main.sendMessage(`Voici votre inventaire : ${Players[i].inventaire}`, "general");
    }else{
        Main.sendMessage(`${Players[i].name} a ${Players[i].health}hp `, "general");
    }
}

function getPlayerProfil(playertag, Players){
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
