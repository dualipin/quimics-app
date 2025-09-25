import type { GameScene } from '../scenes/GameScene'
import { World } from './World'

interface Goomba extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
  dead?: boolean
}

export class EntityControl {
  private scene: GameScene

  private get goombasVelocityX() {
    return this.scene.height / 19
  }

  constructor(scene: GameScene) {
    this.scene = scene
  }

  createGoombas() {
    const { worldWidth, height: screenHeight, platformHeight, levelGravity } = this.scene
    const { generateRandomCoordinate } = new World(this.scene)

    for (let i = 0; i < Math.trunc(worldWidth / 960); i++) {
      let x = generateRandomCoordinate(true)
      let goomba: Goomba = this.scene.physics.add
        .sprite(x, screenHeight - platformHeight, 'goomba')
        .setOrigin(0.5, 1)
        .setBounce(1, 0)
        .setScale(screenHeight / 376)
      goomba.anims.play('goomba-walk', true)
      // goomba.smoothed = true
      goomba.depth = 2
      if (Phaser.Math.Between(0, 10) <= 4) {
        goomba.setVelocityX(this.goombasVelocityX)
      } else {
        goomba.setVelocityX(-this.goombasVelocityX)
      }
      goomba.setMaxVelocity(this.goombasVelocityX, levelGravity)
      this.scene.goombasGroup.add(goomba)
      let platformPieces = this.scene.platformGroup.getChildren()
      this.scene.physics.add.collider(goomba, platformPieces)
      let blocks = this.scene.blocksGroup.getChildren()
      this.scene.physics.add.collider(goomba, blocks)
      let misteryBlocks = this.scene.misteryBlocksGroup.getChildren()
      this.scene.physics.add.collider(goomba, misteryBlocks)
      let goombas = this.scene.goombasGroup.getChildren()
      this.scene.physics.add.collider(goomba, goombas)
      this.scene.physics.add.collider(goomba, this.scene.finalFlagMast)
      // this.scene.physics.add.overlap(player, goomba, checkGoombaCollision, null, this)
    }

    // Create collision with fall protections to stop goombas from falling off the map
    this.scene.physics.add.collider(
      this.scene.goombasGroup.getChildren(),
      this.scene.immovableBlocksGroup.getChildren(),
    )
    this.scene.physics.add.collider(
      this.scene.goombasGroup.getChildren(),
      this.scene.fallProtectionGroup.getChildren(),
    )
    this.scene.physics.add.collider(this.scene.goombasGroup.getChildren(), this.scene.finalTrigger)

    setInterval(() => this.clearGoombas(), 250)
  }

  checkGoombaCollision(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, goomba: Goomba) {
    if (goomba.dead) return

    let goombaBeingStomped = player.body.touching.down && goomba.body.touching.up

    if (this.scene.flagRaised) return

    if (this.scene.playerInvulnerable) {
      if (!goombaBeingStomped) {
        return
      }
    }

    if (goombaBeingStomped) {
      goomba.anims.play('goomba-hurt', true)
      goomba.body.enable = false
      this.scene.goombasGroup.remove(goomba)
      this.scene.gameSound.goombaStompSound.play()
      player.setVelocityY(-this.scene.velocityY / 1.5)
      // addToScore.call(this, 100, goomba)
      setTimeout(() => {
        this.scene.tweens.add({
          targets: goomba,
          duration: 300,
          alpha: 0,
        })
      }, 200)
      setTimeout(() => {
        goomba.destroy()
      }, 500)
      return
    }

    // decreasePlayerState.call(this)

    return
  }

  clearGoombas() {
    let goombas = this.scene.goombasGroup.getChildren()

    for (let i = 0; i < goombas.length; i++) {
      if (
        !goombas[i].body?.velocity ||
        goombas[i].body?.velocity!.x == 0 ||
        (goombas[i].body?.velocity!.x &&
          goombas[i].body!.velocity.x > 0 &&
          goombas[i].body!.velocity.x != this.goombasVelocityX) ||
        (goombas[i].body?.velocity!.x &&
          goombas[i].body!.velocity.x < 0 &&
          goombas[i].body!.velocity.x != -this.goombasVelocityX)
      ) {
        this.scene.goombasGroup.remove(goombas[i])
        goombas[i].destroy()
      }
    }
  }
}
