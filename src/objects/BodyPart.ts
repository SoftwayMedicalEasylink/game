import { SnakeScene } from '../scenes/snake-scene';
import { GameObjects } from 'phaser';

export class BodyPart extends Phaser.GameObjects.Sprite {
    snakeScene: SnakeScene;
    target: { x: number; y: number, body: Phaser.Physics.Arcade.Body };
    lastTargetPosition: { x: number; y: number };
    BodyPartGroup: Phaser.Physics.Arcade.Group;
    Body: Phaser.Physics.Arcade.Sprite;
    tailPart: BodyPart;


    constructor(snakeScene, target: Phaser.GameObjects.Sprite) {
        super(snakeScene, target.x, target.y, 'cube', undefined);
        this.snakeScene = snakeScene;
        this.target = target;
        this.lastTargetPosition = { x: this.target.x, y: this.target.y };

        this.BodyPartGroup = this.snakeScene.physics.add.group();
        this.Body = this.snakeScene.physics.add.sprite(this.target.x, this.target.y, 'cube').setOrigin(0);
        this.Body.scale = 0.25;
        this.BodyPartGroup.add(this.Body);
    }

    public DiffPosition() {
        const isTargetEnabled = this.target.body.enable;

        if (isTargetEnabled && (this.target.x !== this.lastTargetPosition.x || this.target.y !== this.lastTargetPosition.y)) {
            this.Body.setPosition(this.lastTargetPosition.x, this.lastTargetPosition.y)
            this.lastTargetPosition.x = this.target.x
            this.lastTargetPosition.y = this.target.y
        }
        if (this.tailPart) {
            this.tailPart.DiffPosition()
        }
        if (!isTargetEnabled) {
            this.Body.disableBody();
            this.Body.setVisible(false);
        }
    }
    public addBody() {
        if (!this.tailPart) {
            this.tailPart = new BodyPart(this.snakeScene, this.Body);
        } else {
            this.tailPart.addBody();
        }
    }
}
