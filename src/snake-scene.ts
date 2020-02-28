export class SnakeScene extends Phaser.Scene {
  logo: Phaser.GameObjects.Sprite;
  endKey: Phaser.Input.Keyboard.Key;
  SpaceKey: Phaser.Input.Keyboard.Key;
  player: Phaser.Physics.Arcade.Sprite;
  cursors;
  gameOver;
  color = new Phaser.Display.Color();
  score = 0;
  scoreText;
  velocityX = 0;
  velocityY = 0;
  side;
  VELOCITY = 32;
  DeadSnake;
  tile = 32;
  Speed = 500;
  SPACE = 'SPACE';
  chess: Phaser.GameObjects.Image;
  timerEvent: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'SnakeScene' });
  }

  preload(): void {
    this.load.image('chess', "./assets/images/chess.png");
    this.load.image('ground', "./assets/images/ground.png");
    this.load.image('cube', "./assets/images/cube.png");
    this.load.image('capsule', "./assets/images/capsule.png");
    this.load.image('side', "./assets/images/side.png");
    this.load.image('DeadSnake', "./assets/images/DeadSnake.png");
    this.endKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END);
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  create(): void {
    console.log("create snake")
    this.chess = this.add.image(0, 0, 'chess').setOrigin(0);
    var Walls = this.physics.add.staticGroup();
    var groundUp = this.add.image(this.tile * 0, this.tile * -1, 'ground').setOrigin(0);
    var groundDown = this.add.image(this.tile * 0, this.tile * 16, 'ground').setOrigin(0);
    var sideLeft = this.add.image(this.tile * -1, this.tile * 0, 'side').setOrigin(0);
    var sideRight = this.add.image(this.tile * 16, this.tile * 0, 'side').setOrigin(0);
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
    this.scoreText = this.add.text(16, 514, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.timerEvent = this.time.addEvent({
      delay: this.Speed,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });
    /*this.time.addEvent({
      delay: 200,
      loop: true,
      callback: this.restart,         //Blink text: SPACE 
      callbackScope: this
    });*/
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const capsules = [];
    for (let i = 0; i < 16; i++) {
      var prc = getRandomInt(2);
      if (prc === 1) {
        const capsule = this.physics.add.sprite(this.tile * i, this.tile * 1, 'capsule').setOrigin(0);
        capsule.scale = 0.25;
        capsules.push(capsule);
        this.physics.add.overlap(this.player, capsule, this.collectCapsule());
      }
    }
    //this.player.setCollideWorldBounds(true);

  };

  collectCapsule(): ArcadePhysicsCallback {
    return (player: Phaser.Physics.Arcade.Sprite, capsule: Phaser.Physics.Arcade.Sprite) => {
      capsule.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score)
      //if (this.capusle.countActive(true) === 0) {     }
    }
  }

  collides(player: any, ground: any): ArcadePhysicsCallback {
    return (player, ground) => {
      this.gameOver = true
    }
  }

  update() {
    if (this.SpaceKey.isDown) {
      this.player.x += this.tile;
      this.player.y += this.tile * 8;
      //this.scene.start('RestartScene');
    };
    if (this.gameOver) {
      this.player.disableBody(true, true);
      this.player.x = this.tile;
      this.player.y = this.tile * 8;
      this.chess.setTint(0xFFB5B5)
      this.add.text(0, 150, 'GAME OVER', { fontSize: '94px', fill: '#870000' });
      this.add.text(30, 230, 'Press ' + 'SPACE' + ' to restart', { fontSize: '34px', fill: '#870000', });
      this.DeadSnake = this.add.image(321, 321, 'DeadSnake');
      this.DeadSnake.scale = 0.25;
      return;
    }
    if (this.score === 30) {
      this.chess.setVisible(false);
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
    if (this.score === 50) {
      this.chess.setVisible(true);
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
    if (this.score > 99) {
      this.chess.setVisible(true);
      this.chess.setTint(this.color.random(50).color)
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
  /*restart(): void {
    var blink = document.getElementById('blink');
      setInterval(function() {
         var blinkStyleOpacity = (blinkStyleOpacity == 0 ? 1 : 0);              //Blink text: SPACE 
      }, 1000); 
  };*/
}