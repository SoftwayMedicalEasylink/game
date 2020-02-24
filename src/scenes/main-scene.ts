import { Game } from "phaser";

export class MainScene extends Phaser.Scene {
  phaserSprite: Phaser.GameObjects.Sprite;
  upKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    this.load.image("myImage", "./assets/images/phaser.png");
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, "myImage");
  }

  update(): void {
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonReleased()) {
        this.scene.start('OtherScene');
      }
    })

    if (this.upKey.isDown) {
      this.phaserSprite.y -= 1;
    }
  }
}
