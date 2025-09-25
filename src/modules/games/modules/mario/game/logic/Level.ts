import type { GameScene } from '../scenes/GameScene'
import { Structure } from './Structure'

export class Level {
  private scene: GameScene

  constructor(scene: GameScene) {
    this.scene = scene
  }

  generate() {
    let pieceStart = this.scene.width
    let lastWasHole = 0
    let lastWasStructure = 0
    const screenWidth = this.scene.width
    const screenHeight = this.scene.height
    const platformPiecesWidth = this.scene.platformPiecesWidth
    const worldWidth = this.scene.worldWidth
    const platformHeight = this.scene.platformHeight

    const player = this.scene.player

    const structure = new Structure(this.scene)

    for (let i = 0; i <= this.scene.platformPieces; i++) {
      // Holes will have a 10% chance of spawning
      let number = Phaser.Math.Between(0, 100)

      // Check if its not a hole, this means is not that 20%, is not in the spawn safe area and is not close to the end castle.
      if (
        pieceStart >= worldWidth - platformPiecesWidth * 4 ||
        number <= 0 ||
        pieceStart <= screenWidth * 2 ||
        pieceStart >= worldWidth - screenWidth * 2 ||
        lastWasHole > 0 ||
        lastWasStructure > 0
      ) {
        lastWasHole--

        //> Create platform
        let Npiece = this.scene.add
          .tileSprite(pieceStart, screenHeight, platformPiecesWidth, platformHeight, 'floorbricks')
          .setScale(2)
          .setOrigin(0, 0.5)
        this.scene.physics.add.existing(Npiece)

        // Npiece.body.immovable = true
        // Npiece.body.allowGravity = false
        // Npiece.isPlatform = true

        Npiece.depth = 2
        this.scene.platformGroup.add(Npiece)
        // Apply player collision with platform
        this.scene.physics.add.collider(this.scene.player, Npiece)

        if (
          !(pieceStart >= worldWidth - screenWidth) &&
          pieceStart > screenWidth + platformPiecesWidth * 2 &&
          lastWasHole < 1 &&
          lastWasStructure < 1
        ) {
          lastWasStructure = structure.builder(pieceStart)
        } else {
          lastWasStructure--
        }
      } else {
        // Save every hole start and end for later use
        this.scene.worldHolesCoords.push({
          start: pieceStart,
          end: pieceStart + platformPiecesWidth * 2,
        })

        lastWasHole = 2

        this.scene.fallProtectionGroup.add(
          this.scene.add
            .rectangle(pieceStart + platformPiecesWidth * 2, screenHeight - platformHeight, 5, 5)
            .setOrigin(0, 1),
        )
        this.scene.fallProtectionGroup.add(
          this.scene.add.rectangle(pieceStart, screenHeight - platformHeight, 5, 5).setOrigin(1, 1),
        )
      }
      pieceStart += platformPiecesWidth * 2
    }

    this.scene.startScreenTrigger = this.scene.add
      .tileSprite(screenWidth, screenHeight - platformHeight, 32, 28, 'horizontal-tube')
      .setScale(screenHeight / 345)
      .setOrigin(1, 1)
    this.scene.startScreenTrigger.depth = 4
    this.scene.physics.add.existing(this.scene.startScreenTrigger)
    // this.scene.startScreenTrigger.body.allowGravity = false
    // this.scene.startScreenTrigger.body.immovable = true
    this.scene.physics.add.collider(
      this.scene.player,
      this.scene.startScreenTrigger,
      this.startLevel,
      undefined,
      this,
    )

    let invisibleWall2 = this.scene.add
      .rectangle(screenWidth, screenHeight - platformHeight, 1, screenHeight)
      .setOrigin(0.5, 1)
    this.scene.physics.add.existing(invisibleWall2)
    // invisibleWall2.body.allowGravity = false
    // invisibleWall2.body.immovable = true
    this.scene.physics.add.collider(player, invisibleWall2)
    this.scene.fallProtectionGroup.add(invisibleWall2)

    this.scene.verticalTube = this.scene.add
      .tileSprite(
        worldWidth - screenWidth,
        screenHeight - platformHeight,
        32,
        screenHeight,
        'vertical-extralarge-tube',
      )
      .setScale(screenHeight / 345)
      .setOrigin(1, 1)
    this.scene.verticalTube.depth = 2
    this.scene.physics.add.existing(this.scene.verticalTube)
    // this.scene.verticalTube.body.allowGravity = false
    // this.scene.verticalTube.body.immovable = true
    this.scene.physics.add.collider(player, this.scene.verticalTube)

    this.scene.finalTrigger = this.scene.add
      .tileSprite(
        worldWidth - screenWidth * 1.03,
        screenHeight - platformHeight,
        40,
        31,
        'horizontal-final-tube',
      )
      .setScale(screenHeight / 345)
      .setOrigin(1, 1)
    this.scene.finalTrigger.depth = 2
    this.scene.physics.add.existing(this.finalTrigger)
    // this.scene.finalTrigger.body.allowGravity = false
    // this.scene.finalTrigger.body.immovable = true
    this.scene.physics.add.collider(player, this.finalTrigger, teleportToLevelEnd, null, this)

    let invisibleWall1 = this.scene.add
      .rectangle(worldWidth - screenWidth, screenHeight - platformHeight, 1, screenHeight)
      .setOrigin(0.5, 1)
    this.scene.physics.add.existing(invisibleWall1)
    // invisibleWall1.body.allowGravity = false
    // invisibleWall1.body.immovable = true
    this.scene.physics.add.collider(player, invisibleWall1)
    this.scene.fallProtectionGroup.add(invisibleWall1)

    let fallProtections = this.scene.fallProtectionGroup.getChildren()
    for (let i = 0; i < fallProtections.length; i++) {
      this.scene.physics.add.existing(fallProtections[i])
      // fallProtections[i].body.allowGravity = false
      // fallProtections[i].body.immovable = true
    }

    // Stablish properties for every generated structure
    let misteryBlocks = this.scene.misteryBlocksGroup.getChildren()
    for (let i = 0; i < misteryBlocks.length; i++) {
      this.scene.physics.add.existing(misteryBlocks[i])
      // misteryBlocks[i].body.allowGravity = false
      // misteryBlocks[i].body.immovable = true
      // misteryBlocks[i].depth = 2
      // misteryBlocks[i].anims.play('mistery-block-default', true)
      this.scene.physics.add.collider(
        player,
        misteryBlocks[i],
        revealHiddenBlock,
        undefined,
        this.scene,
      )
    }

    // Apply player collision with blocks
    let blocks = this.scene.blocksGroup.getChildren()
    for (let i = 0; i < blocks.length; i++) {
      this.physics.add.existing(blocks[i])
      blocks[i].body.allowGravity = false
      blocks[i].body.immovable = true
      blocks[i].depth = 2
      this.physics.add.collider(player, blocks[i], destroyBlock, null, this)
    }

    // Apply player collision with immovable blocks
    let constructionBlocks = this.constructionBlocksGroup.getChildren()
    for (let i = 0; i < constructionBlocks.length; i++) {
      this.physics.add.existing(constructionBlocks[i])
      constructionBlocks[i].isImmovable = true
      constructionBlocks[i].body.allowGravity = false
      constructionBlocks[i].body.immovable = true
      constructionBlocks[i].depth = 2
      this.physics.add.collider(player, constructionBlocks[i], destroyBlock, null, this)
    }

    // Apply player collision with immovable blocks
    let immovableBlocks = this.scene.immovableBlocksGroup.getChildren()
    for (let i = 0; i < immovableBlocks.length; i++) {
      this.scene.physics.add.existing(immovableBlocks[i])
      // immovableBlocks[i].body.allowGravity = false
      // immovableBlocks[i].body.immovable = true
      // immovableBlocks[i].depth = 2
      this.scene.physics.add.collider(player, immovableBlocks[i])
    }

    let groundCoins = this.scene.groundCoinsGroup.getChildren()
    for (let i = 0; i < groundCoins.length; i++) {
      this.scene.physics.add.existing(groundCoins[i])
      groundCoins[i].anims.play('ground-coin-default', true)
      // groundCoins[i].body.allowGravity = false
      // groundCoins[i].body.immovable = true
      // groundCoins[i].depth = 2
      this.scene.physics.add.overlap(this.scene.player, groundCoins[i], undefined, undefined, this)
    }
  }

  startLevel(
    player:
      | Phaser.Physics.Arcade.Body
      | Phaser.Physics.Arcade.StaticBody
      | Phaser.Tilemaps.Tile
      | Phaser.Types.Physics.Arcade.GameObjectWithBody,
    trigger:
      | Phaser.Physics.Arcade.Body
      | Phaser.Physics.Arcade.StaticBody
      | Phaser.Tilemaps.Tile
      | Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ) {
    const screenWidth = this.scene.width
    const screenHeight = this.scene.height
    const worldWidth = this.scene.worldWidth
    // const propsY = screenHeight - screenHeight / 6
    //
    if (!player.body.blocked.right && !trigger.body.blocked.left) return

    this.scene.gameSound.powerDownSound.play()

    this.scene.physics.world.setBounds(screenWidth, 0, worldWidth, screenHeight)

    // applyPlayerInvulnerability.call(this, 4000)

    this.scene.playerBlocked = true

    player.setVelocityX(5)
    player.anims.play('run', true)
    player.flipX = false

    this.scene.cameras.main.fadeOut(900, 0, 0, 0)

    this.scene.gameSound.hereWeGoSound.play()

    setTimeout(() => {
      player.y = screenHeight / 5
      this.scene.gameSound.musicTheme.stop()
      this.scene.gameSound.undergroundMusicTheme.play({ loop: true })

      player.x = screenWidth * 1.1
      this.scene.cameras.main.pan(screenWidth * 1.5, 0, 0)
      this.scene.playerBlocked = false
      this.scene.cameras.main.fadeIn(500, 0, 0, 0)
      // createHUD.call(this)
      // updateTimer.call(this)
      this.scene.startScreenTrigger.destroy()
      this.scene.levelStarted = true
      // if (this.settingsMenuOpen) hideSettings.call(this)
    }, 1100)
  }
}
