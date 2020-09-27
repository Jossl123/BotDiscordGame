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
        Main.sendMessage(`For every commands don't forget to put the prefix "!" (for example : !mycommand)`);
        for (let i = 0; i < CommandsArr.length; i++) {
            Main.sendMessage(`${CommandsArr[i].name} : ${CommandsArr[i].descriptionresume}`);
        }
    }else if(getCommand(args) != false){
        i = getCommand(args);
        if(CommandsArr[i].description != "none"){
            Main.sendMessage(`${CommandsArr[i].name} : ${CommandsArr[i].descriptionresume}`);
            Main.sendMessage(`${CommandsArr[i].description}`);
        }else{
            Main.sendMessage(`${CommandsArr[i].name} : ${CommandsArr[i].descriptionresume}`);
        }
    }else{
        Main.sendMessage(`This command doesn't exist`);
    }
}

function createCommand(){
    CommandsArr[CommandsArr.length] = new Commands(
        "hour",
        "Give you the current hour"
    )
    CommandsArr[CommandsArr.length] = new Commands(
        "date",
        "Give you the current date"
    )
    CommandsArr[CommandsArr.length] = new Commands(
        "sethour",
        "Change the hour of the auto message",
        "Every days a message was send at the hour you choose"
    )
}

module.exports = {
    getCommand,
    help,
    createCommand
}