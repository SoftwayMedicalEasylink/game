export class SnakeScene extends Phaser.Scene {
  color = new Phaser.Display.Color();
  chess: Phaser.GameObjects.Image;
  tile = 32;
  player: Phaser.Physics.Arcade.Sprite;
  cursors;
  DeadSnake;
  score = 0;
  scoreText;
  timerEvent: Phaser.Time.TimerEvent;
  Speed = 500;
  velocityX = 0;
  velocityY = 0;
  VELOCITY = 32;
  gameOver;
  SpaceKey: Phaser.Input.Keyboard.Key;
  SPACE = 'SPACE';
  Ncapsule: number;
  capsule: Phaser.Physics.Arcade.Sprite;
  status = 'playing';
  restartText: Phaser.GameObjects.Text;
  QKey: Phaser.Input.Keyboard.Key;
  ZKey: Phaser.Input.Keyboard.Key;
  SKey: Phaser.Input.Keyboard.Key;
  DKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'SnakeScene' });
  }

  preload(): void {
    this.load.image('chess', "./assets/images/chess.png");
    this.load.image('ground', "./assets/images/ground.png");
    this.load.image('cube', "./assets/images/cube.png");
    this.load.image('capsule', "./assets/images/capsule.png");
    this.load.image('Wallside', "./assets/images/side.png");
    this.load.image('DeadSnake', "./assets/images/DeadSnake.png");
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.ZKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z );
    this.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q );
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S );
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D );
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
    this.scoreText = this.add.text(16, 514, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

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
      this.score += 1;
      this.Ncapsule -= 1;
      this.scoreText.setText('Score: ' + this.score)
    }
  }
  
  collides(player: any, ground: any): ArcadePhysicsCallback {
    return (player, ground) => {
      this.gameOver = true
    }
  }
  
  blink(): string {
    if (this.time.now % 1000 < 500) {
      return "SPACE";
    }
    else {
      return "     ";
    }
  }
  
  update() {
    if (this.gameOver) {
      if (this.status !== 'gameover') {
        this.status = 'gameover';
        this.player.disableBody(true, true);
        this.player.x = this.tile;
        this.player.y = this.tile * 8;
        this.chess.setVisible(true);
        this.chess.setTint(0xFFB5B5);
        this.add.text(0, 150, 'GAME OVER', { fontSize: '94px', fill: '#870000' });
        this.restartText = this.add.text(30, 230, 'Press ' + this.blink() + ' to restart', { fontSize: '34px', fill: '#870000', });
        this.DeadSnake = this.add.image(321, 321, 'DeadSnake');
        this.DeadSnake.scale = 0.25;
      }
      this.restartText.setText('Press ' + this.blink() + ' to restart');
      if (this.SpaceKey.isDown) {
        this.scene.manager.stop('SnakeScene');
        this.scene.manager.start('RestartScene');
      };
      return;
    }
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
    if (this.score === 1) {
      this.chess.setVisible(true);
      this.Speed = 250;
      if (this.timerEvent.delay !== this.Speed) {
        this.timerEvent = this.timerEvent.reset({
          delay: this.Speed,
          loop: true,
          callback: this.moveSnake,
          callbackScope: this
        });
      }
    };
    if (this.score === 5) {
      this.chess.setVisible(false);
      this.Speed = 175;
      if (this.timerEvent.delay !== this.Speed) {
        this.timerEvent = this.timerEvent.reset({
          delay: this.Speed,
          loop: true,
          callback: this.moveSnake,
          callbackScope: this
        });
      }
    };
    if (this.score === 15) {
      this.chess.setVisible(true);
      this.Speed = 100;
      if (this.timerEvent.delay !== this.Speed) {
        this.timerEvent = this.timerEvent.reset({
          delay: this.Speed,
          loop: true,
          callback: this.moveSnake,
          callbackScope: this
        });
      }
    };
    if (this.score === 25) {
      this.Speed = 125;
      if (this.timerEvent.delay !== this.Speed) {
        this.timerEvent = this.timerEvent.reset({
          delay: this.Speed,
          loop: true,
          callback: this.moveSnake,
          callbackScope: this
        });
      }
    };
    if (this.score >= 50 && this.score < 100) {
      this.chess.setTint(0x252525)
      this.player.setTint(0x666666)
      this.Speed = 125;
      if (this.timerEvent.delay !== this.Speed) {
        this.timerEvent = this.timerEvent.reset({
          delay: this.Speed,
          loop: true,
          callback: this.moveSnake,
          callbackScope: this
        });
      }
    };
    if (this.score >= 100 && this.score < 102) {
      this.chess.setTint(this.color.random(50).color)
      this.player.setTint(this.color.random(50).color)
      this.Speed = 30;
      if (this.timerEvent.delay !== this.Speed) {
        this.timerEvent = this.timerEvent.reset({
          delay: this.Speed,
          loop: true,
          callback: this.moveSnake,
          callbackScope: this
        });
      }
    };
    if (this.score === 102) {
      this.chess.setTint();
      this.player.setTint();
      this.Speed = 60;
      if (this.timerEvent.delay !== this.Speed) {
        this.timerEvent = this.timerEvent.reset({
          delay: this.Speed,
          loop: true,
          callback: this.moveSnake,
          callbackScope: this
        });
      }
    };
    if (this.cursors.left.isDown || this.QKey.isDown) {
      this.velocityX = -this.VELOCITY;
      this.velocityY = 0;
    };
    if (this.cursors.right.isDown || this.DKey.isDown) {
      this.velocityX = this.VELOCITY;
      this.velocityY = 0;
    };
    if (this.cursors.up.isDown || this.ZKey.isDown) {
      this.velocityX = 0;
      this.velocityY = -this.VELOCITY;
    };
    if (this.cursors.down.isDown || this.SKey.isDown) {
      this.velocityX = 0;
      this.velocityY = this.VELOCITY;
    };
  };
  moveSnake(): void {
    this.player.x += this.velocityX;
    this.player.y += this.velocityY;
  };
}