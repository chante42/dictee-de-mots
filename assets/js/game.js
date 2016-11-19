var Game = {

	rejoueBtn : 0,
	audio : 0,
	choix : -1,
	score : 2,
	imagesListe : 0,
	positionXBouton  : 0,
	graphicsPoint :0,
	graphicsJeux : 0,
	//
	//  preload
	//
	preload: function() {

	    game.load.image("button", "./assets/images/button-92x31.png", false);
		game.load.audio('bravo', 'assets/audio/Fr-bravo.ogg');
		game.load.audio('recommencer', 'assets/audio/Fr-recommencer.ogg');

		

	    // chargement des images
	    for (i = 0 ; i< NbImagesTotale; i++) {
	    	game.load.image("img"+(i+1), Config.objects[i].img, false);	
	    	console.log("img"+(i+1)+':'+Config.objects[i].img);
	    }
	    
	    // chargement des sons
	    for (i = 0 ; i< NbImagesTotale; i++) {
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
    // 
    //
    clickImage: function (button){

		console.log('my:'+button.my+' Choix:'+this.choix);

       	if (button.my == this.choix) {
			this.bravoSon.play();

			this.suivantBtn.visible = true;

        	button.tint = 0xaaaaff;    
        	
        	// met a jours les stat
        	if (this.score == 2) { Config.objects[this.choix -1].bon1++;}
    		if (this.score == 1) {Config.objects[this.choix -1].bon2++;}
    		if (this.score == 0) {Config.objects[this.choix -1].faux++;}

    		if (this.lastChoix  != this.choix) {
    			Config.objects[this.choix -1].enonce++;
    			this.lastChoix = this.choix;
    		}

        	Score += this.score;  
        	this.score = 2;  
        	
        	
    	}
       	else {
       		this.recommencerSon.play();

	        button.tint = 0x0000ff;  
	        this.score = this.score -1;      
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

		var posx = LargeurJeuxPixel / (NbImages + 1);
		var posy = 30;


		// remplie un liste avec toute les images
		for(i = 1; i<= NbImagesTotale; i++) {
			startList.push(i);
		}

		// 
		this.imagesListe = game.add.group();
		for (i = 1; i <= NbImages; i++) {
			noImg = game.rnd.integerInRange(1,startList.length); 
			
			console.log('-----');
			console.log("startList : " + startList)	;
		
			val = startList[noImg - 1];

			console.log('noImg :'+noImg + ', val:'+ val);
		
			choixList.push(val);

			// affiche sur 3 colonnes
			if (NbImages != 1) {
				posx = (LargeurJeuxPixel / Math.min(NbImagesColonne, NbImages) + 1) * ((i -1) % NbImagesColonne) + 8;
			}
			else {
				posx = (LargeurJeuxPixel / 2) - 100;	
			}
			posy = 30 + Math.trunc((i - 1) / NbImagesColonne) * 300;
			console.log("posx:"+posx+" posy:"+posy);

			tmp = game.add.button(posx, posy, 'img'+val, this.clickImage, this);

			// adapte la taille de l'image
			var scale = Math.min(LargeurImage/ tmp.width, HauteurImage/ tmp.height);
			tmp.scale.setTo(scale, scale);

			tmp.my = val;
			this.imagesListe.add(tmp); // pour la destruction

			console.log("choixList : " + choixList)	;
			startList.splice( noImg -1, 1);
			
		}
	
		console.log('+++++++++++++++++++');
		console.log("startList : " + startList)	;
		console.log("choixList : " + choixList)	;
		
		// choisi un son et evite de poser 2 fois la même question 
		do {
			var sonChoisi = game.rnd.integerInRange(1,choixList.length);
			
			console.log("son choisi : "+sonChoisi+", choix : " + this.choix);
		} while (	this.choix == choixList[sonChoisi -1] && NbImages != 1);
		this.choix = choixList[sonChoisi -1];


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


		this.audio = game.add.audio('son'+this.choix);    
        this.audio.play();

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

		this.imagesListe.removeAll();
		this.imagesListe= null;

		this.graphicsJeux = null;
		this.graphicsPoint = null;

	}
	   
}