export const loadEntities = (load: Phaser.Loader.LoaderPlugin) => {
  load.spritesheet(
    'goomba',
    new URL(`../../assets/entities/overworld/goomba.png`, import.meta.url).href,
    {
      frameWidth: 16,
      frameHeight: 16,
    },
  )
  load.spritesheet('koopa', new URL(`../../assets/entities/koopa.png`, import.meta.url).href, {
    frameWidth: 16,
    frameHeight: 24,
  })
  load.spritesheet('shell', new URL(`../../assets/entities/shell.png`, import.meta.url).href, {
    frameWidth: 16,
    frameHeight: 15,
  })
}
