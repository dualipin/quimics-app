import type { GameScene } from '../scenes/GameScene'

export class Player {
  private scene: GameScene

  constructor(scene: GameScene) {
    this.scene = scene
  }

  create() {
    const player = this.scene.physics.add
      .sprite(
        /*screenWidth * 1.5*/ this.scene.startOffset,
        this.scene.height - 1000,
        this.scene.character,
      )
      .setOrigin(1)
      .setBounce(0)
      .setCollideWorldBounds(true)
      .setScale(this.scene.height / 700)
    player.depth = 3

    return player
  }
}
