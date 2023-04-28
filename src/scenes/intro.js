var startFade = 0;

class Intro extends Phaser.Scene{

    constructor(){
        super('introScene');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('mountain', 'mountain.png');
        this.load.image('boarder', 'Snowboarder.png');

    }

    create(){

        //const camera = this.cameras.main;
        this.cameras.main.setBackgroundColor('#2d2d2d')
        //Doesnt work ;_;
        //camera.postFX.addTiltShift(0.9, 2.0, 0.4);
        //this.cameras.main.postFX.addTiltShift(0.9, 2.0, 0.4);
        //425, 330
        let mont = this.add.sprite(425, 1030, 'mountain');
        mont.setScale(.5);

        let snowb = this.add.sprite(300,-200, 'boarder');
        snowb.setScale(.3);

        let angle = 65
        //snowb.setAngle(angle);

        this.swap = this.input.keyboard.addKey('q');
        this.reload = this.input.keyboard.addKey('w');


        //make snowboarder shake slightly
        this.tweens.add({
             targets: snowb,
             angle: {from: snowb.angle -5, to: snowb.angle},
             repeat: -1,
             yoyo: true,
             duration: 100,
             paused: false
        })

        let mountainIn = this.tweens.timeline({
            targets: [mont],
            ease: 'Cubic.easeOut',
            loop: 0,
            paused: false,
            tweens: [{
                y: 330,
                duration: 1500,
                delay: 0
            }],
            onStart: function() {
                //setTimeout(block.destroy, 100);
                //block.destroy();
            }
            

        });

        
        let SB = this.tweens.timeline({
            targets: snowb,
            repeat: 0,
            duration: 1000,
            delay: 0,
            paused: false,
            tweens: [{
                ease: 'circ.easeIn',
                angle: {from: snowb.angle, to: angle},
                delay: 500,
                duration: 2000,
                x:410,
                y:130
            },{
                angle: {from: angle, to: angle},
                x:410,
                y:375,
            },{
                angle: {from: angle, to: 0},   
                duration: 500,
                x:420,
                y:490
            },{
                x:850,
                y:620,
            },{
                duration: 300,
                x: 851,
                y: 621
            }],
            onComplete: function() {
                //this.cameras.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                //    this.scene.start('phaser-logo');
                //});
                //Phaser.Cameras.Scene2D.Camera.fadeIn(1000,255,255,255);
                startFade = 1;
                
            }
        })
    }

    update(){

        if(Phaser.Input.Keyboard.JustDown(this.swap)) {

            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.start("studioScene");
        }
        if(startFade == 1){
        
            this.cameras.main.fadeOut(2000, 255,255,255);
            setTimeout(() => { this.scene.start("titleScene");  }, 2500);
            startFade = 0;
        }
        
    }

    

}
