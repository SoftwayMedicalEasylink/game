export class OtherScene extends Phaser.Scene {

  constructor() {
    super('OtherScene');
  }

  preload(): void {
  }

  create(): void {
    const phaserSprite = this.add.sprite(400, 300, "myImage");
    phaserSprite.scaleY = -1;
  }

  update(): void {
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonReleased()) {
        this.scene.start('MainScene');
      }
    })
  }
}
