var Game_Resultat = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/game_over.png');
   },

    create : function() {
        game.stage.backgroundColor = "#090909";
        var msg ='';
        
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(20, 20, "RESULTAT ...", { font: "bold 48px sans-serif", fill: "#46c0f9", align: "center"});

        // affiche les resultats
        var style = { font: "bold "+16+"px courier", fill: '#ffffff' , align: 'left', wordWrap: true, wordWrapWidth: LargeurJeuxPixel - 40 };
        // recupere tous les nom des objets
        msg =  "|"+ "%-20s".$("Nom item") +' | '+"%-4s".$("Nbr")+' | '+"%-4s".$("bon1")+' | '+"%-4s".$("bon2")+' | '+"%-4s".$("faux")+' |*\n';
        msg =  msg +"|---------------------|------|------|------|------|*\n";
        for (i = 0 ; i< NbMotsTotale; i++) {
            msg =  msg +"|"+ "%-20s".$(Config.objects[i].nom) +' | '+"%-4d".$(Config.objects[i].enonce)+' | '+"%-4d".$(Config.objects[i].bon1)+' | '+"%-4d".$(Config.objects[i].bon2)+' | '+"%-4d".$(Config.objects[i].faux)+' |*\n';

            if (i% MaxResultColumn ==0 && i != 0) {
                game.add.text(20 + (Math.trunc((i -1) /MaxResultColumn)) * 500 , 70, msg, style);
                msg =  "|" + "%-20s".$("Nom item") +' | '+"%-4s".$("Nbr")+' | '+"%-4s".$("bon1")+' | '+"%-4s".$("bon2")+' | '+"%-4s".$("faux")+' |*\n';
                msg =  msg +"|---------------------|------|------|------|------|*\n";
            }
        }
        // affiche le reste
        game.add.text(20 + (Math.trunc(i / MaxResultColumn)) * 500 , 70, msg, style);
        



        game.add.text(LargeurJeuxPixel/6, HauteurJeuxPixel -20  , "cliquez pour retourner au menu", { font: "bold 12px sans-serif", fill: "#fff", align: "center" });



        //el= document.getElementById("phaser-example");
        //el.style.visibility = "hidden";

        //el = document.getElementById("overlay");
        //el.innerHTML = "<button class = 'close' onclick = 'Game_Resultat.startGame()'><h1>totototototototototoAAAAAAAA</h1><br> stat</button>";
        //el.style.visibility = "visible";
        //window.scrollTo(0, 0);
        
    },

    startGame: function () {

        el = document.getElementById("phaser-example");
        el.style.visibility = "visible";

        el=document.getElementById("overlay");
        el.style.visibility = "hidden";

        // Change the state back to Game.
        this.state.start('Menu');

    }

};


