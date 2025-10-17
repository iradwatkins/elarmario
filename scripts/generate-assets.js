const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const sourceBlack = path.join(__dirname, '../.000000/black hanger.png');
const sourceWhite = path.join(__dirname, '../.000000/white hanger.png');

async function generateAssets() {
  console.log('Generating favicon and OG images...');

  // Create favicon.ico (32x32) from black logo
  await sharp(sourceBlack)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated favicon-32x32.png');

  // Create apple-touch-icon (180x180)
  await sharp(sourceBlack)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // Create OG image (1200x630) - standard social media size
  await sharp(sourceBlack)
    .resize(1200, 630, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Generated og-image.png (1200x630)');

  // Create logo.png optimized for web (800x400)
  await sharp(sourceBlack)
    .resize(800, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Generated logo.png (800x400)');

  console.log('All assets generated successfully!');
}

generateAssets().catch(console.error);
