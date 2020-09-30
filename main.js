module.exports = {
    sendMessage,
    splicePlayer,
    AddPlayer
};

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const Constructor = require('./constructor.js');
const ConstructFonc = Constructor.Functions;
const PlayerConstructor = Constructor.Player;
const CommandsFonction = require('./classCommands.js');
const Shop = require('./Shop.js');
const Commands = require('./commands.js');
const weaponsConstructor = require('./weaponsConstructor').Functions;
const weaponsArr = require('./weaponsConstructor').WeaponsArr;
const { prefix, token, admin, adminTag, channelGeneral, channelWelcome, channelErrors, channelActions, channelShop} = require('./config');

let general = client.channels.cache.get(channelGeneral);
let welcome = client.channels.cache.get(channelWelcome);
let errors = client.channels.cache.get(channelErrors);
let action = client.channels.cache.get(channelActions);
let shop = client.channels.cache.get(channelShop);
let private = "";
let PlayersJson = JSON.parse(fs.readFileSync('./savePlayers.json'));
let Players = [];
let PlayersName = [];

//Toutes les actions à faire quand le bot se connecte
client.on('ready', function () {

    general = client.channels.cache.get(channelGeneral);
    welcome = client.channels.cache.get(channelWelcome);
    errors = client.channels.cache.get(channelErrors);
    action = client.channels.cache.get(channelActions);
    shop = client.channels.cache.get(channelShop);

    console.log("Mon BOT est Connecté");

    Shop.shop();

    CommandsFonction.createCommand();

    for (let i = 0; i < PlayersJson.length; i++) {
        Players[Players.length] = new PlayerConstructor(PlayersJson[Players.length].name, PlayersJson[Players.length].health, PlayersJson[Players.length].heal_potion, PlayersJson[Players.length].gold);
        PlayersName[i] = Players[i].name;
    }
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
    sendMessage(`Welcome to the server, ${member}`, "welcome");
    sendMessage(`Tape !help to see all the commands`, welcome);
    //crée un object joueur
    Players[Players.length] = new PlayerConstructor(member.user.tag);
    PlayersName[PlayersName.length] = Players[Players[Players.length - 1]].name;
    PlayersJson = fs.writeFileSync('./savePlayers.json', JSON.stringify(Players, null, 2));
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    private = message.author;
    const datefonc = new Date();
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if(message.author == admin){
        Commands.messageAdminEnter(message, datefonc, args, command, Players, admin, PlayersName);
        Commands.messageEnter(message, datefonc, args, command, Players, admin, shop, PlayersName);
    }else{
        Commands.messageEnter(message, datefonc, args, command, Players, admin, shop, PlayersName);
    }

    PlayersJson = fs.writeFileSync('./savePlayers.json', JSON.stringify(Players, null, 2));
});

function sendMessage(message, channel){
    if(channel == "private"){
        private.send("`"+message+"`");
    }
    else if(channel == "actions"){
        action.send("`"+message+"`");
    }
    else if(channel == "general"){
        general.send("`"+message+"`");
    }
    else if(channel == "welcome"){
        welcome.send("`"+message+"`");
    }
    else if(channel == "error"){
        errors.send("`"+message+"`");
    }
    else if(channel == "shop"){
        shop.send("`"+message+"`");
    }else{
        channel.send("`"+message+"`");
    }
};

function splicePlayer(playerpos){
    Players.splice(playerpos, 1);
    PlayersName.splice(playerpos, 1);
};

function AddPlayer(args){
    if(!args == ""){
        Players[Players.length] = new PlayerConstructor(args);
        PlayersName[PlayersName.length] = Players[Players.length - 1].name;
        sendMessage(`${args} have been added to the game`, "general");
    }else{
        sendMessage(`You have to write a name`, "general");
    }
}
                


setInterval(function (){Commands.Update()}, 1000);

client.login(token);
