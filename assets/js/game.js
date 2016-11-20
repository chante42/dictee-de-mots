"use strict;"


var Game = {

	rejoueBtn : 0,
	audio : 0,
	choix : -1,
	lastChoix: -1,
	score : 2,
	positionXBouton  : 0,
	positionMot:0,
	graphicsPoint :0,
	graphicsJeux : 0,
	chaineAffiche: "",
	chaineAfficheObj :null,
	nbLettre:0,
	nbErreur:0,
	//
	//  preload
	//
	preload: function() {

	    game.load.image("button", "./assets/images/button-92x31.png", false);
		game.load.audio('bravo', 'assets/audio/Fr-bravo.ogg');
		game.load.audio('recommencer', 'assets/audio/Fr-recommencer.ogg');
		game.load.image('aide', './assets/images/aide.png');
  
	    // chargement des sons
	    for (i = 0 ; i< NbMotsTotale; i++) {
			game.load.audio('son'+i, Config.objects[i].son);
			console.log("son"+i+':'+Config.objects[i].son);
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
		console.log("clickSuivant : NbJoue :"+NbJoue+" NbMotsATrouver="+NbMotsATrouver);
		Game.motTrouve = false;
		if (NbJoue >= NbMotsATrouver) {
			game.input.keyboard.onDownCallback = null;
	   		game.state.start('Game_Win');
      	}
      	else {
			if (button) {button.hide;}
			this.state.start('Game');
		}
		
	},
	//
	// clickMenu
	//
	clickMenu : function  (button) {
		game.input.keyboard.onDownCallback = null;
		Game.motTrouve = false;
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
        Game.suivantBtn = this.suivantBtn;

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
		var key = e.keyCode;

		if (Game.motTrouve == true ) {
			// si touche "ENTREE" suivant 
			if (key == 13) {
				Game.clickSuivant(this.suivantBtn);
			}
	
			return null;
		}
		
		
		
		//console.log("Lettre attendue :"+lettreAttendue+" - key: '"+key+"' - e.keyCode:"+e.keyCode);

		// si Espace 
		if (key == 32 && Game.positionMot >= 0 && Config.objects[Game.choix].mot[Game.positionMot -1] ==" ") {
			
			return;

		}

		Game.nbLettre++;
		if (keyboardCharMap[key][0] == lettreAttendue || keyboardCharMap[key][1] == lettreAttendue ) {
			

			Game.chaineAffiche = remplaceStr(Game.chaineAffiche,Game.positionMot, lettreAttendue);
			Game.chaineAfficheObj.text = Game.chaineAffiche;
			Game.positionMot++;
			//console.log('Bonne touche : chaineAffiche :'+ Game.chaineAffiche);

			// si espace passe ce caractère
			lettreAttendue = Config.objects[Game.choix].mot[Game.positionMot];
			//console.log('char: "'+lettreAttendue+'"');
			if (lettreAttendue == ' ') {
				// change la couleur de la lettre crourante
		      	Game.chaineAfficheObj.addColor('#ff0000',Game.positionMot -1);
		      	Game.chaineAfficheObj.addColor('#ffffff',Game.positionMot);
		      	Game.chaineAfficheObj.addColor('#ff0000',Game.positionMot +1 );
				Game.positionMot++;
			}
		}
		else {
			console.log("keyDox -> code "+e.keyCode)
			Game.recommencerSon.play();
			Game.nbErreur++;
		}
      

		//
      	// test si gagner
      	//
      	if (Config.objects[Game.choix].mot == Game.chaineAffiche) {
      		Game.suivantBtn.visible = true;
      		Game.bravoSon.play();

      		if (Game.nbErreur == 0) {Config.objects[Game.choix].bon1++;}
      		if (Game.nbErreur == 1) {Config.objects[Game.choix].bon2++;}
      		if (Game.nbErreur > 1) {Config.objects[Game.choix].faux++;}

      		Game.motTrouve =true;
      		NbJoue++;
      	}

      	// change la couleur de la lettre crourante
      	Game.chaineAfficheObj.addColor('#ff0000',Game.positionMot -1);
      	Game.chaineAfficheObj.addColor('#ffffff',Game.positionMot);
      	Game.chaineAfficheObj.addColor('#ff0000',Game.positionMot +1 );

      
      	
    },
    //
    // choisiMotHazad
    //
    // tire au sort un mot et evite que le même mot sot demandé 2 fois.
    choisiMotHazard : function (nbItemTotal) {

    	do {
    		Game.choix = noImg = game.rnd.integerInRange(0, NbMotsTotale -1); 
    	} while (Game.lastChoix == Game.choix);
		Game.lastChoix = Game.choix    	


    	Game.chaineAffiche = '';
		Game.positionMot = 0;
    	Config.objects[Game.choix].enonce++;
    },
    //
    // choisiMotTous
    //
    // tire au sort un mot et s'assure que tous les mot soit vu au moins une fois avnt de presenter un 
    // mot déjà vu
    choisiMotTous : function (nbItemTotal) {
    	var i=-1;
    	var min = 9999;
    	var list =[];
       	// recherche le Plus petit nombre d'occurence dans les stats
    	for (i = 0 ; i< nbItemTotal; i++) {
    		if (min > Config.objects[i].enonce) { min = Config.objects[i].enonce}
    	}

    	// Construit la liste avec les mot d'occurence Min
    	for (i = 0 ; i< nbItemTotal; i++) {
    		if (Config.objects[i].enonce == min) { 
    			list.push(i);
    		}
    	} // fin FOR i
    	
    	do {
    		Game.choix = list[game.rnd.integerInRange(0, list.length -1)];
    	} while (Game.lastChoix == Game.choix);
		Game.lastChoix = Game.choix    	

		console.log("choisiMotTous -> choix = "+Game.choix+", list: "+list);
    	Game.chaineAffiche = '';
		Game.positionMot = 0;
    	Config.objects[Game.choix].enonce++;
    },
    //
    // choisiMotErreur
    //
    // tire au sort un mot et s'assure que tous les mot soit vu au moins une fois avant de presenter un 
    // mot déjà vu
    // Mais Laisse dans la liste les mots ou il y a eu une erreur.
    choisiMotErreur : function (nbItemTotal) {
    	// A CONSTRUIRE //
    	do {
    		Game.choix = noImg = game.rnd.integerInRange(0, NbMotsTotale -1); 
    	} while (Game.lastChoix == Game.choix);
		Game.lastChoix = Game.choix    	


    	Game.chaineAffiche = '';
		Game.positionMot = 0;
    	Config.objects[Game.choix].enonce++;
    },
	//
	//  create
	//
	create : function()  {
		var startList = new Array();
		var choixList = new Array();
		
		game.stage.backgroundColor = "#80CCFF";
		this.bravoSon = game.add.audio('bravo');
		Game.bravoSon = this.bravoSon;
		this.recommencerSon = game.add.audio('recommencer');
		Game.recommencerSon = this.recommencerSon;

		//Game.choisiMotHazard(NbMotsTotale);
		Game.choisiMotTous(NbMotsTotale);
		
		
		this.menuCreate();
		this.audio = game.add.audio('son'+this.choix);    
        this.audio.play();

        console.log(Config.objects[Game.choix].mot.length);
        for (i=0; i <Config.objects[Game.choix].mot.length; i++) {
        	if (Config.objects[Game.choix].mot[i] == ' ') {
				Game.chaineAffiche = Game.chaineAffiche+ " ";
        	}
        	else {
				Game.chaineAffiche = Game.chaineAffiche+ "-";
			}
		}

		Game.style ={ font: "bold 80px sans-serif", fill: '#ff0000', align: "center"};

 		Game.chaineAfficheObj = game.add.text(game.world.centerX, 200, Game.chaineAffiche, Game.style);
 		Game.chaineAfficheObj.addColor('#ffffff',Game.positionMot);
 		Game.chaineAfficheObj.addColor('#ff0000',Game.positionMot+1);
 		Game.chaineAfficheObj.anchor.set(0.5);
 		
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
	    game.debug.text('Niveau: '+Niveau, this.positionXBouton, 25, { font: "bold 18px sans-serif", fill: '#000000' });
	    game.debug.text('Joué: '+NbJoue+'/'+NbMotsATrouver, this.positionXBouton, 45, { font: "bold 18px sans-serif", fill: '#000000' });

	    game.debug.text('Err: '+Game.nbErreur+'/'+Game.nbLettre, this.positionXBouton, 65, { font: "bold 16px sans-serif", fill: '#000000' });
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