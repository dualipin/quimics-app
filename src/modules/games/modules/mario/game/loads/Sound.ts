import type { LevelStyle } from '../../types/Level'

export const loadSounds = (
  load: Phaser.Loader.LoaderPlugin,
  levelStyle: LevelStyle = 'overworld',
) => {
  load.audio('music', new URL(`../../assets/sound/music/overworld/theme.mp3`, import.meta.url).href)
  load.audio(
    'underground-music',
    new URL(`../../assets/sound/music/underground/theme.mp3`, import.meta.url).href,
  )
  load.audio(
    'hurry-up-music',
    new URL(`../../assets/sound/music/${levelStyle}/hurry-up-theme.mp3`, import.meta.url).href,
  )
  load.audio('gameoversong', new URL(`../../assets/sound/music/gameover.mp3`, import.meta.url).href)
  load.audio('win', new URL(`../../assets/sound/music/win.wav`, import.meta.url).href)
  load.audio('jumpsound', new URL(`../../assets/sound/effects/jump.mp3`, import.meta.url).href)
  load.audio('coin', new URL(`../../assets/sound/effects/coin.mp3`, import.meta.url).href)
  load.audio(
    'powerup-appears',
    new URL(`../../assets/sound/effects/powerup-appears.mp3`, import.meta.url).href,
  )
  load.audio(
    'consume-powerup',
    new URL(`../../assets/sound/effects/consume-powerup.mp3`, import.meta.url).href,
  )
  load.audio('powerdown', new URL(`../../assets/sound/effects/powerdown.mp3`, import.meta.url).href)
  load.audio(
    'goomba-stomp',
    new URL(`../../assets/sound/effects/goomba-stomp.wav`, import.meta.url).href,
  )
  load.audio('flagpole', new URL(`../../assets/sound/effects/flagpole.mp3`, import.meta.url).href)
  load.audio('fireball', new URL(`../../assets/sound/effects/fireball.mp3`, import.meta.url).href)
  load.audio('kick', new URL(`../../assets/sound/effects/kick.mp3`, import.meta.url).href)
  load.audio(
    'time-warning',
    new URL(`../../assets/sound/effects/time-warning.mp3`, import.meta.url).href,
  )
  load.audio(
    'here-we-go',
    Phaser.Math.Between(0, 100) < 98
      ? new URL(`../../assets/sound/effects/here-we-go.mp3`, import.meta.url).href
      : new URL(`../../assets/sound/effects/cursed-here-we-go.mp3`, import.meta.url).href,
  )
  load.audio('pauseSound', new URL(`../../assets/sound/effects/pause.wav`, import.meta.url).href)
  load.audio(
    'block-bump',
    new URL(`../../assets/sound/effects/block-bump.wav`, import.meta.url).href,
  )
  load.audio(
    'break-block',
    new URL(`../../assets/sound/effects/break-block.wav`, import.meta.url).href,
  )
}
