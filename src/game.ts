import "phaser";
import { MainScene } from "./main-scene";
import { OtherScene } from "./other-scene";
import { SnakeScene } from "./snake-scene";

new Phaser.Game({
  width: 512,
  height: 544,
  backgroundColor: 'fff',
  type: Phaser.AUTO,
  parent: "game",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [ MainScene, OtherScene, SnakeScene ]
});
