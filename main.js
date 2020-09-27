module.exports = {
    sendMessage,
    splicePlayer,
    AddPlayer
};

const Discord = require('discord.js');
const client = new Discord.Client();
const Constructor = require('./constructor');
const PlayerConstructor = Constructor.Player;
const CommandsFonction = require('./classCommands');
const Commands = require('./commands');
const Maps = require('./mapConstructor');
const { prefix, token, admin, adminTag, channelGeneral, channelWelcome, channelErrors, channelActions} = require('./config');

let general = client.channels.cache.get(channelGeneral);
let welcome = client.channels.cache.get(channelWelcome);
let errors = client.channels.cache.get(channelErrors);
let action = client.channels.cache.get(channelActions);
let private = "";
let Players = [];

//Toutes les actions à faire quand le bot se connecte
client.on('ready', function () {

    general = client.channels.cache.get(channelGeneral);
    welcome = client.channels.cache.get(channelWelcome);
    errors = client.channels.cache.get(channelErrors);
    action = client.channels.cache.get(channelActions);

    console.log("Mon BOT est Connecté");
    sendMessage(`Tape !help to see all the commands`, welcome);

    Players[Players.length] = new PlayerConstructor(adminTag);

    CommandsFonction.createCommand();
})

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
    sendMessage(`Welcome to the server, ${member}`, "welcome");
    //crée un object joueur
    Players[Players.length] = new PlayerConstructor(member.user.tag);
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    private = message.author;
    const datefonc = new Date();
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if(message.author == admin){
        Commands.messageAdminEnter(message, datefonc, args, command, Players, admin);
        Commands.messageEnter(message, datefonc, args, command, Players, admin);
    }else{
        Commands.messageEnter(message, datefonc, args, command, Players, admin);
    }
});

function sendMessage(message, channel){
    if(channel == "private"){
        private.send("`"+message+"`");
    }else{
        if(channel == "actions"){
            action.send("`"+message+"`");
        }
        if(channel == "general"){
            general.send("`"+message+"`");
        }
        if(channel == "welcome"){
            welcome.send("`"+message+"`");
        }
        if(channel == "error"){
            errors.send("`"+message+"`");
        }
    }
};

function splicePlayer(playerpos){
    Players.splice(playerpos, 1);
};

function AddPlayer(args){
    if(!args == ""){
        Players[Players.length] = new PlayerConstructor(args);
        sendMessage(`${args} vient d'être ajoutée`, "general");
    }else{
        sendMessage(`Vous devez indiquer un nom`, "general");
    }
}

setInterval(function (){Commands.Update()}, 1000);


client.login(token);
