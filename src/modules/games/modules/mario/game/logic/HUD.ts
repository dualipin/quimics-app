import type { GameScene } from '../scenes/GameScene'

export class HUD {
  private scene!: GameScene
  private hudText!: Phaser.GameObjects.Text
  static #instance: HUD
  constructor() {}

  public static get instance(): HUD {
    if (!HUD.#instance) {
      HUD.#instance = new HUD()
    }
    return HUD.#instance
  }

  create(scene: GameScene) {
    this.scene = scene
    this.hudText = this.scene.add.text(16, 16, '', {
      fontFamily: 'monospace',
      fontSize: '22px',
      color: '#ffffff',
    })
    this.hudText.setScrollFactor(0)
    this.update()
  }
  update() {
    this.hudText.setText([
      `Objetivo: ${this.scene.compound.nombre} (${this.scene.compound.formula}) — Recolecta ${this.scene.compound.elementos}`,
      `Tienes recogidos: ${this.scene.currentCollectedElements.length}/${this.scene.compound.elementos.length}`,
      `Recogidos: ${this.scene.currentCollectedElements}`,
      // `H: ${this.counts.H}/${this.target.H}    O: ${this.counts.O}/${this.target.O}`,
      `Personaje: ${this.scene.character}`,
      'Controles: ← → para moverte, ↑ para saltar',
    ])
  }
}
