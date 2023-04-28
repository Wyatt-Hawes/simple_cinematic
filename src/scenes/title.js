class Title extends Phaser.Scene{

        constructor(){
            super('titleScene');
        }
        preload(){

            this.load.path = './assets/';
            this.load.image('background', 'SnowBackground.png');
            this.load.image('boarder', 'Snowboarder.png'); 
            this.load.image('tree', 'tree.png');
            this.load.audio('ambient', ['ambient.mp3']);
            

        }

        create(){
            let amb = this.sound.add('ambient');
            amb.loop = true;
            amb.play();

            this.cameras.main.fadeIn(5000, 255,255,255);
            let background = this.add.sprite(460,300, 'background');
            background.setScale(.55);

            let boarder = this.add.sprite(300,330, 'boarder');
            boarder.setScale(1.4);
            boarder.setAngle(17);
            boarder.depth = 100;

            this.tweens.add({
                targets: boarder,
                angle: {from: boarder.angle -2, to: boarder.angle},
                repeat: -1,
                yoyo: true,
                duration: 200,
                paused: false
           })

           let Length = 100;

           let xPos = 240;
           let yPos = 240;

           let line1 = this.add.line(0,0, xPos,yPos, 100 + xPos, 80+ yPos, 0x000000);
           let line2 = this.add.line(0,0, xPos - 30,yPos + 30, 100 + xPos - 30- 15, 80+ yPos + 30- 15, 0x000000);
           let line3 = this.add.line(0,0, xPos - 60,yPos + 60, 100 + xPos- 60, 80+ yPos + 60, 0x000000);
           //line1.depth = 23;


           this.tweens.add({
                targets: line1,
                duration: 300,

                x:-800,
                y:-800,
                repeat: -1
           })
            this.tweens.add({
                targets: line2,
                duration: 359,

                x:-800,
                y:-800,
                repeat: -1
            })
            this.tweens.add({
                 targets: line3,
                 duration: 234,

                 x:-800,
                 y:-800,
                 repeat: -1
            })



            let tree1 = this.add.sprite (1700, 1300, 'tree');
            let tree2 = this.add.sprite (1200, 1300, 'tree');


            this.tweens.add({
                targets: tree1,
                x: -400,
                y: -400,
                repeat: -1,
                duration: 800,
                delay: 0,
                repeatDelay: Phaser.Math.Between(0,1000)
            });

            this.tweens.add({
                targets: tree2,
                x: -400,
                y: 0,
                repeat: -1,
                duration: 600,
                delay: 0,
                repeatDelay: Phaser.Math.Between(0,500)
            });

            let Title = this.add.text(300,-50,`
            Start -
            Options -
            Quit -`, {color: 0xff0000, fontFamily: 'comic sans ms' , fontSize: '60px', color: '#fff', align: 'right'});
            Title.depth = 101;

            this.swap = this.input.keyboard.addKey('q');
            this.reload = this.input.keyboard.addKey('R');
            this.goto = this.input.keyboard.addKey('Q');
        }

        update(){
            if(Phaser.Input.Keyboard.JustDown(this.reload)) {
                this.scene.restart();
            }
            if(Phaser.Input.Keyboard.JustDown(this.swap)) {
                this.scene.start("studioScene");
            }
            if(Phaser.Input.Keyboard.JustDown(this.goto)) {
                this.scene.start("introScene");
            }

        }

}