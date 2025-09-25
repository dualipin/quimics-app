import carrierCommandImage from '../../assets/fonts/carrier_command.png'
import carrierCommandXml from '../../assets/fonts/carrier_command.xml'

export const loadFonts = (load: Phaser.Loader.LoaderPlugin) => {
    load.bitmapFont('carrier_command', carrierCommandImage, carrierCommandXml);
}