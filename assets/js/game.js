//"use strict;"


var Game = {

	rejoueBtn : 0,
	audio : 0,
	choix : -1,
	score : 2,
	positionXBouton  : 0,
	positionMot:0,
	graphicsPoint :0,
	graphicsJeux : 0,
	//
	//  preload
	//
	preload: function() {

	    game.load.image("button", "./assets/images/button-92x31.png", false);
		game.load.audio('bravo', 'assets/audio/Fr-bravo.ogg');
		game.load.audio('recommencer', 'assets/audio/Fr-recommencer.ogg');
  
	    // chargement des sons
	    for (i = 0 ; i< NbMotsTotale; i++) {
			game.load.audio('son'+(i+1), Config.objects[i].son);
			console.log("son"+(i+1)+':'+Config.objects[i].son);
		}
		

	},
	//
	// clickRepete
	//
	clickRepete : function(button) {
		this.audio.play();
	},
	//
	// clickSuivant
	//
	clickSuivant : function(button) {
		button.hide;
		this.state.start('Game');
	},
	//
	// clickMenu
	//
	clickMenu : function  (button) {
		game.state.start('Menu');
	},
        
    //
	//  create
	//
	menuCreate : function() {
		this.positionXBouton =  LargeurJeuxPixel - 110,
		// bouton pour  retoruner au menu 
		this.menuBtn = game.add.button(this.positionXBouton, 90, "button", this.clickMenu, this);
        this.menuBtn.addChild(new Phaser.Text(this.game, 6, 4, "Menu", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.menuBtn.tint = 0x00FFFF;

		// bouton pour relancer le son du mot.
		this.rejoueBtn = game.add.button( this.positionXBouton , 130, "button", this.clickRepete, this);
        this.rejoueBtn.addChild(new Phaser.Text(this.game, 6, 4, "Répéter", { font: "bold 18px sans-serif", fill: '#ffffff' }));

        // bouton pour le mot suivant
		this.suivantBtn = game.add.button(this.positionXBouton, 170, "button", this.clickSuivant, this);
        this.suivantBtn.addChild(new Phaser.Text(this.game, 6, 4, "Suivant", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.suivantBtn.visible = false;
        this.suivantBtn.tint = 0x555555;

        // dessine u contour a la zone point et bouton
        this.graphicsPoint = game.add.graphics(this.positionXBouton -5, 4);
        this.graphicsPoint.lineStyle(2, 0x0000FF, 1);
	    this.graphicsPoint.drawRect(0, 0, LargeurJeuxPixel - this.positionXBouton -3, HauteurJeuxPixel - 30	);

	    this.graphicsJeux = game.add.graphics(0,0);
        this.graphicsJeux.lineStyle(2, 0x0000FF, 1);
	    this.graphicsJeux.drawRect(0, 0, LargeurJeuxPixel-2, HauteurJeuxPixel - 2);


	},
	//
	// keyDown
	//
	keyDown : function(e) {        
		lettreAttendue = Config.objects[Game.choix].mot[Game.positionMot];

		var key = String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? key-48 : key);
		console.log("Lettre attendue :"+lettreAttendue+" - key: '"+key+"' - e.keyCode:"+e.keyCode);

		if (key == lettreAttendue) {
			console.log('AAAAAAAAAAAAAA');
			Game.positionMot++;
		}
		else {
			console.log(e.keyCode);
		}
         
    },
	//
	//  create
	//
	create : function()  {
		var startList = new Array();
		var choixList = new Array();
		
		game.stage.backgroundColor = "#80CCFF";
		this.bravoSon = game.add.audio('bravo');
		this.recommencerSon = game.add.audio('recommencer');

		Game.choix = 1;
		
		this.menuCreate();
		this.audio = game.add.audio('son'+this.choix);    
        this.audio.play();

        game.input.keyboard.onDownCallback = this.keyDown;
	},

	//
	// update
	//
	update : function() {

	},
	//
	//
	//
	render : function() {

		//game.debug.text('LargeurJeux : '+LargeurJeux, InfoPosX, 40, 'rgb(255,0,0)');
	    game.debug.text('point : '+Score, this.positionXBouton, 40, { font: "bold 18px sans-serif", fill: '#000000' });

	},

	//
	//
	//
	shutdown: function () { 
		this.rejoueBtn.kill();
		this.rejoueBtn = null;

		this.audio.stop();
		this.audio = null;
		
		this.menuBtn.kill();
		this.menuBtn = null;

		this.suivantBtn.kill();
		this.suivantBtn = null;

		this.graphicsJeux = null;
		this.graphicsPoint = null;

	}
	   
}