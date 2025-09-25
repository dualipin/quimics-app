import type { CharacterKey } from '../types/Character'
import { BootScene } from './scenes/BootScene'
import { GameScene } from './scenes/GameScene'

export function createGame(opts: { parent: HTMLElement; character: CharacterKey }) {
  const gameWidth = opts.parent.clientWidth - 10
  const gameHeight = opts.parent.clientHeight - 10

  // const velocityX = gameWidth / 4.5
  const velocityY = gameHeight / 1.4

  const levelGravity = velocityY

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: '#87CEEB',
    parent: opts.parent,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: levelGravity },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [new BootScene(), new GameScene(opts.character)],
  }

  const game = new Phaser.Game(config)

  // Listen for character changes from Vue and forward to active scene
  game.events.on('character:change', (c: CharacterKey) => {
    const scene = game.scene.getScene('GameScene') as GameScene | undefined
    scene?.setCharacter(c)
  })

  game.events.on('difficulty:change', (d: number) => {
    const scene = game.scene.getScene('GameScene') as GameScene | undefined
    scene?.setDifficulty(d)
  })

  return game
}
