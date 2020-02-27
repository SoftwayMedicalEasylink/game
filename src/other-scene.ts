export class OtherScene extends Phaser.Scene {
  snake: Phaser.GameObjects.Sprite;
  escKey: any;
  UPKey: any;
  LEFTKey: any;
  DOWNKey: any;
  RIGHTKey: any;
  SpaceKey: any;
  
  constructor() {
    super('OtherScene');
  }
  
  preload(): void {
    this.load.image("myImage2", "./assets/images/softway.png");
    this.load.image("s", "./assets/images/s.png");
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC );
    this.UPKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP );
    this.LEFTKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT );
    this.DOWNKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN );
    this.RIGHTKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT );
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE );
  };
  create(): void {
    const logo = this.add.sprite(250, 300, "myImage2");
    logo.scale = 0.5;
    this.snake = this.add.sprite(104, 266, "s");
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
    if (this.escKey.isDown)  {
      this.scene.start('MainScene');
    };
    if (this.UPKey.isDown || this.LEFTKey.isDown || this.DOWNKey.isDown || this.RIGHTKey.isDown) {
      this.scene.start('GameSnake');
    };
  };
  moveSnake(): void {
    this.snake.x += 0;

  };
};
