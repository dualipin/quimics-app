import { World } from '../logic/World'
import type { GameScene } from '../scenes/GameScene'

export abstract class Level {
  protected world: World

  constructor(protected scene: GameScene) {
    this.world = new World(scene)
  }

  abstract create(): void

  addPlatform(x: number, y: number, scale = 2.5) {
    const p = this.scene.physics.add.staticSprite(x, y, 'block')
    p.setScale(scale).refreshBody()
    this.scene.platforms.add(p)
    this.scene.physics.add.existing(p, true)
  }

  addElements(compound: { nombre: string; formula: string; elementos: string[] }) {
    compound.elementos.forEach((element) => {
      const x = this.world.generateRandomCoordinate(true, false)
      const y = Phaser.Math.Between(-50, 50) // justo fuera de la parte superior

      // Create physics sprite instead of container
      // Crear el sprite sin añadirlo a la física todavía
      const baseSprite = this.scene.add
        .sprite(0, 0, 'block-element-coin')
        .setScale(0.5)
        .setTint(
          Phaser.Utils.Array.GetRandom([
            0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
          ]),
        )

      // Crear label centrado
      const label = this.scene.add
        .text(0, 0, element, {
          fontSize: '2em',
          color: '#000000',
          fontStyle: 'bold',
        })
        .setOrigin(0.5)

      // Unir sprite y texto en un contenedor
      const container = this.scene.add.container(x, y, [baseSprite, label])
      container.setData('element', element) // aquí element es el string del nombre

      // Añadir físicas al contenedor
      this.scene.physics.add.existing(container)
      const body = container.body as Phaser.Physics.Arcade.Body
      body.setCollideWorldBounds(true)
      body.setBounce(0.2)

      this.scene.physics.add.collider(container, this.scene.platforms)
      this.scene.physics.add.overlap(
        this.scene.player,
        container,
        this.scene.collectElement as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this.scene,
      )
    })
  }
}
