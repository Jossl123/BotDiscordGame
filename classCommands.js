const Main = require('./main');

let CommandsArr = [];

class Commands {
    constructor(name = "none", descriptionresume = "none", description = "none"){
        this.name = name;
        this.descriptionresume = descriptionresume;
        this.description = description;
    }
};

function getCommand(args){
    let soluc = false
    for (let i = 0; i < CommandsArr.length; i++) {
        if(CommandsArr[i].name == args){
            soluc = i
        };
    };
    return soluc;
}

function help(args){
    if(args == ""){
        Main.sendMessage(`For every commands don't forget to put the prefix "!" (for example : !mycommand)`, "private");
        Main.sendMessage(`To put arguments, just write your command and a space between every arguments (for example : !command arg1 arg2)`, "private");
        for (let i = 0; i < CommandsArr.length; i++) {
            Main.sendMessage(`${CommandsArr[i].name} : ${CommandsArr[i].descriptionresume}`, "private");
        }
    }else if(getCommand(args) != false){
        i = getCommand(args);
        if(CommandsArr[i].description != "none"){
            Main.sendMessage(`${CommandsArr[i].name} : ${CommandsArr[i].descriptionresume}`, "private");
            Main.sendMessage(`${CommandsArr[i].description}`);
        }else{
            Main.sendMessage(`${CommandsArr[i].name} : ${CommandsArr[i].descriptionresume}`, "private");
        }
    }else{
        Main.sendMessage(`This command doesn't exist`, "private");
    }
}

function createCommand(){
    CommandsArr[CommandsArr.length] = new Commands(
        "hour",
        "Give you the current hour"
    );
    CommandsArr[CommandsArr.length] = new Commands(
        "date",
        "Give you the current date"
    );
    CommandsArr[CommandsArr.length] = new Commands(
        "stats",
        "Give you the stats of the player you choose",
        "Put in argument the tag of the player you want to see the stats. Doesn't put arguments to see your stats"
    );
    CommandsArr[CommandsArr.length] = new Commands(
        "playerlist",
        "Give you all the registred players"
    );
    CommandsArr[CommandsArr.length] = new Commands(
        "sethour",
        "Change the hour of the auto message",
        "Put in arguments in first position : the hour, in second position : the minutes"
    );
    CommandsArr[CommandsArr.length] = new Commands(
        "buy",
        "In the shop, you can replace your weapon by buy it with gold",
        "Put in arguments the name of the item you want"
    );
    
}

module.exports = {
    getCommand,
    help,
    createCommand
}