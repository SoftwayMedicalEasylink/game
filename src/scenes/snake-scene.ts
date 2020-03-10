import { GameOver } from "../objects/game-over";
import { Scores } from "../objects/Scores";

export class SnakeScene extends Phaser.Scene {
  color = new Phaser.Display.Color();
  chess: Phaser.GameObjects.Image;
  tile = 32;
  player: Phaser.Physics.Arcade.Sprite;
  cursors;
  timerEvent: Phaser.Time.TimerEvent;
  Speed = 500;
  velocityX = 0;
  velocityY = 0;
  VELOCITY = 32;
  SpaceKey: Phaser.Input.Keyboard.Key;
  SPACE = 'SPACE';
  Ncapsule: number;
  capsule: Phaser.Physics.Arcade.Sprite;
  status = 'playing';
  QKey: Phaser.Input.Keyboard.Key;
  ZKey: Phaser.Input.Keyboard.Key;
  SKey: Phaser.Input.Keyboard.Key;
  DKey: Phaser.Input.Keyboard.Key;
  gameOver: GameOver;
  Scores: Scores;

  constructor() {
    super({ key: 'SnakeScene' });
  }
  
  preload(): void {
    this.load.image('chess', "./assets/images/chess.png");
    this.load.image('ground', "./assets/images/ground.png");
    this.load.image('cube', "./assets/images/cube.png");
    this.load.image('capsule', "./assets/images/capsule.png");
    this.load.image('Wallside', "./assets/images/side.png");
    this.ZKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z );
    this.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q );
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S );
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D );
    
    this.gameOver = new GameOver(this);
    this.Scores = new Scores(this);
    this.gameOver.preload();
  }
  
  create(): void {
    this.chess = this.add.image(0, 0, 'chess').setOrigin(0);
    var Walls = this.physics.add.staticGroup();
    var groundUp = this.add.image(this.tile * 0, this.tile * -1, 'ground').setOrigin(0);
    var groundDown = this.add.image(this.tile * 0, this.tile * 16, 'ground').setOrigin(0);
    var sideLeft = this.add.image(this.tile * -1, this.tile * 0, 'Wallside').setOrigin(0);
    var sideRight = this.add.image(this.tile * 16, this.tile * 0, 'Wallside').setOrigin(0);
    Walls.add(groundUp);
    Walls.add(groundDown);
    Walls.add(sideLeft);
    Walls.add(sideRight);
    this.player = this.physics.add.sprite(this.tile, this.tile * 8, 'cube').setOrigin(0);
    this.player.scale = 0.25;
    this.player.setCollideWorldBounds(false);
    this.physics.add.collider(this.player, Walls, this.collides(this.player, Walls));
    this.player.setBounce(0);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.Scores.ShowScore();
    
    this.timerEvent = this.time.addEvent({
      delay: this.Speed,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });
    
    this.Ncapsule = 1;
    const capsule = this.physics.add.sprite(this.tile * 11, this.tile * 8, 'capsule').setOrigin(0);
    capsule.scale = 0.25;
    this.physics.add.overlap(this.player, capsule, this.collectCapsule());
  };

  collectCapsule(): ArcadePhysicsCallback {
    return (player: Phaser.Physics.Arcade.Sprite, capsule: Phaser.Physics.Arcade.Sprite) => {
      capsule.disableBody(true, true);
      this.Scores.addPoint()
    }
  }
  
  collides(player: any, ground: any): ArcadePhysicsCallback {
    return (player, ground) => {
      this.gameOver.show();
    }
  }
  
  update() {
    if (this.gameOver.isShown()) {
      if (this.status !== 'gameover') {
        this.status = 'gameover';
        this.player.disableBody(true, true);
        this.player.x = this.tile;
        this.player.y = this.tile * 8;
        this.velocityX = 0;
        this.velocityY = 0;
        this.chess.setVisible(true);
        this.chess.setTint(0xFFB5B5);
      }
      this.gameOver.update();
      return;
    }
    this.Scores.BonusScore();
    if (this.Ncapsule == 0) {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      for (let i = 0; i < 16; i++) {
        var prc = getRandomInt(2);
        if (prc === 1) {
          this.capsule = this.physics.add.sprite(this.tile * getRandomInt(16), this.tile * getRandomInt(16), 'capsule').setOrigin(0);
          this.capsule.scale = 0.25;
          this.Ncapsule += 1;
          this.physics.add.overlap(this.player, this.capsule, this.collectCapsule());
        };
      };
    };
    /*if (this.cursors.left.isDown || this.QKey.isDown) {
      this.velocityX = -this.VELOCITY;
      this.velocityY = 0;
    }
    if(this.cursors.right.isDown || this.DKey.isDown) {
      this.velocityX = this.VELOCITY;
      this.velocityY = 0;
    }
    
    if (this.cursors.up.isDown || this.ZKey.isDown) {
      this.velocityX = 0;
      this.velocityY = -this.VELOCITY;
    }

    if(this.cursors.down.isDown || this.SKey.isDown) {
      this.velocityX = 0;
      this.velocityY = this.VELOCITY;
    }*/
    if (this.velocityX <= 0 && (this.cursors.left.isDown || this.QKey.isDown)) {
      this.velocityX = -this.VELOCITY;
      this.velocityY = 0;
    }
    if(this.velocityX >= 0 && (this.cursors.right.isDown || this.DKey.isDown)) {
      this.velocityX = this.VELOCITY;
      this.velocityY = 0;
    }
    if (this.velocityY <= 0 && (this.cursors.up.isDown || this.ZKey.isDown)) {
      this.velocityX = 0;
      this.velocityY = -this.VELOCITY;
    }
    if(this.velocityY >= 0 && (this.cursors.down.isDown || this.SKey.isDown)) {
      this.velocityX = 0;
      this.velocityY = this.VELOCITY;
    }
  };
  moveSnake(): void {
    this.player.x += this.velocityX;
    this.player.y += this.velocityY;
  };
}