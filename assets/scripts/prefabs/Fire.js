class Fire extends Phaser.GameObjects.Sprite {
    constructor(data) {
        super(data.scene, data.x, data.y, data.texture);
        this.init(data);
    }
    static generate(scene, source) {
        const data = {
            scene,
            x: source.x + source.width / 2, 
            y: source.y,
            texture: 'fire', 
            velocity: 750
        }
        return new Fire(data);
    }
    reset(source) {
        this.x = source.x + source.width / 2;
        this.y = source.y;
        this.setAlive(true);
    }
    init(data) {
        this.scene.add.existing(this);
        this.velocity = data.velocity;
        this.scene.events.on('update', this.update, this);
    }
    update() {
        if(this.active && (this.x < -this.width || this.x > config.width + this.width)) {
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
    }
    move() {
        this.body.setVelocityX(this.velocity);
    }
}