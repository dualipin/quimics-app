import Phaser from 'phaser'
import type { CharacterKey } from '../../types/Character'
import type { WorldHolesCoord } from '../../types/WorldHolesCoord'
import { Sound } from '../logic/Sound'
import { World } from '../logic/World'
import { AnimationGame } from '../logic/Animation'
import { Player } from '../logic/Player'
import { FirstLevel } from '../levels/First'
import { SecondLevel } from '../levels/Second'
import { HUD } from '../logic/HUD'
import { compuestos } from '../../../snake/data/compounds'

export class GameScene extends Phaser.Scene {
  private _player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private _character!: CharacterKey
  private _sound!: Sound
  public timeLeft = 300
  public score = 0
  public finalFlagMast!: Phaser.GameObjects.TileSprite
  public finalTrigger!: Phaser.GameObjects.TileSprite
  public startScreenTrigger!: Phaser.GameObjects.TileSprite
  public verticalTube!: Phaser.GameObjects.TileSprite
  public platforms!: Phaser.Physics.Arcade.StaticGroup
  public flagRaised = false
  public playerInvulnerable = false
  public playerBlocked = false
  public levelStarted = false
  public currenLevel = 1
  public elements!: Phaser.GameObjects.Group
  public currentCollectedElements: string[] = []
  public compound!: { nombre: string; formula: string; elementos: string[] }
  public castle!: Phaser.GameObjects.GameObject
  // public startLevel = false

  constructor(character: CharacterKey) {
    super('GameScene')
    this._character = character
  }

  //#region Getters
  get cursors() {
    return this.input.keyboard!.createCursorKeys()
  }

  get chemicalElementsGroup() {
    return this.add.group()
  }

  get velocityX() {
    return this.width / 4.5
  }

  get velocityY() {
    return this.height / 1.15
  }

  get misteryBlocksGroup() {
    return this.add.group()
  }

  get gameSound() {
    return this._sound
  }

  get levelGravity() {
    return this.physics.world.gravity.y
  }

  get goombasGroup() {
    return this.add.group()
  }

  get player() {
    return this._player
  }

  get startOffset() {
    return this.width / 2.5
  }

  get worldHolesCoords() {
    return [] as WorldHolesCoord[]
  }

  get platformPiecesWidth() {
    return (this.worldWidth - this.width) / this.platformPieces
  }

  get worldWidth() {
    return this.width * 3.5
  }

  get platformPieces() {
    return 100
  }

  get platformGroup() {
    return this.add.group()
  }

  get fallProtectionGroup() {
    return this.add.group()
  }

  get blocksGroup() {
    return this.add.group()
  }

  get constructionBlocksGroup() {
    return this.add.group()
  }

  get mysteryBlocksGroup() {
    return this.add.group()
  }

  get immovableBlocksGroup() {
    return this.add.group()
  }

  get groundCoinsGroup() {
    return this.add.group()
  }

  get platformHeight() {
    return this.height / 5
  }

  get height() {
    return this.game.canvas.height
  }

  get width() {
    return this.game.canvas.width
  }

  get musicGroup(): Phaser.GameObjects.Group {
    return this.add.group()
  }
  get effectsGroup(): Phaser.GameObjects.Group {
    return this.add.group()
  }
  get character() {
    return this._character
  }

  //#endregion

  //#region Setters
  set player(value: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this._player = value
  }
  //#endregion

  setCharacter(c: CharacterKey) {
    this._character = c
    this.player?.setTexture(c)

    const animations = AnimationGame.instance

    animations.destroy()
    animations.create(this)
    HUD.instance.update()
  }

  setDifficulty(d: number) {
    if (d < 1 || d > 2) return
    this.currenLevel = d
    console.log('Difficulty set to:', d)
    // Restart the scene to apply the new difficulty
    AnimationGame.instance.destroy()
    this.scene.restart()
  }

  create() {
    // play background music

    this.currentCollectedElements = []
    this.collectedElements = []
    this.compound = compuestos[Math.floor(Math.random() * compuestos.length)]

    this.elements = this.physics.add.group()

    this.physics.world.setBounds(0, 0, this.worldWidth, this.height)
    this.cameras.main.setBounds(0, 0, this.worldWidth, this.height)

    this.platforms = this.physics.add.staticGroup()

    const player = new Player(this)

    this.player = player.create()
    this.player.setGravityY(this.currenLevel === 1 ? -30 : 50)
    this.player.setScale(this.currenLevel === 1 ? this.height / 700 : this.height / 1000)
    this.player.body.allowGravity = true
    this.player.setCollideWorldBounds(true)
    this.player.body.onWorldBounds = true

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
      if (body.gameObject === this.player && body.blocked.down) {
        this._sound.kickSound.play();
        this.killPlayer();
      }
    })

    this._sound = new Sound(this)

    new World(this).draw()
    AnimationGame.instance.create(this)
    HUD.instance.create(this)

    if (this.currenLevel === 1) {
      const level = new FirstLevel(this)
      level.create()
      level.addElements(this.compound)
    } else {
      const level = new SecondLevel(this)
      level.create()
      level.addElements(this.compound)
    }

    this.sound.get('music')?.play({ loop: true })

    this.physics.add.collider(this.elements, this.platforms)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.flipX = true
      this.player.setVelocityX(-250)
      this.player.anims.play('run', true)
    } else if (this.cursors.right.isDown) {
      this.player.flipX = false
      this.player.setVelocityX(250)
      this.player.anims.play('run', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('idle', true) // Play idle animation if not moving
    }
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-450)
    }

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
  }

  private killPlayer() {
    // Desactivar colisiones para evitar que siga interactuando
    this.player.disableBody()

    // Pequeña animación de "muerte"
    this.tweens.add({
      targets: this.player,
      alpha: 0,
      y: this.player.y - 50,
      angle: 180,
      duration: 800,
      ease: 'Power2',
      onComplete: () => {
        // Reiniciar escena
        AnimationGame.instance.destroy()
        this.scene.restart()
      },
    })
  }

  private collectedElements: string[] = []

  collectElement(_player: Phaser.GameObjects.GameObject, element: Phaser.GameObjects.GameObject) {
    const elementName = element.getData('element') as string
    if (elementName) {
      this.collectedElements.push(elementName)
    }

    // Play sound for collecting element
    this._sound.coinSound.play();

    console.log('Element collected:', elementName)

    element.destroy()

    this.currentCollectedElements = this.collectedElements
    this.checkCompound()
    HUD.instance.update()
  }

  checkCompound() {
    const compound = this.collectedElements.sort().join('-')
    if (compound === 'hydrogen-hydrogen-oxygen') {
      console.log('¡Formaste agua!')
      this.score += 50
      this.collectedElements = []
    }
  }

  public playerHasAllElements(): boolean {
    const requiredElements = this.compound.elementos // elementos que debe tener
    return requiredElements.every((el) => this.collectedElements.includes(el))
  }

  public showVictory() {
    this._sound.winSound.play();
    this.scene.pause();

    // Create a dark overlay
    const overlay = this.add
      .rectangle(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000000,
        0.7,
      )
      .setScrollFactor(0)

    // Victory container
    const container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY)
    container.setScrollFactor(0)

    // Background panel
    const panel = this.add.rectangle(0, 0, 600, 400, 0x2c3e50, 0.9)
    panel.setStrokeStyle(0xf39c12, 4)

    // Victory text
    const victoryText = this.add
      .text(0, -80, '¡VICTORIA!', {
        fontSize: '64px',
        color: '#f1c40f',
        fontFamily: 'Arial Black',
        stroke: '#2c3e50',
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    // Compound info
    const compoundText = this.add
      .text(0, -20, `Compuesto formado: ${this.compound.nombre}`, {
        fontSize: '24px',
        color: '#ecf0f1',
        fontFamily: 'Arial',
      })
      .setOrigin(0.5)

    const formulaText = this.add
      .text(0, 10, `Fórmula: ${this.compound.formula}`, {
        fontSize: '20px',
        color: '#bdc3c7',
        fontFamily: 'Arial',
      })
      .setOrigin(0.5)

    // Score
    const scoreText = this.add
      .text(0, 60, `Puntuación: ${this.score}`, {
        fontSize: '32px',
        color: '#27ae60',
        fontFamily: 'Arial Bold',
      })
      .setOrigin(0.5)

    // Continue button
    const button = this.add.rectangle(0, 120, 200, 50, 0x27ae60)
    button.setStrokeStyle(0x2ecc71, 2)
    const buttonText = this.add
      .text(0, 120, 'Continuar', {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Arial Bold',
      })
      .setOrigin(0.5)

    // Add all elements to container
    container.add([panel, victoryText, compoundText, formulaText, scoreText, button, buttonText])

    // Animations
    container.setAlpha(0)
    this.tweens.add({
      targets: container,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
    })

    this.tweens.add({
      targets: victoryText,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Button interaction
    button.setInteractive()
    button.on('pointerdown', () => {
      this.scene.resume()
      container.destroy()
      overlay.destroy()
    })
  }

  public showDefeat() {
    this.gameSound.gameOverSong.play()
    this.scene.pause();
    this.add.text(400, 300, 'Perdiste...', { fontSize: '48px', color: '#ff0000' }).setOrigin(0.5);
  }

  collectCoin(_player: Phaser.GameObjects.GameObject, coin: Phaser.GameObjects.GameObject) {
    const c = coin as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    this.score += 10
    c.destroy()

    // Play coin collection sound
    this.gameSound.coinSound.play()
  }
}
