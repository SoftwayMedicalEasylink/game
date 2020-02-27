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
    var ground = this.physics.add.staticGroup();
    ground.create(256, 527, 'ground');
    this.player = this.physics.add.sprite(48, 271, 'cube');
    this.player.scale = 0.25;
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, ground);

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
  };

  update() {
    if (this.gameOver) {
      this.player.disableBody(true, true);
      this.add.text(0, 260, 'GAME OVER', { fontSize: '94px', fill: '#DA3A19' });
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      return;
    };
    if (this.endKey.isDown) {
      this.player.setTint(this.color.random(50).color);
    };
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.setVelocityY(0);
    };
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(100);
      this.player.setVelocityY(0);
    };
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-100);
      this.player.setVelocityX(0);
    };
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(100);
      this.player.setVelocityX(0);
    };
    function collectCapsule(player, capsule) {

      capsule.disableBody(true, true);
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score)
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