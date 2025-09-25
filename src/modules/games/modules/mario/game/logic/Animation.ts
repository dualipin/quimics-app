import { GameScene } from '../scenes/GameScene'

export class AnimationGame {
  private scene!: GameScene
  static #instance: AnimationGame | null = null

  constructor() {}

  public static get instance(): AnimationGame {
    if (!AnimationGame.#instance) {
      AnimationGame.#instance = new AnimationGame()
    }
    return AnimationGame.#instance
  }

  create(scene: GameScene) {
    this.scene = scene
    const character = this.scene.character
    this.scene.anims.create({
      key: 'idle',
      frames: [{ key: character, frame: 0 }],
    })
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers(character, { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    })
    this.scene.anims.create({
      key: 'hurt',
      frames: [{ key: character, frame: 0 }],
    })
    this.scene.anims.create({
      key: 'jump',
      frames: [{ key: character, frame: 1 }],
    })

    //> Goomba animations
    this.scene.anims.create({
      key: 'goomba-idle',
      frames: [{ key: 'goomba', frame: 1 }],
    })
    this.scene.anims.create({
      key: 'goomba-walk',
      frames: this.scene.anims.generateFrameNumbers('goomba', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    })
    this.scene.anims.create({
      key: 'goomba-hurt',
      frames: [{ key: 'goomba', frame: 2 }],
    })

    //> koopas animations
    this.scene.anims.create({
      key: 'koopa-idle',
      frames: [{ key: 'koopa', frame: 1 }],
    })
    this.scene.anims.create({
      key: 'koopa-walk',
      frames: this.scene.anims.generateFrameNumbers('koopa', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    })
    this.scene.anims.create({
      key: 'koopa-hurt',
      frames: [{ key: 'koopa', frame: 0 }],
    })
    this.scene.anims.create({
      key: 'koopa-shell',
      frames: [{ key: 'koopa', frame: 1 }],
    })

    //> Coins
    this.scene.anims.create({
      key: 'coin-default',
      frames: this.scene.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    //> Ground coin
    this.scene.anims.create({
      key: 'ground-coin-default',
      frames: this.scene.anims.generateFrameNumbers('ground-coin', { start: 2, end: 0 }),
      frameRate: 5,
      repeat: -1,
      repeatDelay: 5,
    })

    //> mystery blocks
    this.scene.anims.create({
      key: 'mystery-block-default',
      frames: this.scene.anims.generateFrameNumbers('mystery-block', { start: 2, end: 0 }),
      frameRate: 5,
      repeat: -1,
      repeatDelay: 5,
    })

    //> Custom blocks
    this.scene.anims.create({
      key: 'custom-block-default',
      frames: this.scene.anims.generateFrameNumbers('custom-block', { start: 2, end: 0 }),
      frameRate: 5,
      repeat: -1,
      repeatDelay: 5,
    })

    //> Brick debris
    this.scene.anims.create({
      key: 'brick-debris-default',
      frames: this.scene.anims.generateFrameNumbers('brick-debris', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    })

    //> Fireflower
    this.scene.anims.create({
      key: 'fire-flower-default',
      frames: this.scene.anims.generateFrameNumbers('fire-flower', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    //> Fireball
    this.scene.anims.create({
      key: 'fireball-left-down',
      frames: [{ key: 'fireball', frame: 0 }],
    })
    this.scene.anims.create({
      key: 'fireball-left-up',
      frames: [{ key: 'fireball', frame: 1 }],
    })
    this.scene.anims.create({
      key: 'fireball-right-down',
      frames: [{ key: 'fireball', frame: 2 }],
    })
    this.scene.anims.create({
      key: 'fireball-right-up',
      frames: [{ key: 'fireball', frame: 3 }],
    })

    //> Fireball explosion
    this.scene.anims.create({
      key: 'fireball-explosion-1',
      frames: [{ key: 'fireball-explosion', frame: 0 }],
    })
    this.scene.anims.create({
      key: 'fireball-explosion-2',
      frames: [{ key: 'fireball-explosion', frame: 1 }],
    })
    this.scene.anims.create({
      key: 'fireball-explosion-3',
      frames: [{ key: 'fireball-explosion', frame: 2 }],
    })

    //> NPC
    this.scene.anims.create({
      key: 'npc-default',
      frames: this.scene.anims.generateFrameNumbers('npc', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
      repeatDelay: 10,
    })
  }

  destroy() {
    this.scene.anims.remove('idle')
    this.scene.anims.remove('run')
    this.scene.anims.remove('hurt')
    this.scene.anims.remove('jump')

    //> Goomba animations
    this.scene.anims.remove('goomba-idle')
    this.scene.anims.remove('goomba-walk')
    this.scene.anims.remove('goomba-hurt')

    //> Koopa animations
    this.scene.anims.remove('koopa-idle')
    this.scene.anims.remove('koopa-walk')
    this.scene.anims.remove('koopa-hurt')
    this.scene.anims.remove('koopa-shell')

    //> Coins
    this.scene.anims.remove('coin-default')

    //> Ground coin
    this.scene.anims.remove('ground-coin-default')

    //> Mystery blocks
    this.scene.anims.remove('mystery-block-default')

    //> Custom blocks
    this.scene.anims.remove('custom-block-default')

    //> Brick debris
    this.scene.anims.remove('brick-debris-default')

    //> Fireflower
    this.scene.anims.remove('fire-flower-default')

    //> Fireball
    this.scene.anims.remove('fireball-left-down')
    this.scene.anims.remove('fireball-left-up')
    this.scene.anims.remove('fireball-right-down')
    this.scene.anims.remove('fireball-right-up')

    //> Fireball explosion
    this.scene.anims.remove('fireball-explosion-1')
    this.scene.anims.remove('fireball-explosion-2')
    this.scene.anims.remove('fireball-explosion-3')

    //> NPC
    this.scene.anims.remove('npc-default')
    this.scene = null as any // Clear reference to the scene
  }
}
