import { SnakeScene } from '../scenes/snake-scene';
import { saveHighScore, loadHighScore } from './save';

export class Scores extends Phaser.GameObjects.Container {
    snakeScene: SnakeScene;
    score = 0;
    scoreText;
    highscoreText: Phaser.GameObjects.Text;
    Localhighscore: number;

    constructor(snakeScene: SnakeScene) {
        super(snakeScene);
        this.snakeScene = snakeScene;
    }

    public ShowScore() {
        this.scoreText = this.snakeScene.add.text(16, 514, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });
    };
    public addPoint() {
        this.score++;
        this.snakeScene.Nhashtags--;
        this.scoreText.setText('Score: ' + this.score)
    };
    public removePoint() {
      this.score--;
      this.scoreText.setText('Score: ' + this.score)
    }
    public addPointDev() {
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score)
    };
    public removePointDev() {
      this.score -= 10;
      this.scoreText.setText('Score: ' + this.score)
    }
    private scoreIsBetween(Number1: number, Number2: number): boolean {
      if (this.score >= Number1 && this.score < Number2)
        return true
      else {
        return false
      }
    }

    RestartMovement() {
      if (this.snakeScene.timerEvent.delay !== this.snakeScene.Speed) {
        this.snakeScene.Movement()
      }
      else if (this.snakeScene.Speed === 500) {
        this.snakeScene.Movement()
      }
    }
    Highscore() {
      this.Localhighscore = loadHighScore()
      if (this.Localhighscore < this.score) {
        this.Localhighscore = this.score
        saveHighScore(this.Localhighscore);
      }
      this.highscoreText = this.snakeScene.add.text(80, 100, 'High Score: ' + this.Localhighscore, { fontSize: '40px', fill: '#FFFFFF' });
    }

    public BonusScore() {
      if (this.score < 0 && this.snakeScene.valid === 0) {
        this.Highscore()
        this.snakeScene.gameOver.show();
      }
      if (this.score === 0) {
        this.snakeScene.chess.setVisible(true);
        this.snakeScene.chess.setTint();
        this.snakeScene.player.setTint();
      }
      if (this.scoreIsBetween(1, 5)) {
        this.snakeScene.chess.setVisible(true);
        this.snakeScene.chess.setTint();
        this.snakeScene.player.setTint();
        this.snakeScene.Speed = 250;
        this.RestartMovement()
      };
      if (this.scoreIsBetween(5, 15)) {
        this.snakeScene.chess.setVisible(false);
        this.snakeScene.Speed = 200;
        this.RestartMovement()
      };
      if (this.scoreIsBetween(15, 25)) {
        this.snakeScene.chess.setVisible(true);
        this.snakeScene.Speed = 175;
        this.RestartMovement()
      };
      if (this.scoreIsBetween(25, 50)) {
        this.snakeScene.chess.setTint();
        this.snakeScene.player.setTint();
        this.snakeScene.Speed = 150;
        this.RestartMovement()
      };
      if (this.scoreIsBetween(50, 100)) {
        this.snakeScene.chess.setTint(0x252525)
        this.snakeScene.player.setTint(0x666666)
        this.snakeScene.Speed = 125;
        this.RestartMovement()
      };
      if (this.scoreIsBetween(100, 102)) {
        this.snakeScene.chess.setTint(this.snakeScene.color.random(50).color)
        this.snakeScene.player.setTint(this.snakeScene.color.random(50).color)
        this.snakeScene.Speed = 30;
        this.RestartMovement()
      };
      if (this.scoreIsBetween(102, 200)) {
        this.snakeScene.chess.setTint();
        this.snakeScene.player.setTint();
        this.snakeScene.Speed = 60;
        this.RestartMovement()
      };
      if (this.scoreIsBetween(200, 500)) {
        this.snakeScene.chess.setTint(0xFF91FC)
        this.snakeScene.player.setTint(0xFF00F8)
        this.snakeScene.Speed = 30;
        this.RestartMovement()
      };
      if (this.score >= 500) {
        this.snakeScene.chess.setTint();
        this.snakeScene.player.setTint();
        this.snakeScene.Speed = 0;
        this.RestartMovement()
      };
    };
}

