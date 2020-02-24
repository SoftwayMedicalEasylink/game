import "phaser";
import { MainScene } from "./scenes/main-scene";
import { OtherScene } from "./scenes/other-scene";

// when the page is loaded, create our game instance
window.addEventListener("load", createGame);

function createGame() {
  const game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [ MainScene, OtherScene ]
  });
}
