import { GameScene } from '../scenes/GameScene'

export class Structure {
  private scene: GameScene

  constructor(mainScene: GameScene) {
    this.scene = mainScene
  }

  builder(pieceStart: number) {
    let random = Phaser.Math.Between(0, 5)

    const screenHeight = this.scene.height
    const platformHeight = this.scene.platformHeight

    switch (random) {
      case 0:
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(2.5, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(1.5, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-0.5, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-1.5, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
            .setScale(screenHeight / 345),
        )

        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(3.6, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(5.6, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 2.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(4.6, 0.5),
        )

        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-2.6, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-4.6, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 2.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(-3.6, 0.5),
        )
        return Phaser.Math.Between(1, 3)
      case 1:
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(2.8, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(4.8, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(3.8, 0.5),
        )

        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-1.9, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-3.9, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(-2.9, 0.5),
        )

        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-0.5, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(1.5, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 2.9, 'mystery-block')
            .setScale(screenHeight / 345),
        )
        return Phaser.Math.Between(1, 3)
      case 2:
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(2.5, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-1.5, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 2.9, 'mystery-block')
            .setScale(screenHeight / 345),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(1.5, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(-0.5, 0.5),
        )
        return Phaser.Math.Between(1, 3)
      case 3:
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(0, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(1, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(2, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 2.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-1, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 2.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(0, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 2.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(1, 0.5),
        )
        return Phaser.Math.Between(1, 3)
      case 4:
        let random = Phaser.Math.Between(0, 4)
        switch (random) {
          case 0:
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 2.9, 'mystery-block')
                .setScale(screenHeight / 345),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(-3, 0.5),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(4, 0.5),
            )
            break
          case 1:
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(-3, 0.5),
            )
            break
          case 2:
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345),
            )
            break
          case 3:
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(1.5, 0.5),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(-0.5, 0.5),
            )
            break
          case 4:
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(1.75, 0.5),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(0.75, 0.5),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(-0.25, 0.5),
            )
            this.scene.mysteryBlocksGroup.add(
              this.scene.add
                .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
                .setScale(screenHeight / 345)
                .setOrigin(-1.25, 0.5),
            )
            break
        }
        return Phaser.Math.Between(1, 2)
      case 5:
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(1.5, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(0.5, 0.5),
        )
        this.scene.blocksGroup.add(
          this.scene.add
            .tileSprite(pieceStart, screenHeight - platformHeight * 1.9, 16, 16, 'block')
            .setScale(screenHeight / 345)
            .setOrigin(-1.5, 0.5),
        )
        this.scene.mysteryBlocksGroup.add(
          this.scene.add
            .sprite(pieceStart, screenHeight - platformHeight * 1.9, 'mystery-block')
            .setScale(screenHeight / 345)
            .setOrigin(-0.5, 0.5),
        )
        return Phaser.Math.Between(1, 2)
    }
    return 1
  }
}
