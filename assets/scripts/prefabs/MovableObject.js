class MovableObject extends Phaser.GameObjects.Sprite {
    constructor(data) {
        super(data.scene, data.x, data.y, data.texture, data.frame);
        this.init(data);
    }
    init(data) {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.velocity = data.velocity;
        this.scene.events.on('update', this.update, this);
    }
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.setAlive(true);
    }
    isDead() {
        return false;
    }
    update() {
        if(this.active && this.isDead()) {
            this.setAlive(false);
        }   
    }
    setAlive(status) {
        // activate OR deactivate physical body
        this.body.enable = status;
        // hide OR show texture
        this.setVisible(status);
        // deactivate OR activate object
        this.setActive(status);

        if (this.timer) {
            if(!status) {
                this.timer.paused = true;
            } else {
                this.timer.paused = false;
            }
        }

        if (!status) {
            this.emit('killed');
        }

    }
    move() {
        this.body.setVelocityX(this.velocity);
    }
}