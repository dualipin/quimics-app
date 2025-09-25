import type { LevelStyle } from '../../types/Level'

export const loadStructures = (
  load: Phaser.Loader.LoaderPlugin,
  levelStyle: LevelStyle = 'overworld',
) => {
  load.image(
    'floorbricks',
    new URL(`../../assets/scenery/${levelStyle}/floorbricks.png`, import.meta.url).href,
  )
  load.image(
    'start-floorbricks',
    new URL('../../assets/scenery/overworld/floorbricks.png', import.meta.url).href,
  )
  load.image('block', new URL(`../../assets/blocks/${levelStyle}/block.png`, import.meta.url).href)
  load.image('block2', new URL('../../assets/blocks/underground/block2.png', import.meta.url).href)
  load.image(
    'emptyBlock',
    new URL(`../../assets/blocks/${levelStyle}/emptyBlock.png`, import.meta.url).href,
  )
  load.image(
    'immovableBlock',
    new URL(`../../assets/blocks/${levelStyle}/immovableBlock.png`, import.meta.url).href,
  )
  load.spritesheet(
    'brick-debris',
    new URL(`../../assets/blocks/${levelStyle}/brick-debris.png`, import.meta.url).href,
    {
      frameWidth: 8,
      frameHeight: 8,
    },
  )
  load.spritesheet(
    'custom-block',
    new URL('../../assets/blocks/overworld/customBlock.png', import.meta.url).href,
    {
      frameWidth: 16,
      frameHeight: 16,
    },
  )
  load.spritesheet(
    'mystery-block',
    new URL(`../../assets/blocks/overworld/mysteryBlock.png`, import.meta.url).href,
    {
      frameWidth: 16,
      frameHeight: 16,
    },
  )
}
