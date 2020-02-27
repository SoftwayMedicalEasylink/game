export class OtherScene extends Phaser.Scene {
  snake: Phaser.GameObjects.Sprite;
  escKey: any;
  ZKey: any;
  QKey: any;
  SKey: any;
  DKey: any;
  SpaceKey: any;
  
  constructor() {
    super('OtherScene');
  }
  
  preload(): void {
    this.load.image("myImage2", "./assets/images/softway.png");
    this.load.image("s", "./assets/images/s.png");
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC );
    this.ZKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z );
    this.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q );
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S );
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D );
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE );
  };
  create(): void {
    const logo = this.add.sprite(400, 300, "myImage2");
    logo.scale = 0.5;
    this.snake = this.add.sprite(254, 266, "s");
    this.snake.scale = 0.12;
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.moveSnake,
      callbackScope: this
    });


    const Food = ({

      Extends: Phaser.GameObjects.Image,

      initialize:

      function Food (scene, x, y)
      {
          Phaser.GameObjects.Image.call(this, scene)

          this.setTexture('food');
          this.setPosition(x * 16, y * 16);
          this.setOrigin(0);

          this.total = 0;

          scene.children.add(this);
      },

      eat: function ()
      {
          this.total++;
      }

  });
  };

  update(): void {
    /*this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonReleased()) {
        this.scene.start('MainScene');
      }
    })*/
    if (this.escKey.isDown)  {
      this.scene.start('MainScene');
    if (this.SpaceKey.isDown) {
      this.scene.start('GameSnake');
    }
    };
    /*else if (this.ZKey.isUp) {
      this.moveSnake(); {
        this.snake.y -= 1
      };
    };
    else if (this.QKey.isUp) {
      this.moveSnake(); {
        this.snake.x -= 1
      };
    };
    else if (this.SKey.isUp) {
      this.moveSnake(); {
        this.snake.y += 1
      };
    };
    else if (this.DKey.isUp) {
      this.moveSnake(); {
        this.snake.x += 1
      };
    };
    else {
      this.snake.y -= 0
    }*/
    if (this.ZKey.isDown && this.QKey.isDown && this.SKey.isDown && this.DKey.isDown) {
    }
  };
  moveSnake(): void {
    this.snake.x += 0;

  };
};
