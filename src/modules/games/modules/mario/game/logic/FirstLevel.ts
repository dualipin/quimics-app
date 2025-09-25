import type { GameScene } from '../scenes/GameScene'

export class FirstLevel {
  private scene: GameScene

  constructor(scene: GameScene) {
    this.scene = scene
  }

  create() {
    const blocksGroup = this.scene.blocksGroup
    const screenWidth = this.scene.scale.width
    const screenHeight = this.scene.scale.height
    const worldWidth = this.scene.physics.world.bounds.width
    const platformHeight = this.scene.platformHeight
    const platformPieces = this.scene.platformPieces

    let pieceStart = screenWidth
    let lastWasHole = 0
    let lastWasStructure = 0
    const platformPiecesWidth = this.scene.platformPiecesWidth // Assuming a default width, adjust as needed

    for (let i = 0; i <= platformPieces; i++) {
      // Check if its not a hole, this means is not that 20%, is not in the spawn safe area and is not close to the end castle.
      if (
        lastWasHole > 0 ||
        lastWasStructure > 0 ||
        pieceStart <= screenWidth * 2 ||
        pieceStart >= worldWidth - screenWidth * 2
      ) {
        lastWasHole--
      }
    }
  }
}
