
var game;


var LargeurJeuxPixel = 1024 ;
var HauteurJeuxPixel = 600;
var NbImagesColonne = 3;
var NbImagesTotale = 10;
var HauteurImage = 200;
var LargeurImage = 200;
var NbImages = 2;
var Score = 0;
var Config=null;
// Nombre de ligne dans le tableau de resultataa avant de changer de colonne.
var MaxResultColumn = 12;

// Create a new game instance 600px wide and 450px tall:
game = new Phaser.Game(LargeurJeuxPixel, HauteurJeuxPixel, Phaser.CANVAS, 'phaser-example');

function UrlParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}


// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);
game.state.add('Game_Win', Game_Win);
game.state.add('Game_Resultat', Game_Resultat);
game.state.add('Game_Description', Game_Description);




        


game.state.start('Menu');
//game.state.start('Game');