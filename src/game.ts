import "phaser";
import { MainScene } from "./scenes/main-scene";
import { OtherScene } from "./scenes/other-scene";
import { GameSnake } from "./scenes/game-snake";

new Phaser.Game({
  width: 800,
  height: 600,
  backgroundColor: '#F0F0F0',
  type: Phaser.AUTO,
  parent: "game",
  scene: [ MainScene, OtherScene, GameSnake ]
});
