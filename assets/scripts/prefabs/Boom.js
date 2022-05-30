class Boom extends Phaser.GameObjects.Sprite {
    static generate(scene, x, y) {
        return new Boom({scene, x, y});
    }
    constructor(data) {
        super(data.scene, data.x, data.y, 'boom', 'boom1');
        this.scene.add.existing(this);

        // Generate frameset
        const frames = this.scene.anims.generateFrameNames('boom', {
            prefix: 'boom',
            start: 1,
            end: 4
        });

        // Create a new animation based on the received frame
        this.scene.anims.create({
            key: 'boom',
            frames,
            frameRate: 10,
            repeat: 0,
        });

        // Start animation
        this.play('boom');

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        });
    }
}