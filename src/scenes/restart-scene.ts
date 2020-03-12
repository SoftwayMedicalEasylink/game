import { SnakeScene } from "./snake-scene";

export class RestartScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'RestartScene' });
  }

  preload(): void {

  }
  create(): void {
    this.scene.manager.remove('SnakeScene');
  }
  
  update(): void {
    this.scene.manager.stop('RestartScene');
    setTimeout(() => {
      this.scene.manager.add('SnakeScene', new SnakeScene(), true);
    }, 200);
  }

}