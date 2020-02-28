import { SnakeScene } from "./snake-scene";

export class RestartScene extends Phaser.Scene {
  SpaceKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'RestartScene' });
  }

  preload(): void {

  }

  create(): void {
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.scene.manager.remove('SnakeScene');
  }
  
  update(): void {
    this.scene.manager.stop('RestartScene');
    setTimeout(() => {
      this.scene.manager.add('SnakeScene', new SnakeScene(), true);
    }, 200);
  }

}