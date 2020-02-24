import "phaser";
import { MainScene } from "./scenes/main-scene";
import { OtherScene } from "./scenes/other-scene";

new Phaser.Game({
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: [ MainScene, OtherScene ]
});
