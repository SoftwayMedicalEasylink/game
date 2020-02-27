export class GameSnake extends Phaser.Scene {
  logo: Phaser.GameObjects.Sprite;
  escKey: any;

  constructor() {
    super('GameSnake');
  }

  preload (): void {
    this.load.image("chess", "./assets/images/phaser.png");
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC );
  };
  create (): void {
    //chess = this.add.image(256, 255, 'chess');
    const logo = this.load.image('chess', "./assets/images/phaser.png");
  };
  upload (): void {
    if (this.escKey.isDown)  {
      this.scene.start('MainScene');
    }
  };
};










var config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  backgroundColor: 'fff',
  parent: "game",
  physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};
var game = new Phaser.Game(config);

function preload() {
  this.load.image('chess', "./assets/images/chess.png");
  this.load.image('ground', "./assets/images/ground.png");
  this.load.image('cube', "./assets/images/cube.png");
  this.EndKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END );
}
var player;
var Ground;
var chess;
var cursors;
var gameOver = false;
var color = new Phaser.Display.Color();

function create() {
  chess = this.add.image(256, 255, 'chess');
  Ground = this.physics.add.staticGroup();
  //ground.create (230, 159, 'ground')  -->   +32  -->   ground.create (230, 191, 'ground')
  Ground.create (256, 255, 'ground').refreshBody();;
  Ground.create (256, 223, 'ground').refreshBody();;
  player = this.physics.add.sprite(48, 271, 'cube');
  player.scale = 0.25;
  player.setCollideWorldBounds(true);
  this.physics.add.collider(Ground, player);
  player.setBounce(0);
  cursors = this.input.keyboard.createCursorKeys()
    /*function Food (scene, x, y)
    {
        Phaser.GameObjects.Image.call(this, scene)

        this.setTexture('cue');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0);

        this.total = 0;

        scene.children.add(this);
    };*/
};

function update() {
  if (gameOver) {
    player.disableBody(true, true);
    this.add.text(0, 260, 'GAME OVER', { fontSize: '94px', fill: '#DA3A19' });
    player.setVelocityX(0);
    player.setVelocityY(0);
    return;
  }
  if (this.EndKey.isDown) {
    player.setTint(color.random(50));
  }
  if (cursors.left.isDown) {
    player.setVelocityX(-100);
    player.setVelocityY(0);
  }
  if (cursors.right.isDown) {
    player.setVelocityX(100);
    player.setVelocityY(0);
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-100);
    player.setVelocityX(0);
  }
  if (cursors.down.isDown) {
    player.setVelocityY(100);
    player.setVelocityX(0);
  }
}
/*function HitGround(player, ground) {
  gameOver = true;
  }
/*function sUP () {
  player.setVelocityX(-50);
  player.setVelocityY(0);
};*/