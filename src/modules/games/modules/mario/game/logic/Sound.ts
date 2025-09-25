import type { GameScene } from '../scenes/GameScene'

export class Sound {
  private scene: GameScene

  public musicTheme: Phaser.Sound.BaseSound
  public undergroundMusicTheme: Phaser.Sound.BaseSound
  public hurryMusicTheme: Phaser.Sound.BaseSound
  public gameOverSong: Phaser.Sound.BaseSound
  public winSound: Phaser.Sound.BaseSound
  public jumpSound: Phaser.Sound.BaseSound
  public coinSound: Phaser.Sound.BaseSound
  public powerUpAppearsSound: Phaser.Sound.BaseSound
  public consumePowerUpSound: Phaser.Sound.BaseSound
  public powerDownSound: Phaser.Sound.BaseSound
  public goombaStompSound: Phaser.Sound.BaseSound
  public flagPoleSound: Phaser.Sound.BaseSound
  public fireballSound: Phaser.Sound.BaseSound
  public kickSound: Phaser.Sound.BaseSound
  public timeWarningSound: Phaser.Sound.BaseSound
  public hereWeGoSound: Phaser.Sound.BaseSound
  public pauseSound: Phaser.Sound.BaseSound
  public blockBumpSound: Phaser.Sound.BaseSound
  public breakBlockSound: Phaser.Sound.BaseSound

  constructor(scene: GameScene) {
    this.scene = scene

    this.musicTheme = this.scene.sound.add('music', { volume: 0.15 })


    this.undergroundMusicTheme = this.scene.sound.add('underground-music', { volume: 0.15 })
    this.undergroundMusicTheme = this.scene.sound.add('underground-music', { volume: 0.15 })

    this.hurryMusicTheme = this.scene.sound.add('hurry-up-music', { volume: 0.15 })

    this.gameOverSong = this.scene.sound.add('gameoversong', { volume: 0.2, rate: 0.5, })

    this.winSound = this.scene.sound.add('win', { volume: 0.3 })

    this.jumpSound = this.scene.sound.add('jumpsound', { volume: 0.1 })

    this.coinSound = this.scene.sound.add('coin', { volume: 0.2 })

    this.powerUpAppearsSound = this.scene.sound.add('powerup-appears', { volume: 0.2 })

    this.consumePowerUpSound = this.scene.sound.add('consume-powerup', { volume: 0.2 })

    this.powerDownSound = this.scene.sound.add('powerdown', { volume: 0.3 })

    this.goombaStompSound = this.scene.sound.add('goomba-stomp', { volume: 1 })

    this.flagPoleSound = this.scene.sound.add('flagpole', { volume: 0.3 })

    this.fireballSound = this.scene.sound.add('fireball', { volume: 0.3 })

    this.kickSound = this.scene.sound.add('kick', { volume: 0.3 })

    this.timeWarningSound = this.scene.sound.add('time-warning', { volume: 0.2 })

    this.hereWeGoSound = this.scene.sound.add('here-we-go', { volume: 0.17 })

    this.pauseSound = this.scene.sound.add('pauseSound', { volume: 0.17 })

    this.blockBumpSound = this.scene.sound.add('block-bump', { volume: 0.3 })

    this.breakBlockSound = this.scene.sound.add('break-block', { volume: 0.5 })
  }
}
