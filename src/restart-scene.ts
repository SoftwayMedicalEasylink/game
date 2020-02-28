export class RestartScene extends Phaser.Scene {
  SpaceKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'RestartScene' });
  }

  preload(): void {

  }

  create(): void {
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }
  
  update(): void {
    if (this.SpaceKey.isDown) {
      this.scene.remove('PouetScene');
      this.scene.start('PouetScene');
    };

  }

}