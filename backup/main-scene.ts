import { Game } from "phaser";

export class MainScene extends Phaser.Scene {
  phaserSprite: Phaser.GameObjects.Sprite;
  upKey: Phaser.Input.Keyboard.Key;
  SKey: Phaser.Input.Keyboard.Key;
  NKey: Phaser.Input.Keyboard.Key;
  AKey: Phaser.Input.Keyboard.Key;
  KKey: Phaser.Input.Keyboard.Key;
  EKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    this.load.image("myImage2", "./assets/images/softway.png");
    //this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S );
    this.NKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N );
    this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A );
    this.KKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K );
    this.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E );
  }

  create(): void {
    //const logo = this.phaserSprite = this.add.sprite(400, 300, "myImage2");
    const logo = this.add.sprite(400, 300, "myImage2");
    logo.scale = 0.5;
  }

  update(): void {
    /*this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonReleased()) {
        this.scene.start('OtherScene');
      }
    })*/
    if (this.SKey.isDown && this.NKey.isDown && this.AKey.isDown && this.KKey.isDown && this.EKey.isDown)  {
      this.scene.start('OtherScene');
    }
    /*if (this.upKey.isDown) {      
      this.phaserSprite.y -= 50;
    }*/
  }
}
