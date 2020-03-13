import { GameOver } from "../objects/game-over";
import { Scores } from "../objects/Scores";
import { Hashtags } from "../objects/hashtag";
import { Direction, canTurn, getVelocity } from "../objects/direction";
import { BodyPart } from "../objects/BodyPart";

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
  status = 'playing';
  QKey: Phaser.Input.Keyboard.Key;
  ZKey: Phaser.Input.Keyboard.Key;
  SKey: Phaser.Input.Keyboard.Key;
  DKey: Phaser.Input.Keyboard.Key;
  HOMEKey: Phaser.Input.Keyboard.Key;
  PUPKey: Phaser.Input.Keyboard.Key;
  PDOWNKey: Phaser.Input.Keyboard.Key;
  ENDKey: Phaser.Input.Keyboard.Key;
  gameOver: GameOver;
  Scores: Scores;
  BodyPart: BodyPart
  availableColors = ['#00ff00', '#0033cc', '#ff00ff', '#ff6600', '#ff0000', '#888888', '#009900', '#990099'];
  availableHastags = ["#CULTURECLIENT", "#EXPERTISE", "#HONNETETE", "#AUDACE", "#SENSDEL'ENGAGEMENT", "#ESPRITD'EQUIPE"]
  word: string | any[];
  Nword = 0;
  WordText: Phaser.GameObjects.Text;
  hashtagsGroup: Phaser.Physics.Arcade.Group;
  wallsGroup: Phaser.Physics.Arcade.StaticGroup;
  devText: Phaser.GameObjects.Text;
  valid = 0;
  gameOverCollider: Phaser.Physics.Arcade.Collider;
  gameBounds: Phaser.Geom.Rectangle;
  ModeDevText: Phaser.GameObjects.Text;
  indexAManger: number;
  currentDirection: Direction;
  nextDirection: Direction;
  GameStarting = 0;
  BodyPartGroup: any;

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
    this.HOMEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME);
    this.PUPKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_UP);
    this.PDOWNKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN);
    this.ENDKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END);
    
    this.gameOver = new GameOver(this);
    this.Scores = new Scores(this);
    this.gameOver.preload();
  }

  create(): void {
    this.timerEvent = this.time.addEvent({});
    this.gameBounds = new Phaser.Geom.Rectangle(0, 0, this.game.config.width as number - this.tile, this.game.config.height as number - this.tile * 2);
    this.chess = this.add.image(0, 0, 'chess').setOrigin(0);
    this.wallsGroup = this.physics.add.staticGroup();
    this.wallsGroup.create(this.tile * 0, this.tile * -1, 'ground').setOrigin(0).refreshBody();
    this.wallsGroup.create(this.tile * 0, this.tile * 16, 'ground').setOrigin(0).refreshBody();
    this.wallsGroup.create(this.tile * -1, this.tile * 0, 'Wallside').setOrigin(0).refreshBody();
    this.wallsGroup.create(this.tile * 16, this.tile * 0, 'Wallside').setOrigin(0).refreshBody();
    this.player = this.physics.add.sprite(this.tile, this.tile * 8, 'cube').setOrigin(0);
    this.player.scale = 0.25;
    this.gameOverCollider = this.physics.add.collider(this.player, this.wallsGroup, this.collides(this.player, this.wallsGroup));
    this.player.setBounce(0);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.Scores.ShowScore();
    this.Scores.RestartMovement()
    this.devText = this.add.text(this.tile * 14.53, this.tile * 14.4, this.blinkdev(), { fontSize: '100px', fill: '#00FF00' });
    this.devText.setText(undefined);
    this.WordText = this.add.text(300, 514, 'Word: ' + this.Nword, { fontSize: '32px', fill: '#000' });
    this.Nhashtags = 1;
    this.hashtagsGroup = this.physics.add.group();
    this.physics.add.overlap(this.hashtagsGroup, this.hashtagsGroup, this.collidesHashtag());
    this.word = '#';
    this.indexAManger = 0;
    const hashtag = new Hashtags(this, this.tile * 12.5, this.tile * 8.5,'#', '#000');
    this.physics.add.overlap(this.player, hashtag, this.collectHashtag());
    this.hashtagsGroup.add(hashtag);
    this.BodyPartGroup = this.physics.add.group();
    this.BodyPart = new BodyPart(this, this.player, this.BodyPartGroup);
    this.BodyPart.addBody()
    this.physics.add.collider(this.player, this.BodyPartGroup, this.collidesBody());
  }
  
  collidesBody(): ArcadePhysicsCallback {
    return (object1, object2) => {
      if (this.GameStarting === 1) {
        this.triggerGameOver();
      }
    }
  }
  
  generateHashtags() {
    this.GameStarting = 1;
    this.Nhashtags = 0;
    this.word = this.availableHastags[this.getRandomInt(5)]
    this.indexAManger = 0;
    for (let letter of this.word) {
      const hashtag = new Hashtags(this, this.generateRandomPosition(), this.generateRandomPosition(), letter, this.availableColors[this.getRandomInt(8)]);
      this.physics.add.overlap(this.player, hashtag, this.collectHashtag());
      this.hashtagsGroup.add(hashtag);
      this.Nhashtags++;
    };
  }

  Movement() {
    this.timerEvent.reset({
      delay: this.Speed,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });
  }

  collectHashtag(): ArcadePhysicsCallback {
    return (_player: Phaser.GameObjects.GameObject, hashtag: Hashtags) => {
      const lettreAManger = this.word[this.indexAManger];
      if (lettreAManger === hashtag.text) {
        hashtag.destroy();
        this.Scores.addPoint();
        this.indexAManger++;
        this.BodyPart.addBody()
      }
      else {
        hashtag.setPosition(this.generateRandomPosition(), this.generateRandomPosition())
        this.Scores.removePoint();
      }
    }
  }
  
  collidesHashtag(): ArcadePhysicsCallback {
    return (hashtag1: Hashtags, hashtag2: Hashtags) => {
      hashtag1.setPosition(this.generateRandomPosition(), this.generateRandomPosition())
    }
  }
  
  collides(player: any, ground: any): ArcadePhysicsCallback {
    return (player, ground) => {
      this.triggerGameOver();
    }
  }

  private triggerGameOver() {
    this.Scores.Highscore();
    this.gameOver.show();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  update() {
    if (this.gameOver.isShown()) {
      this.player.disableBody(true, true);
      this.player.x = this.tile;
      this.player.y = this.tile * 8;
      this.velocityX = 0;
      this.velocityY = 0;
      this.chess.setVisible(true);
      this.chess.setTint(0xFFB5B5);
      this.gameOver.update();
      return;
    }
    this.Scores.BonusScore();
    if (this.Nhashtags == 0) {
      this.generateHashtags();
      this.Nword++;
      this.WordText.setText('Word: ' + this.Nword);
    };
    if (canTurn(this.currentDirection, 'LEFT') && (this.cursors.left.isDown || this.QKey.isDown)) {
      this.nextDirection = 'LEFT';
    }
    if (canTurn(this.currentDirection, 'RIGHT') && (this.cursors.right.isDown || this.DKey.isDown)) {
      this.nextDirection = 'RIGHT';
    }
    if (canTurn(this.currentDirection, 'UP') && (this.cursors.up.isDown || this.ZKey.isDown)) {
      this.nextDirection = 'UP';
    }
    if (canTurn(this.currentDirection, 'DOWN') && (this.cursors.down.isDown || this.SKey.isDown)) {
      this.nextDirection = 'DOWN';
    }
    const HOMEKeyJustDown = Phaser.Input.Keyboard.JustDown(this.HOMEKey);
    if (HOMEKeyJustDown && this.valid === 0) {
      this.valid = 1;
      this.Scores.scoreText.destroy();
      this.Scores.scoreText = this.add.text(16, 514, 'Score: ' + this.Scores.score, { fontSize: '32px', fill: '#000FFF' });
      this.WordText.destroy();
      this.WordText = this.add.text(300, 514, 'Word: ' + this.Nword, { fontSize: '32px', fill: '#000FFF' });
      this.ModeDevText = this.add.text(0, 0, 'Development mod', { fontSize: '15 px', fill: '#000FFF' });
    } 
    else if (HOMEKeyJustDown && this.valid === 1) {
      this.valid = 0;
      this.devText.setText(undefined);
      this.Scores.scoreText.destroy();
      this.Scores.scoreText = this.add.text(16, 514, 'Score: ' + this.Scores.score, { fontSize: '32px', fill: '#000' });
      this.WordText.destroy();
      this.WordText = this.add.text(300, 514, 'Word: ' + this.Nword, { fontSize: '32px', fill: '#000' });
      this.ModeDevText.destroy();
    }
    if (this.valid === 1) {
      if (Phaser.Input.Keyboard.JustDown(this.PUPKey)) {
        this.Scores.addPointDev();
      }
      else if (Phaser.Input.Keyboard.JustDown(this.PDOWNKey)) {
        this.Scores.removePointDev();
      }
      if (Phaser.Input.Keyboard.JustDown(this.ENDKey)) {
        this.BodyPart.addBody()
      }

      this.devText.setText(this.blinkdev());
    }
  };

  moveSnake(): void {
    const velocity = getVelocity(this.nextDirection, this.VELOCITY);
    if (velocity) {
      this.currentDirection = this.nextDirection;
      const targetX = this.player.x + velocity.velocityX;
      const targetY = this.player.y + velocity.velocityY;
      if (this.valid === 0 || this.gameBounds.contains(targetX, targetY)) {
        this.player.x = targetX;
        this.player.y = targetY;
      }
      this.BodyPart.DiffPosition()
    }
  };

  generateRandomPosition(): number {
    return this.tile * (this.getRandomInt(16) + 0.5)
  }

  blinkdev() {
    if (this.time.now % 1000 < 500) {
      return ".";
    }
    else {
      return " ";
    }
  };
}