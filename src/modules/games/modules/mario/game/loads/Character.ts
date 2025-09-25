import marie from '../../assets/marie.png'
import antoine from '../../assets/antoine.png'
import dmitri from '../../assets/dmitri.png'

export const loadCharacters = (load: Phaser.Loader.LoaderPlugin) => {
  load.spritesheet('marie', marie, { frameWidth: 45, frameHeight: 90 })

  load.spritesheet('antoine', antoine, { frameWidth: 45, frameHeight: 90 })

  load.spritesheet('dmitri', dmitri, { frameWidth: 45, frameHeight: 90 })
}
