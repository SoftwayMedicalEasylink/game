export class PouetScene extends Phaser.Scene {
  SpaceKey: Phaser.Input.Keyboard.Key;
  dejaInitialise: boolean;

  constructor() {
    super({ key: 'PouetScene' });
  }

  preload(): void {
    this.load.image('chess', "./assets/images/chess.png");

  }

  create(): void {
    console.log(this.dejaInitialise)
    this.dejaInitialise = true;

    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
     this.add.image(0, 0, 'chess').setOrigin(0);
  }
  
  update(): void {
    if (this.SpaceKey.isDown) {
      this.scene.start('RestartScene');
    };

  }

}