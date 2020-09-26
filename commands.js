module.exports = {
    messageAdminEnter,
    messageEnter,
    Update
}

const Main = require('./main.js');
const ConstructFonc = require('./constructor').Fonctions;

let heure = 12;
let minute = 0;
let heurepassé = false;

function messageEnter(message, datefonc, args, command, Players){

    if(command == "playerlist"){
        for (let i = 0; i < Players.length; i++) {
            Main.sendMessage("`"+`${i + 1} - ${Players[i].name}`+"`");
        }
    }

    if(command == "stats"){
        if(args == ""){
            ConstructFonc.getStatsPlayer(message.author.tag, Players,args);
        }else{
            ConstructFonc.getStatsPlayer(args, Players, args);
        }
    }

    if(command == "ping"){
        message.channel.send("pong");
    }

    if(command == "hour")
    {
        message.channel.send(`Il est : ${datefonc.getHours()}h${datefonc.getMinutes()}`);
    }
    if(command == "date")
    {
        let mois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
        let jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        message.channel.send(`Nous sommes le ${jours[datefonc.getDay() - 1]} ${datefonc.getDate()} ${mois[datefonc.getMonth()]} ${datefonc.getFullYear()}`); 
    }

};

function messageAdminEnter(message, datefonc, args, command, Players){
    
    if(command == "sethour"){
        if(parseInt(args[0]) && parseInt(args[1]) || args[0] == 0 && parseInt(args[1]) || parseInt(args[0]) && args[1] == 0){
            if(0 <= args[0] && args[0] <= 23){
                if(0 <= args[1] && args[1] <= 59){
                    heure = args[0];
                    minute = args[1];
                    message.channel.send(`L'heure d'envoie du message auto à bien été changée pour ${heure}h${minute}`)
                }else{
                    message.channel.send("Vous devez indiquer des minutes valable (entre 0 et 59 inclus)");
                }
            }else{
                message.channel.send("Vous devez indiquer une heure valable (entre 0 et 23 inclus)");
            }
        }else{
            message.channel.send("Vous devez indiquer une heure et des minutes (par exemple !sethour 10 15 (10h et 15min))");
        }
    }

    if(command == "heal"){
        Players[ConstructFonc.getPlayerProfil(message.author.tag, Players)].heal();
    }

    if(command == "dammage"){
        Players[ConstructFonc.getPlayerProfil(args, Players)].takeDammage(Players[ConstructFonc.getPlayerProfil(message.author.tag, Players)], Players);
    }

    if(command == "addplayer"){
        Main.AddPlayer(args[0]);
    }
};

function Update(){
  
    const datefonc = new Date();

    if(datefonc.getHours()==heure && datefonc.getMinutes()==minute && heurepassé == false){
        heurepassé = true;
        Main.sendMessage("c'est l'heure");
    }
    else if(datefonc.getHours()==heure && datefonc.getMinutes()== minute+1 && heurepassé == true){
        heurepassé = false;
        return
    }
};
