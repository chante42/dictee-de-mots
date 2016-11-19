var Game_Description = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/game_over.png');
   },

    create : function() {
        game.stage.backgroundColor = "#090909";
        var msg='';
        
        // recupere tous les nom des objets
        for (i = 0 ; i< NbImagesTotale; i++) {

            if (i> 0) { msg = msg+', ';}
            msg =  msg + Config.objects[i].nom;
        }

        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(30, 30, 'Nom :'+Config.name+"\nDescription : "+Config.description+"\n"+"Liste des images et sons :\n"+msg);

        var style = { font: "bold "+16+"px sans-serif", fill: '#ffffff' , align: 'left', wordWrap: true, wordWrapWidth: LargeurJeuxPixel - 40 };
        game.add.text(LargeurJeuxPixel/6, HauteurJeuxPixel/6 *5 , "cliquez pour recommencer", style);
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Menu');

    }

};
