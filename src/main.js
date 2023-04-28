
//Not sure what this does but its in the example
// code armor
'use strict';

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: [  Studio, Title,Intro]
}

const game = new Phaser.Game(config);

// global
let cursors = null;
