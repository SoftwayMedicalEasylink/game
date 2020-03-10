import { GameOver } from "../objects/game-over";
import { Scores } from "../objects/Scores";
import { Hashtags } from "../objects/hashtag";

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
  Nhashtags: number;
  hashtag: Hashtags;
  status = 'playing';
  QKey: Phaser.Input.Keyboard.Key;
  ZKey: Phaser.Input.Keyboard.Key;
  SKey: Phaser.Input.Keyboard.Key;
  DKey: Phaser.Input.Keyboard.Key;
  gameOver: GameOver;
  Scores: Scores;
  availableColors = ['#00ff00', '#0033cc', '#ff00ff', '#ff6600', '#ff0000', '#ffff00', '#009900', '#990099'];
  availableHastags = ['#CULTURECLIENT', '#EXPERTISE', '#HONÈTETÉ', '#AUDACE', "#SENSDEL'ENGAGEMENT"]
  word;
  Nword = 0;
  WordText;

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
    this.WordText = this.add.text(300, 514, 'Word: ' + this.Nword, { fontSize: '32px', fill: '#000' });
    
    this.timerEvent = this.time.addEvent({
      delay: this.Speed,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });
    this.Nhashtags = 1;
    this.hashtag = new Hashtags(this, this.tile * 12.5, this.tile * 8.5,'#', '#000');
    this.physics.add.overlap(this.player, this.hashtag, this.collectHashtag());
    this.player.setCollideWorldBounds(true);
  };

  generateHashtags() {
    this.Nhashtags = 0;
    this.word = this.availableHastags[this.getRandomInt(5)]
    for (let letter of this.word) {
      this.hashtag = new Hashtags(this, this.tile * (this.getRandomInt(16) + 0.5), this.tile * (this.getRandomInt(16) + 0.5), letter, this.availableColors[this.getRandomInt(8)]);
      this.physics.add.overlap(this.player, this.hashtag, this.collectHashtag());
      this.Nhashtags++;
    };    
  }

  collectHashtag(): ArcadePhysicsCallback {
    return (player: Phaser.GameObjects.GameObject, hashtag: Phaser.GameObjects.GameObject) => {
      hashtag.destroy();
      this.Scores.addPoint()
    }
  }
  
  collides(player: any, ground: any): ArcadePhysicsCallback {
    return (player, ground) => {
      this.gameOver.show();
    }
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
    if (this.Nhashtags == 0) {
      this.generateHashtags();
      this.Nword++;
      this.WordText.setText('Word: ' + this.Nword);
    };

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