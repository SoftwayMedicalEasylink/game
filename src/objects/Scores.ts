import { SnakeScene } from '../scenes/snake-scene';

export class Scores extends Phaser.GameObjects.Container {
    snakeScene: SnakeScene;
    score = 0;
    scoreText;

    constructor(snakeScene: SnakeScene) {
        super(snakeScene);
        this.snakeScene = snakeScene;
    }

    public ShowScore() {
        this.scoreText = this.snakeScene.add.text(16, 514, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });
    };
    public addPoint() {
        this.score++;
        this.snakeScene.Ncapsule--;
        this.scoreText.setText('Score: ' + this.score)
    };
    public BonusScore() {
        if (this.score === 1) {
            this.snakeScene.Speed = 250;
            if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
              this.snakeScene.timerEvent = this.snakeScene.timerEvent.reset({
                delay: this.snakeScene.Speed,
                loop: true,
                callback: this.snakeScene.moveSnake,
                callbackScope: this.snakeScene
              });
            }
          };
          if (this.score === 5) {
            this.snakeScene.chess.setVisible(false);
            this.snakeScene.Speed = 175;
            if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
              this.snakeScene.timerEvent = this.snakeScene.timerEvent.reset({
                delay: this.snakeScene.Speed,
                loop: true,
                callback: this.snakeScene.moveSnake,
                callbackScope: this.snakeScene
              });
            }
          };
          if (this.score === 15) {
            this.snakeScene.chess.setVisible(true);
            this.snakeScene.Speed = 100;
            if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
              this.snakeScene.timerEvent = this.snakeScene.timerEvent.reset({
                delay: this.snakeScene.Speed,
                loop: true,
                callback: this.snakeScene.moveSnake,
                callbackScope: this.snakeScene
              });
            }
          };
          if (this.score === 25) {
            this.snakeScene.Speed = 125;
            if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
              this.snakeScene.timerEvent = this.snakeScene.timerEvent.reset({
                delay: this.snakeScene.Speed,
                loop: true,
                callback: this.snakeScene.moveSnake,
                callbackScope: this.snakeScene
              });
            }
          };
          if (this.score >= 50 && this.score < 100) {
            this.snakeScene.chess.setTint(0x252525)
            this.snakeScene.player.setTint(0x666666)
            this.snakeScene.Speed = 125;
            if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
              this.snakeScene.timerEvent = this.snakeScene.timerEvent.reset({
                delay: this.snakeScene.Speed,
                loop: true,
                callback: this.snakeScene.moveSnake,
                callbackScope: this.snakeScene
              });
            }
          };
          if (this.score >= 100 && this.score < 102) {
            this.snakeScene.chess.setTint(this.snakeScene.color.random(50).color)
            this.snakeScene.player.setTint(this.snakeScene.color.random(50).color)
            this.snakeScene.Speed = 30;
            if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
              this.snakeScene.timerEvent = this.snakeScene.timerEvent.reset({
                delay: this.snakeScene.Speed,
                loop: true,
                callback: this.snakeScene.moveSnake,
                callbackScope: this.snakeScene
              });
            }
          };
          if (this.score === 102) {
            this.snakeScene.chess.setTint();
            this.snakeScene.player.setTint();
            this.snakeScene.Speed = 60;
            if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
              this.snakeScene.timerEvent = this.snakeScene.timerEvent.reset({
                delay: this.snakeScene.Speed,
                loop: true,
                callback: this.snakeScene.moveSnake,
                callbackScope: this.snakeScene
              });
            }
          };
    };
}

