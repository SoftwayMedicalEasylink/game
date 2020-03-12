import { SnakeScene } from '../scenes/snake-scene';

export class GameOver extends Phaser.GameObjects.Container {
    snakeScene: SnakeScene;
    SpaceKey: Phaser.Input.Keyboard.Key;
    restartText: Phaser.GameObjects.Text;
    DeadSnake;
    visible = false;

    constructor(snakeScene: SnakeScene) {
        super(snakeScene);
        this.snakeScene = snakeScene;
    }

    public preload() {
        this.snakeScene.load.image('DeadSnake', "./assets/images/DeadSnake.png");
        this.SpaceKey = this.snakeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    public isShown(): boolean {
        return this.visible;
    }

    public show() {
        this.visible = true;
        this.snakeScene.add.text(0, 150, 'GAME OVER', { fontSize: '94px', fill: '#870000' });
        this.restartText = this.snakeScene.add.text(30, 230, 'Press ' + this.blink() + ' to restart', { fontSize: '34px', fill: '#870000', });
        this.DeadSnake = this.snakeScene.add.image(321, 321, 'DeadSnake');
        this.DeadSnake.scale = 0.25;
        /* (this.snakeScene.Scores.highScore < this.snakeScene.Scores.score) {
            this.snakeScene.Scores.highScore = this.snakeScene.Scores.score                             //Pas encore prêt
        }
        this.snakeScene.add.text(65, 100, 'HighScore of your party: ' + this.snakeScene.Scores.highScore, { fontSize: '24px', fill: '#870000' });      */
    }

    public update() {
        if (this.SpaceKey.isDown) {
            this.restartScene();
        }
        this.restartText.setText('Press ' + this.blink() + ' to restart');
    }

    private restartScene() {
        this.snakeScene.scene.manager.stop('SnakeScene');
        this.snakeScene.scene.manager.start('RestartScene');
    }

    private blink(): string {
        if (this.snakeScene.time.now % 1000 < 500) {
            return "SPACE";
        }
        else {
            return "     ";
        }
    }

}
