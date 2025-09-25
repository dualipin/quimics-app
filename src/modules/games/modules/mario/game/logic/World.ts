import type { GameScene } from '../scenes/GameScene'
import { AnimationGame } from './Animation'

export class World {
  private scene: GameScene
  private worldWidth: number
  private screenHeight: number

  constructor(scene: GameScene) {
    this.scene = scene
    this.worldWidth = scene.worldWidth

    this.screenHeight = scene.height
  }

  draw() {
    const worldWidth = this.worldWidth
    const screenHeight = this.scene.height
    const player = this.scene.player

    let propsY = this.scene.height - this.scene.platformHeight

    //> Clouds
    for (
      let i = 0;
      i < Phaser.Math.Between(Math.trunc(this.worldWidth / 760), Math.trunc(this.worldWidth / 380));
      i++
    ) {
      let x = this.generateRandomCoordinate(false, false)
      let y = Phaser.Math.Between(this.screenHeight / 80, this.screenHeight / 2.2)
      if (Phaser.Math.Between(0, 10) < 5) {
        this.scene.add
          .image(x, y, 'cloud1')
          .setOrigin(0)
          .setScale(this.screenHeight / 1725)
      } else {
        this.scene.add
          .image(x, y, 'cloud2')
          .setOrigin(0)
          .setScale(this.screenHeight / 1725)
      }
    }

    //> Mountains
    for (let i = 0; i < Phaser.Math.Between(worldWidth / 6400, worldWidth / 3800); i++) {
      let x = this.generateRandomCoordinate()

      if (Phaser.Math.Between(0, 10) < 5) {
        this.scene.add
          .image(x, propsY, 'mountain1')
          .setOrigin(0, 1)
          .setScale(screenHeight / 517)
      } else {
        this.scene.add
          .image(x, propsY, 'mountain2')
          .setOrigin(0, 1)
          .setScale(screenHeight / 517)
      }
    }

    //> Bushes
    for (
      let i = 0;
      i < Phaser.Math.Between(Math.trunc(worldWidth / 960), Math.trunc(worldWidth / 760));
      i++
    ) {
      let x = this.generateRandomCoordinate()

      if (Phaser.Math.Between(0, 10) < 5) {
        this.scene.add
          .image(x, propsY, 'bush1')
          .setOrigin(0, 1)
          .setScale(screenHeight / 609)
      } else {
        this.scene.add
          .image(x, propsY, 'bush2')
          .setOrigin(0, 1)
          .setScale(screenHeight / 609)
      }
    }

    //> Fences
    for (
      let i = 0;
      i < Phaser.Math.Between(Math.trunc(worldWidth / 4000), Math.trunc(worldWidth / 2000));
      i++
    ) {
      let x = this.generateRandomCoordinate()

      this.scene.add
        .tileSprite(x, propsY, Phaser.Math.Between(100, 250), 35, 'fence')
        .setOrigin(0, 1)
        .setScale(screenHeight / 863)
    }

    // > blocks ground
    for (let i = 0; i < worldWidth / this.scene.platformPiecesWidth; i++) {
      const x = this.generateRandomCoordinate(false, true)
      const y = propsY + this.scene.platformHeight / 5

      const block = this.scene.physics.add.staticSprite(x, y, 'block')
      if (this.scene.currenLevel == 1) {
        block.setScale(3.5).refreshBody()
      } else {
        block.setScale(2.5).refreshBody()
      }

      this.scene.platforms.add(block)

      // this.scene.fallProtectionGroup.add(block)
    }

    this.scene.physics.add.collider(this.scene.player, this.scene.platforms)

    // > player start position
    player.setPosition(this.scene.startOffset, propsY - player.height / 1.5)

    // > player start velocity
    player.setVelocityX(this.scene.velocityX)

    // > Final flag
    this.scene.finalFlagMast = this.scene.add
      .tileSprite(worldWidth - worldWidth / 30, propsY, 16, 167, 'flag-mast')
      .setOrigin(0, 1)
      .setScale(screenHeight / 400)

    this.scene.physics.add.existing(this.scene.finalFlagMast)
    // this.scene.finalFlagMast.immovable = true
    // this.scene.finalFlagMast.allowGravity = false
    // this.scene.finalFlagMast.body.setSize(3, 167)
    // this.scene.physics.add.overlap(player, this.scene.finalFlagMast, null, raiseFlag, this.scene)
    this.scene.physics.add.collider(
      this.scene.platformGroup.getChildren(),
      this.scene.finalFlagMast,
    )

    // //> Flag
    // this.finalFlag = this.scene.add
    //   .image(worldWidth - worldWidth / 30, propsY * 0.93, 'final-flag')
    //   .setOrigin(0.5, 1)
    // this.finalFlag.setScale(screenHeight / 400)

    //> Castle
    // Crear castillo con física

    const castle = this.scene.physics.add
      .image(worldWidth - 80, propsY, 'castle') // Usa un valor fijo para probar
      .setOrigin(0.5, 1)
      .setScale(screenHeight / 300)
      .setImmovable(true)

    castle.body.setAllowGravity(false)

    // Detectar llegada al castillo
    this.scene.physics.add.overlap(this.scene.player, castle, () => {
      if (this.scene.playerHasAllElements()) {
        console.log('¡Ganaste!')
        this.scene.showVictory()
      } else {
        console.log('Perdiste...')
        this.scene.showDefeat()
      }

      setTimeout(() => {
        AnimationGame.instance.destroy()
        this.scene.scene.restart()
      }, 3000)
    })
  }

  public generateRandomCoordinate(entitie = false, ground = true): number {
    const worldHolesCoords = this.scene.worldHolesCoords
    const platformPiecesWidth = this.scene.platformPiecesWidth
    const screenWidth = this.scene.width
    const worldWidth = this.scene.worldWidth
    const startPos = entitie ? screenWidth * 1.5 : 0
    const endPos = entitie ? worldWidth - screenWidth * 3 : worldWidth

    let coordinate = Phaser.Math.Between(startPos, endPos)

    if (!ground) return coordinate

    for (let hole of worldHolesCoords) {
      if (coordinate >= hole.start - platformPiecesWidth * 1.5 && coordinate <= hole.end) {
        return this.generateRandomCoordinate(entitie, ground)
      }
    }

    return coordinate
  }
}
