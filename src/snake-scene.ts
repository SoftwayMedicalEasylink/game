const VELOCITY = 32;

export class SnakeScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors;
  velocityX = 0;
  velocityY = 0;

  constructor() {
    super('GameSnake');
  }

  preload(): void {
    this.load.image('cube', "./assets/images/cube.png");
    this.load.image('chess',"./assets/images/chess.png");
  }

  create(): void {
    this.add.image(256, 256, 'chess');
    this.player = this.physics.add.sprite(48, 272, 'cube');
    this.player.scale = 0.25;
    this.cursors = this.input.keyboard.createCursorKeys()
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });
  };
  

  update() {
    if (this.cursors.left.isDown) {
      this.velocityX = -VELOCITY;
      this.velocityY = 0;
    };
    if (this.cursors.right.isDown) {
      this.velocityX = VELOCITY;
      this.velocityY = 0;
    };
    if (this.cursors.up.isDown) {
      this.velocityX = 0;
      this.velocityY = -VELOCITY;
    };
    if (this.cursors.down.isDown) {
      this.velocityX = 0;
      this.velocityY = VELOCITY;
    };
};
  moveSnake(): void {
    this.player.x += this.velocityX;
    this.player.y += this.velocityY;
  };
}