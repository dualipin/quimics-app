import { Level } from './Level'

export class SecondLevel extends Level {
  create(): void {
    for (let i = 0; i < 150; i++) {
      this.addPlatform(
        this.world.generateRandomCoordinate(false, false),
        Phaser.Math.Between(this.scene.height / 3, this.scene.height - 150),
        1.25,
      )
    }
  }
}
