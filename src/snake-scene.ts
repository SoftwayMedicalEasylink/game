
export class SnakeScene extends Phaser.Scene {
  logo: Phaser.GameObjects.Sprite;
  endKey: Phaser.Input.Keyboard.Key;
  player: Phaser.Physics.Arcade.Sprite;
  cursors;
  gameOver;
  color = new Phaser.Display.Color();
  score = 0;
  capsule;
  scoreText;
  velocityX = 0;
  velocityY = 0;
  ground;
  side;
  VELOCITY = 32;
  DeadSnake;

  constructor() {
    super('GameSnake');
  }

  preload(): void {
    this.load.image('chess', "./assets/images/chess.png");
    this.load.image('ground', "./assets/images/ground.png");
    this.load.image('cube', "./assets/images/cube.png");
    this.load.image('capsule', "./assets/images/capsule.png");
    this.load.image('side', "./assets/images/side.png");
    this.load.image('DeadSnake', "./assets/images/DeadSnake.png");
    this.endKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END);
  }

  create(): void {
    var chess = this.add.image(257, 257, 'chess');
    this.ground = this.physics.add.staticGroup();
    this.ground.create(257, 529, 'ground');
    this.ground.create(257, -15, 'ground');
    this.side = this.physics.add.staticGroup();
    this.side.create(-15, 257, 'side');
    this.side.create(529, 257, 'side');
    this.player = this.physics.add.sprite(49, 273, 'cube');
    this.player.scale = 0.25;
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground, this.collides(this.player, this.ground));
    this.physics.add.collider(this.player, this.side, this.collides2(this.player, this.side));

    this.player.setBounce(0);
    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.overlap(this.player, this.capsule);
    this.scoreText = this.add.text(16, 514, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.time.addEvent({
      delay: 250,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });
  };
  collides (player:any, ground:any): ArcadePhysicsCallback {
    return (player, ground) => {
      this.gameOver = true
    }
  }
  collides2 (player:any, side:any): ArcadePhysicsCallback {
    return (player, side) => {
      this.gameOver = true
    }
  }
  

  update() {
    if (this.gameOver) {
      this.player.disableBody(true, true);
      this.add.text(0, 150, 'GAME OVER', { fontSize: '94px', fill: '#DA3A19' });
      this.DeadSnake = this.add.image(321, 321, 'DeadSnake');
      this.DeadSnake.scale = 0.25;
      this.player.x = 0;
      this.player.y = 0;
      return;
    }
    if (this.endKey.isDown) {
      this.player.setTint(this.color.random(50).color);
    };
    if (this.cursors.left.isDown) {
      this.velocityX = -this.VELOCITY;
      this.velocityY = 0;
    };
    if (this.cursors.right.isDown) {
      this.velocityX = this.VELOCITY;
      this.velocityY = 0;
    };
    if (this.cursors.up.isDown) {
      this.velocityX = 0;
      this.velocityY = -this.VELOCITY;
    };
    if (this.cursors.down.isDown) {
      this.velocityX = 0;
      this.velocityY = this.VELOCITY;
    };
};
  moveSnake(): void {
    this.player.x += this.velocityX;
    this.player.y += this.velocityY;
  };
}