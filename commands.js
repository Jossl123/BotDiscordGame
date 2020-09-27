module.exports = {
    messageAdminEnter,
    messageEnter,
    Update
}

const Main = require('./main.js');
const ConstructFonc = require('./constructor').Functions;
const CommandsFunctions = require('./classCommands');
const { sendMessage } = require('./main.js');

let heure = 12;
let minute = 0;
let heurepassé = false;

function messageEnter(message, datefonc, args, command, Players){

    if(command == "help"){
        CommandsFunctions.help(args);
    }

    if(command == "playerlist"){
        for (let i = 0; i < Players.length; i++) {
            Main.sendMessage("`"+`${i + 1} - ${Players[i].name}`+"`", "general");
        }
    }

    if(command == "stats"){
        if(args == ""){
            ConstructFonc.getStatsPlayer(message.author.tag, Players,args);
        }else{
            ConstructFonc.getStatsPlayer(args, Players, args);
        }
    }

    if(command == "hour")
    {
        Main.sendMessage(`Il est : ${datefonc.getHours()}h${datefonc.getMinutes()}`, "general");
    }

    if(command == "date")
    {
        let mois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
        let jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        Main.sendMessage(`Nous sommes le ${jours[datefonc.getDay() - 1]} ${datefonc.getDate()} ${mois[datefonc.getMonth()]} ${datefonc.getFullYear()}`, "general"); 
    }

};

function messageAdminEnter(message, datefonc, args, command, Players){
    
    if(command == "sethour"){
        if(parseInt(args[0]) && parseInt(args[1]) || args[0] == 0 && parseInt(args[1]) || parseInt(args[0]) && args[1] == 0){
            if(0 <= args[0] && args[0] <= 23){
                if(0 <= args[1] && args[1] <= 59){
                    heure = args[0];
                    minute = args[1];
                    Main.sendMessage(`L'heure d'envoie du message auto à bien été changée pour ${heure}h${minute}`, "general")
                }else{
                    Main.sendMessage("Vous devez indiquer des minutes valable (entre 0 et 59 inclus)", "general");
                }
            }else{
                Main.sendMessage("Vous devez indiquer une heure valable (entre 0 et 23 inclus)", "general");
            }
        }else{
            Main.sendMessage("Vous devez indiquer une heure et des minutes (par exemple !sethour 10 15 (10h et 15min))", "general");
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
        Main.sendMessage("c'est l'heure", "general");
    }
    else if(datefonc.getHours()==heure && datefonc.getMinutes()== minute+1 && heurepassé == true){
        heurepassé = false;
        return
    }
};
