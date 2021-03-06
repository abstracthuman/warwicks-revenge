ig.module(
  'game.entities.enemy-a'
)
.requires(
  'impact.entity',
  'game.entities.particle'
)
.defines(function () {
  EntityEnemyA = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/sprites/enemy-a.png', 32, 32),
    killSound: new ig.Sound('media/sounds/death.mp3'),

    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.ACTIVE,

    flip: false,
    health: 50,
    maxVel: {
      x: 100,
      y: 100
    },
    offset: {
      x: 4,
      y: 4
    },
    size: {
      x: 32,
      y: 32
    },
    speed: 115,

    init: function (x, y, settings) {
      this.parent(x, y, settings);

      this.addAnim('idle', 0.15, [0, 1, 0, 1, 1, 1, 1, 1, 0, 0]).gotoRandomFrame();

      this.killSound.volume = 0.75;
      this.move = Math.random(Math.random() * 1 + 0.5);
    },

    kill: function () {
      this.parent();
      this.killSound.play();
      ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {
        colorOffset: 1,
        particles: 25,
        totalColors: 7
      });
    },

    update: function () {
      var player = ig.game.getEntitiesByType(EntityPlayer)[0];
      var distanceToPlayer = player ? this.distanceTo(player) : 0;

      if (player && (distanceToPlayer < ig.game.attackDistance)) {
          if (player.pos.x < this.pos.x) {
            this.flip = false;
            this.vel.x = this.move * -this.speed;
          } else if (player.pos.x > this.pos.x) {
            this.flip = true;
            this.vel.x = this.move * this.speed;
          }

          if (player.pos.y < this.pos.y) {
            this.vel.y = this.move * -this.speed;
          } else if (player.pos.y > this.pos.y) {
            this.vel.y = this.move * this.speed;
          }
      }

      this.currentAnim.flip.x = this.flip;
      this.parent();
    }
  });
});
