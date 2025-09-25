import cloud1 from '../../assets/scenery/overworld/cloud1.png'
import cloud2 from '../../assets/scenery/overworld/cloud2.png'
import mountain1 from '../../assets/scenery/overworld/mountain1.png'
import mountain2 from '../../assets/scenery/overworld/mountain2.png'
import fence from '../../assets/scenery/overworld/fence.png'
import bush1 from '../../assets/scenery/overworld/bush1.png'
import bush2 from '../../assets/scenery/overworld/bush2.png'
import castle from '../../assets/scenery/castle.png'
import flagMast from '../../assets/scenery/flag-mast.png'

export const loadOverWorlds = (load: Phaser.Loader.LoaderPlugin) => {
  load.image('cloud1', cloud1)
  load.image('cloud2', cloud2)
  load.image('mountain1', mountain1)
  load.image('mountain2', mountain2)
  load.image('fence', fence)
  load.image('bush1', bush1)
  load.image('bush2', bush2)
  load.image('castle', castle)
  load.image('flag-mast', flagMast)
  load.image('final-flag', new URL(`../../assets/scenery/final-flag.png`, import.meta.url).href)
  load.spritesheet(
    'fireball',
    new URL(`../../assets/entities/fireball.png`, import.meta.url).href,
    { frameWidth: 8, frameHeight: 8 },
  )
  load.spritesheet(
    'fireball-explosion',
    new URL(`../../assets/entities/fireball-explosion.png`, import.meta.url).href,
    { frameWidth: 16, frameHeight: 16 },
  )
  load.spritesheet('npc', new URL(`../../assets/hud/npc.png`, import.meta.url).href, {
    frameWidth: 16,
    frameHeight: 24,
  })
}
