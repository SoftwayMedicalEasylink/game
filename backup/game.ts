import "phaser";
import { GameSnake } from "../src/game-snake";
import { MainScene } from "./main-scene";
import { OtherScene } from "./other-scene";

new Phaser.Game({
  width: 800,
  height: 600,
  backgroundColor: '#F0F0F0',
  type: Phaser.AUTO,
  parent: "game",
  scene: [ MainScene, OtherScene, GameSnake ]
});
