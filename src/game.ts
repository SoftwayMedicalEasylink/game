import "phaser";
import { MainScene } from "./scenes/main-scene";
import { OtherScene } from "./scenes/other-scene";
import { RestartScene } from "./scenes/restart-scene";
import { SnakeScene } from "./scenes/snake-scene";

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
  scene: [ /*MainScene, OtherScene,*/ SnakeScene, RestartScene ]
});
