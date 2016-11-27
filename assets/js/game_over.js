var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/game_over.png');
        game.load.audio('audioLoose', './assets/audio/Sad_Trombone_2.mp3');
    },

    create : function() {
        game.stage.backgroundColor = "#80CCFF";
        
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        var style = { font: "bold 48px sans-serif", fill: "#46c0f9", align: "center"};
        game.add.text(20, HauteurJeuxPixel/6, "PERDU ...", style);
        
        var style = { font: "bold 28px sans-serif", fill: "#ffffff", align: "center"};
        game.add.text(40, HauteurJeuxPixel/6 * 2, "* Votre SCORE : "+ Math.round((1-(Config.nbErreurTotal/Config.nbLettreTotal))*100) +'%', style);
        game.add.text(40, HauteurJeuxPixel/6 * 3, "* Nombre de lettre en erreur : "+Config.nbErreurTotal, style);
        game.add.text(40, HauteurJeuxPixel/6 * 4, "* Nombre de lettre frappées : "+ Config.nbLettreTotal, style);
        game.add.text(LargeurJeuxPixel/6, HauteurJeuxPixel/6 * 6 -20 , "cliquez pour recommencer", { font: "bold 12px sans-serif", fill: "#fff", align: "center" });

        Config.nbErreurTotal = 0;  
        Config.nbLettreTotal = 0;

        //console.log("perdu -> Config.nbErreurTotal  ="+Config.nbErreurTotal );

        audio = game.add.audio('audioLoose');
        audio.play();


    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Menu');

    }

};
