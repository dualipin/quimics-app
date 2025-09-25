export const loadCollectible = (load: Phaser.Loader.LoaderPlugin) => {
  load.spritesheet('coin', new URL('../../assets/collectibles/coin.png', import.meta.url).href, {
    frameWidth: 16,
    frameHeight: 16,
  })
  load.spritesheet(
    'ground-coin',
    new URL('../../assets/collectibles/underground/ground-coin.png', import.meta.url).href,
    {
      frameWidth: 10,
      frameHeight: 14,
    },
  )
  load.spritesheet(
    'fire-flower',
    new URL('../../assets/collectibles/overworld/fire-flower.png', import.meta.url).href,
    {
      frameWidth: 16,
      frameHeight: 16,
    },
  )
  load.image(
    'live-mushroom',
    new URL('../../assets/collectibles/live-mushroom.png', import.meta.url).href,
  )
  load.image(
    'super-mushroom',
    new URL('../../assets/collectibles/super-mushroom.png', import.meta.url).href,
  )

  load.image('block-element-coin', new URL('../../assets/blocks/ball.png', import.meta.url).href)
}
