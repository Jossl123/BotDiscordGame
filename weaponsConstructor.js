const Main = require('./main');

class Weapons {
    constructor(name = "Sword", othername = "sword", health = 10, dammage = 10, cost = 0){
        this.name = name;
        this.othername = othername;
        this.health = health;
        this.dammage = dammage;
        this.cost = cost
    }
};

let WeaponsArr = [];
let WeaponsNameArr = [];

function createWeapons(){
    WeaponsArr[WeaponsArr.length] = new Weapons(
        "Sword",
        "sword",
        10,
        10,
        0
    )
    WeaponsArr[WeaponsArr.length] = new Weapons(
        "Magic Stic",
        "magicstic",
        10,
        20,
        75
    );
    WeaponsArr[WeaponsArr.length] = new Weapons(
        "Iron Sword",
        "ironsword",
        15,
        25,
        25
    );
    for (let i = 0; i < WeaponsArr.length; i++) {
        WeaponsNameArr[i] = WeaponsArr[i].othername;
    }
}

function getWeaponItem(args){
    let weaponpos = [];
    for (let i = 0; i < WeaponsArr.length; i++) {
        if(WeaponsArr[i].name == args){
            weaponpos += i;
        }
    }
    if(weaponpos.length == 1){
        return weaponpos;
    }else{
        if(weaponpos.length > 1){
            Main.sendMessage("There are to item with this name", "error");
        }else{
            Main.sendMessage("This item doesn't exist", "error");
        }
    }
};

module.exports.Functions = {
    createWeapons,
    getWeaponItem
};

module.exports.WeaponsArr = WeaponsArr;
module.exports.WeaponsNameArr = WeaponsNameArr;