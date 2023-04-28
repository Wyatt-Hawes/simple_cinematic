var global_var = 0;
class Studio extends Phaser.Scene{

    constructor(){
        super('studioScene');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('block', 'Block.png');
        this.load.spritesheet('light_moving', 'Light_spritesheet.png', {frameWidth: 1200, frameHeight: 900});
        this.load.spritesheet('light_off', 'light_off_spritesheet.png', {frameWidth: 1729, frameHeight: 1298});
        this.load.audio('Clicked', ['Click.mp3']);

        this.load.image('original', 'Logo_top - Copy.png');
        this.load.image('idea', 'Logo_top.png');
        this.load.image('studio', 'Logo_bottom.png');
    }

    turn_on(){
        light.play("light_on");
    }
    create(){

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        let xMax = 800;
        let yMax = 600;


        //let myAnim = 
        this.anims.create({
            key: "light_on",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("light_moving", {start: 0, end: 1}),
            repeat: -1
        })
        this.anims.create({
            key: "light_off",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("light_off", {start: 0, end: 1}),
            repeat: -1
        })

        //this.anims.generateFrameNumbers("light_moving", {start: 1, end: 2});

        let rect1 = this.add.rectangle(0, yMax, 2000, 350, 0x6C6C6C);
        let circ1 = this.add.ellipse(390, 470,300, 50, 0x222222);
        let block = this.add.sprite(400,535, 'block');
        block.setScale(.80);
        block.depth = 1;

        circ1.depth = 0;

        let light = this.add.sprite(centerX, centerY + 2000, 'light_off');
        light.play("light_off");
        light.setPipeline('Light2D');
        var globalLight = this.lights.addLight(500, 250, 700);

        const spotlight = this.lights.addLight(centerX, 250, 280).setIntensity(9);

        light.setScale(.25);
        this.lights.enable().setAmbientColor(0x555555);
        //setTimeout(my_name(), 3000, "light_on");

        let click = this.sound.add('Clicked', {loop: false});

        let lightTimeline = this.tweens.timeline({
            targets: light,
            ease: 'Quart.easeOut',
            loop: 0,    
            paused: false,
            tweens: [{
                y: 250,
                duration: 1500,
                delay: 300
            },{
                
            }],
            onComplete: function(){
                
                //click.play();
                //light.play("light_on");
                let wait = 1500
                setTimeout(() => {click.play();}, wait);
                setTimeout(() => {light.play("light_on");light.setScale(.36);}, wait + 200);
                //moveOut.play();
            }


        });
        let myDelay = 850;

        let moveOut = this.tweens.timeline({
            targets: [rect1],
            ease: 'Sine.easeOut',
            loop: 0,
            paused: false,
            tweens: [{
                y: 800,
                duration: 1500,
                delay: myDelay
            }],
            onStart: function() {
                setTimeout(block.destroy, 100);
                //block.destroy();
            }


        });

        let circMove = this.tweens.timeline({
            targets: circ1,
            loop: 0,
            ease: 'Sine.easeOut',
            tweens: [{
                y: 675,
                duration: 1500,
                delay:myDelay
            }]
        });
        let blockMove = this.tweens.timeline({
            targets:block,
            loop: 0,
            ease: 'Sine.easeOut',
            tweens: [{
                y: 740,
                duration: 1500,
                delay:myDelay
            }]
        });

        let logoX = 350;
        let logoY = 400;

        // let logoOriginal = this.add.sprite(logoX, logoY, 'original');
        // logoOriginal.setScale(.25);

        // let logoIdea = this.add.sprite(logoX + 100, logoY - 10, 'idea');
        // logoIdea.setScale(.25);

        // let logoStudio = this.add.sprite(logoX + 75, logoY + 35, 'studio');
        // logoStudio.setScale(.25);
        let logoOriginal = this.add.sprite(-350, logoY, 'original');
        logoOriginal.setScale(.25);

        let logoIdea = this.add.sprite(logoX + 750, logoY - 10, 'idea');
        logoIdea.setScale(.25);

        let logoStudio = this.add.sprite(logoX + 75, 1200, 'studio');
        logoStudio.setScale(.25);

        let wait = 400;
        let titleOG = this.tweens.timeline({
            targets:logoOriginal,
            loop: 0,
            ease: 'Circ.easeIn',
            tweens: [{
                x: logoX,
                y: logoY,
                duration: 1500,
                delay: wait,
                paused: false
                
            }],
            onComplete: function() {
                
            }
        });

        let titleIdea = this.tweens.timeline({

            targets:logoIdea,
            loop: 0,
            ease: 'Circ.easeIn',
            tweens: [{
                x: logoX + 100,
                y: logoY - 10,
                duration: 1500,
                delay: wait + 600,
                paused: true
                
            }]
        });

        let titleStudio = this.tweens.timeline({

            targets:logoStudio,
            loop: 0,
            ease: 'Circ.easeIn',
            tweens: [{
                x: logoX + 75,
                y: logoY + 35,
                duration: 1500,
                delay: wait + 600 + 600,
                paused: true
                
            }],
            onComplete: function() {
                screenClear.play();
                screenClear2.play();
                screenClear3.play();
            }
        });

        let screenClear = this.tweens.add({
            targets: [light],
            paused: true,
            duration: 2000,
            y: -400,
            delay: 2000

        });
        let screenClear2 = this.tweens.add({
            targets: [ logoIdea, logoOriginal],
            paused: true,
            duration: 2000,
            y: -300,
            delay: 2000

        });
        let screenClear3 = this.tweens.timeline({
            targets: [logoStudio],
            paused: true,
            tweens: [{
            duration: 2000,
            y: -275,
            delay: 2000}],
            onComplete: function() {
                global_var = 1;
            }

        });
        this.swap = this.input.keyboard.addKey('q');
        this.reload = this.input.keyboard.addKey('w');
    }

    update(){

        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            
            this.scene.start("introScene");
        }
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }

        if(global_var == 1){
            this.scene.start("introScene");
            global_var = 0;
        }
    }

}