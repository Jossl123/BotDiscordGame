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
const { prefix, token, admin, adminTag, channelGeneral, channelWelcome} = require('./config');

let channel = client.channels.cache.get(channelGeneral);
let Players = [];

//Toutes les actions à faire quand le bot se connecte
client.on('ready', function () {
    channel = client.channels.cache.get(channelGeneral);
    console.log("Mon BOT est Connecté");
    sendMessage(`Tape !help to see all the commands`);
    Players[Players.length] = new PlayerConstructor(adminTag);
    CommandsFonction.createCommand();
})

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.get(channelWelcome);
    if (!channel) console.log("channel non trouvé");
    channel.send(`Welcome to the server, ${member}`);

    //crée un object joueur
    Players[Players.length] = new PlayerConstructor(member.user.tag);
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const datefonc = new Date();
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if(message.member.user.id == admin){
        Commands.messageAdminEnter(message, datefonc, args, command, Players);
        Commands.messageEnter(message, datefonc, args, command, Players);
    }else{
        Commands.messageEnter(message, datefonc, args, command, Players);
    }
});

function sendMessage(message){
    channel.send("`"+message+"`");
};

function splicePlayer(playerpos){
    Players.splice(playerpos, 1);
};

function AddPlayer(args){
    if(!args == ""){
        Players[Players.length] = new PlayerConstructor(args);
        sendMessage(`${args} vient d'être ajoutée`);
    }else{
        sendMessage(`Vous devez indiquer un nom`);
    }
}

setInterval(function (){Commands.Update()}, 1000);


client.login(token);
