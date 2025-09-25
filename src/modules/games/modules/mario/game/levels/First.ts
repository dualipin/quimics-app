import { Level } from './Level'

export class FirstLevel extends Level {
  create(): void {
    for (let i = 0; i < 50; i++) {
      this.addPlatform(
        this.world.generateRandomCoordinate(false, true),
        Phaser.Math.Between(this.scene.height / 2, this.scene.height - 160),
      )
    }
  }
}
