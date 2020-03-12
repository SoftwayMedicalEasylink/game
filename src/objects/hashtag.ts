import { SnakeScene } from '../scenes/snake-scene';

export class Hashtags extends Phaser.GameObjects.Text {
    constructor(snakeScene: SnakeScene, x: number, y: number, letter: string, color: string) {
        super(snakeScene, x, y, letter, { fontSize: '34px', color: color });

        this.setOrigin(0.5);

        snakeScene.physics.world.enable(this);
        snakeScene.children.add(this);
    }

    get arcadeBody(): Phaser.Physics.Arcade.Body {
        return this.body;
    }
}