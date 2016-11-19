var Menu = {
    NiveauBtn : new Array(),
    AideEcran : "",

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu', './assets/images/menu.png');
        game.load.image('aide', './assets/images/aide.png');
        game.load.spritesheet("button", "./assets/images/button-92x31.png", 92,31);
        game.load.image("playGame-btn", "./assets/images/playGame-btn.png");

        // recupération du json de configuration
        this.configFile = null;
        this.configFile = UrlParametre("config");
        if ( this.configFile){
            game.load.json('configJson', this.configFile);
            console.log('loading....'+this.configFile);
        }
    },
    //
    // 
    //
    click: function (button){
       
        // remet en mode normal les boutons
        for( var i = 0; i< this.NiveauBtn.length; i++){
            this.NiveauBtn[i].tint = 0xffffff;
        }

        // selection le bouton
        button.tint = 0x0000ff;      

        NbImages = button.nbImage;
        
    },
    //
    // aide
    //
    aide: function () {
        AideEcran.visible = true;
        console.log("aide");
    },
    //
    // aideFin
    //
    aideFin: function () {
        AideEcran.visible = false;
        console.log("aideFin");
    },
    //
    // resultat
    //
    resultat: function () {
        game.state.start('Game_Resultat');
    },
    //
    // Description
    //
    clickDescription : function (button){
        game.state.start('Game_Description');
    },
    //
    //   loadConfigJson
    //
    loadConfigJson : function() {

        // ne relie pas le fichier de config si déjà lue
        if (Config) { return;}

        // il y a t'il un parametre dans l'url ???
        if ( this.configFile){
            console.log("config externe loaded"+this.configFile);
            Config = game.cache.getJSON('configJson');
            NbImagesTotale = Config.objects.length;
        }
        // initalisation avec des valeurs par defaut
        else {
            console.log("config interne");
            Config = {
                name : "interne",
                description : "description d'interne",
                objects : [
                    {   img : './assets/images/cadeau.png', son : './assets/audio/Fr-cadeau.ogg', nom: 'cadeau'},
                    {   img : './assets/images/fleur.png', son : './assets/audio/Fr-fleur.ogg', nom: 'fleur'},
                    {   img : './assets/images/sapin.png', son : './assets/audio/Fr-sapin.ogg', nom: 'sapin'},
                    {   img : './assets/images/feu.png', son : './assets/audio/Fr-feu.ogg', nom: 'feu'},
                    {   img : './assets/images/cuillere.png', son : './assets/audio/Fr-cuillere.ogg', nom: 'cuillere'},
                    {   img : './assets/images/fourchette.png', son : './assets/audio/Fr-fourchette.ogg', nom: 'fourchette'},
                    {   img : './assets/images/couteau.png', son : './assets/audio/Fr-couteau.ogg', nom: 'couteau'},
                    {   img : './assets/images/soleil.png', son : './assets/audio/Fr-soleil.ogg', nom: 'soleil'},
                    {   img : './assets/images/nuage.png', son : './assets/audio/Fr-nuage.ogg', nom: 'nuage'},
                    {   img : './assets/images/etoile.png', son : './assets/audio/Fr-etoile.ogg', nom: 'etoile'},
                ]
            }

            NbImagesTotale = Config.objects.length;
        }

        // initialise les compteurs:
        for (i = 0 ; i< NbImagesTotale; i++) {
            Config.objects[i].enonce = 0;
            Config.objects[i].bon1 = 0;
            Config.objects[i].bon2 = 0;
            Config.objects[i].faux = 0;
        }
    },
    //
    //
    //
    create: function () {

        game.stage.backgroundColor = "#80CCFF";
        
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above) 
        var x1 = LargeurJeuxPixel / 2 - 100 + 10;
        var x2 = LargeurJeuxPixel / 2 + 10;
        var ratio = HauteurJeuxPixel / (9 *100)+0.8;
        var y  = HauteurJeuxPixel / 2 - 100 * ratio;
        console.log('ratio : '+ ratio);

        // image de fond
        this.add.button(0, 0, 'menu');

        // bouton start
        this.playBtn = game.add.button(LargeurJeuxPixel / 2 , y +  170 * ratio,'playGame-btn', this.startGame, this);
        this.playBtn.anchor.setTo(0.5,0.5);

        // bouton règle du jeux
        this.helpBtn = game.add.button(10 * ratio, HauteurJeuxPixel - 40 *ratio  ,"button", this.aide, this);
        this.helpBtn.tint = 0x00ff00;
        this.helpBtn.addChild(new Phaser.Text(this.game, 5, 6, "Règles du jeux", { font: "bold 12px sans-serif", fill: '#ffffff' }));

        // bouton resultat
        this.resultatBtn = game.add.button(LargeurJeuxPixel - 10 * ratio - 90 , HauteurJeuxPixel - 40 *ratio  ,"button", this.resultat, this);
        this.resultatBtn.tint = 0x00ff00;
        this.resultatBtn.addChild(new Phaser.Text(this.game, 13, 6, "Resultat", { font: "bold 14px sans-serif", fill: '#ffffff' }));

        // bouton pour description test
        this.descriptionBtn = game.add.button( 100 + 10* ratio, HauteurJeuxPixel - 40 *ratio , "button", this.clickDescription, this);
        this.descriptionBtn.tint = 0x00FF00
        this.descriptionBtn.addChild(new Phaser.Text(this.game, 10, 5, "Desc test", { font: "bold 14px sans-serif", fill: '#ffffff' }));
        


        // selection du niveau
        this.NiveauBtn[0] = game.add.button(x1 , y+ 10 * ratio, "button", this.click, this);
        this.NiveauBtn[0].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 1", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[0].nbImage= 1;

        this.NiveauBtn[1] = game.add.button(x2, y + 10 * ratio, "button", this.click, this);
        this.NiveauBtn[1].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 2", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[1].nbImage= 2;

        this.NiveauBtn[2] = game.add.button(x1, y + 45 * ratio, "button", this.click, this);
        this.NiveauBtn[2].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 3", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[2].nbImage= 3;

        this.NiveauBtn[3] = game.add.button(x2, y + 45 * ratio, "button", this.click, this);
        this.NiveauBtn[3].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 4", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[3].nbImage= 4;

        this.NiveauBtn[4] = game.add.button(x1, y + 80 * ratio, "button", this.click, this);
        this.NiveauBtn[4].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 5", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[4].nbImage= 5;
        
        this.NiveauBtn[5] = game.add.button(x2, y + 80 * ratio, "button", this.click, this);
        this.NiveauBtn[5].addChild(new Phaser.Text(this.game, 6, 4, "Niveau 6", { font: "bold 18px sans-serif", fill: '#ffffff' }));
        this.NiveauBtn[5].nbImage= 6;

        // Active le bon bouton
        var buttonIndice = [0,0,1,2,3,4,5,6,7,8];
        this.click(this.NiveauBtn[buttonIndice[NbImages]]);

        // creation de l'ecran d'aide
        var style = { font: "bold "+11*ratio*ratio+"px sans-serif", fill: '#ffffff' , align: 'left', wordWrap: true, wordWrapWidth: LargeurJeuxPixel - 40 };
        AideEcran = game.add.button(0,0, "aide", this.aideFin, this);
        AideEcran.addChild(new Phaser.Text(this.game, 10, 20 * ratio, "Aide\n\nL'objectif est faire l'association entre le son entendue et l'image, en clickant sur cette dernière.\nLes niveaux représentent le nombre d'images présentées avec chaque son.\nLes points:\n - 3 points si bonne reponse au premier essais\n- 2 points si bonne reponse au deuxieme essais.\n- 1 points si bonne reponse au troisième essais.\n\n",  style));
        AideEcran.visible = false;

        this.loadConfigJson();
        
    },

    
    //
    //
    //
    startGame: function () {
        // Change the state to the actual game.
        this.state.start('Game');

    },

    //
    //
    //
    shutdown: function () { 
       this.NiveauBtn[0].kill();
       this.NiveauBtn[0]=null;
       this.NiveauBtn[1].kill();
       this.NiveauBtn[1]=null;
       this.NiveauBtn[2].kill();
       this.NiveauBtn[2]=null;
       this.NiveauBtn[3].kill();
       this.NiveauBtn[3]=null;
       this.NiveauBtn[4].kill();
       this.NiveauBtn[4]=null;
       this.NiveauBtn[5].kill();
       this.NiveauBtn[5]=null;
       
       this.descriptionBtn.kill();
       this.descriptionBtn = null;

       this.playBtn.kill();
       this.playBtn = null;

       this.helpBtn.kill();
       this.helpBtn = null;

       this.resultatBtn.kill();
       this.resultatBtn = null;
    }

};
