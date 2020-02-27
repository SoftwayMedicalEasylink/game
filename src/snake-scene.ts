const VELOCITY = 32;

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

  constructor() {
    super('GameSnake');
  }

  preload(): void {
    this.load.image('chess', "./assets/images/chess.png");
    this.load.image('ground', "./assets/images/ground.png");
    this.load.image('cube', "./assets/images/cube.png");
    this.load.image('capsule', "./assets/images/capsule.png");
    this.endKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END);
  }

  create(): void {
    var chess = this.add.image(256, 256, 'chess');
    this.ground = this.physics.add.staticGroup();
    this.ground.create(256, 527, 'ground');
    this.player = this.physics.add.sprite(48, 272, 'cube');
    this.player.scale = 0.25;
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground, this.collides(this.player, this.ground));

    this.player.setBounce(0);
    this.cursors = this.input.keyboard.createCursorKeys()
    /*function Food (scene, x, y)
    {
        Phaser.GameObjects.Image.call(this, scene)
   
        this.setTexture('capsule');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0);
   
        this.total = 0;
   
        scene.children.add(this);
    }; */
    this.physics.add.overlap(this.player, this.capsule);
    this.scoreText = this.add.text(16, 512, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });
  };
  collides (player:any, ground:any): ArcadePhysicsCallback {
    return (player, ground) => {
      this.velocityY = 0;
    }
  }
  

  update() {
    if (this.gameOver) {
      this.player.disableBody(true, true);
      this.add.text(0, 260, 'GAME OVER', { fontSize: '94px', fill: '#DA3A19' });
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      return;
    }

    if (this.endKey.isDown) {
      this.player.setTint(this.color.random(50).color);
    };
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
    /*if (this.player, this.ground) {
      collides(): void {
        this.Ypos = 0;
      };
    }*/
    /* collectCapsule(player, capsule): void {

      capsule.disableBody(true, true);
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score)
    };   */
};
  moveSnake(): void {
    this.player.x += this.velocityX;
    this.player.y += this.velocityY;
  };
}