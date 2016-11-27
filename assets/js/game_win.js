var Game_Win = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gamewin', './assets/images/game_win.png');
        game.load.audio('audioWin', 'assets/audio/Short_triumphal_fanfare-John_Stracke-815794903.mp3');
    },

    create : function() {

        game.stage.backgroundColor = "#80CCFF";
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gamewin', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(20, 50, "GAGNER !!!", { font: "bold 48px sans-serif", fill: "#ffffff", align: "center"});
        var style = { font: "bold 28px sans-serif", fill: "#ffffff", align: "center"};
        game.add.text(40, HauteurJeuxPixel/6 * 2, "* Votre SCORE : "+ Math.round((1-(Config.nbErreurTotal/Config.nbLettreTotal))*100) +'%', style);
        game.add.text(40, HauteurJeuxPixel/6 * 3, "* Nombre de lettre en erreur : "+Config.nbErreurTotal, style);
        game.add.text(40, HauteurJeuxPixel/6 * 4, "* Nombre de lettre frappées : "+ Config.nbLettreTotal, style);
        game.add.text(LargeurJeuxPixel/6, HauteurJeuxPixel/6 * 6 -20 , "cliquez pour recommencer", { font: "bold 12px sans-serif", fill: "#fff", align: "center" });
  
        audio = game.add.audio('audioWin');
        audio.play();

        Config.nbErreurTotal = 0;  
        Config.nbLettreTotal = 0;
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Menu');

    }

};
