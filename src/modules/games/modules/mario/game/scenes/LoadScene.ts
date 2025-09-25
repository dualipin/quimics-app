export const loadBootScene = (scene: Phaser.Scene) => {
  // Calculate center of screen

  const width = scene.game.canvas.width
  const height = scene.game.canvas.height

  const centerX = width / 2
  const centerY = height / 2

  // Create a loading bar container
  scene.add.rectangle(centerX, centerY, 404, 24, 0x111111).setOrigin(0.5, 0.5)
  const loadingBar = scene.add.rectangle(centerX - 202, centerY, 0, 16, 0x4cc9f0).setOrigin(0, 0.5)

  // Show loading text
  const loadingText = scene.add
    .text(centerX, centerY - 30, 'Cargando...', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
    })
    .setOrigin(0.5)

  // Update the loading bar as assets load
  scene.load.on('progress', (value: number) => {
    loadingBar.width = 400 * value
    loadingText.text = `Espere un momento... ${Math.floor(value * 100)}%`
  })

  // Remove the loading bar when complete
  scene.load.on('complete', () => {
    loadingBar.destroy()
    loadingText.destroy()
  })
}
