var player;
var ground;
var chess;
var cursors;
var gameOver = false;
var color = new Phaser.Display.Color();
var score = 0;
var capsule;
var scoreText;

export class SnakeScene extends Phaser.Scene {
  logo: Phaser.GameObjects.Sprite;
  endKey: Phaser.Input.Keyboard.Key;

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
    chess = this.add.image(256, 255, 'chess');
    ground = this.physics.add.staticGroup();
    ground.create(256, 255, 'ground');
    player = this.physics.add.sprite(48, 271, 'cube');
    player.scale = 0.25;
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, ground);
    player.setBounce(0);
    cursors = this.input.keyboard.createCursorKeys()
    /*function Food (scene, x, y)
    {
        Phaser.GameObjects.Image.call(this, scene)
   
        this.setTexture('capsule');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0);
   
        this.total = 0;
   
        scene.children.add(this);
    }; */
    this.physics.add.overlap(player, capsule);
    scoreText = this.add.text(16, 512, 'score: 0', { fontSize: '32px', fill: '#000' });
  };

  update() {
    if (gameOver) {
      player.disableBody(true, true);
      this.add.text(0, 260, 'GAME OVER', { fontSize: '94px', fill: '#DA3A19' });
      player.setVelocityX(0);
      player.setVelocityY(0);
      return;
    };
    if (this.endKey.isDown) {
      player.setTint(color.random(50));
    };
    if (cursors.left.isDown) {
      player.setVelocityX(-100);
      player.setVelocityY(0);
    };
    if (cursors.right.isDown) {
      player.setVelocityX(100);
      player.setVelocityY(0);
    };
    if (cursors.up.isDown) {
      player.setVelocityY(-100);
      player.setVelocityX(0);
    };
    if (cursors.down.isDown) {
      player.setVelocityY(100);
      player.setVelocityX(0);
    };
    function collectCapsule(player, capsule) {

      capsule.disableBody(true, true);
      score += 1;
      scoreText.setText('Score: ' + score)
    };
};

/*function HitGround(player, ground) {
  gameOver = true;
  }
  function sUP () {
  player.setVelocityX(-50);
  player.setVelocityY(0);
} */
}