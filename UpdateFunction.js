module.exports = {
    Update
};

function Update(){
  
    const datefonc = new Date();
    if(datefonc.getHours()==heure && datefonc.getMinutes()==minute && heurepassé == false){
        bot.channels.cache.find(ch => ch.name === 'général').send("tic tac");
        heurepassé = true;
    }
    if(datefonc.getHours()==heure && datefonc.getMinutes()==minute+1 && heurepassé == true){
        heurepassé = false;
    }
};