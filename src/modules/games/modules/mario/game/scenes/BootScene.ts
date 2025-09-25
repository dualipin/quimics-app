import Phaser from 'phaser'
import { loadOverWorlds } from '../loads/OverWorld'
import { loadSounds } from '../loads/Sound'
import { loadCharacters } from '../loads/Character'
import { loadStructures } from '../loads/Structure'
import { loadBootScene } from './LoadScene'
import { loadEntities } from '../loads/Entities'
import { loadCollectible } from '../loads/Collectible'

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    loadBootScene(this)

    loadCharacters(this.load)
    loadEntities(this.load)
    loadOverWorlds(this.load)
    loadStructures(this.load)
    loadCollectible(this.load)
    loadSounds(this.load)
  }

  create() {
    this.scene.start('GameScene')
  }
}
