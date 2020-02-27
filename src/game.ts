import "phaser";
import { SnakeScene } from "./snake-scene";
import { MainScene } from "./main-scene";
import { OtherScene } from "./other-scene";

new Phaser.Game({
  width: 514,
  height: 546,
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
