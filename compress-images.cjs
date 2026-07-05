const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public');

const images = fs.readdirSync(publicDir).filter(f => f.endsWith('.png') && !f.includes('favicon') && !f.includes('og-image'));

(async () => {
  for (const file of images) {
    const inputPath = path.join(publicDir, file);
    const stat = fs.statSync(inputPath);
    const sizeKB = Math.round(stat.size / 1024);

    try {
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(inputPath + '.tmp');

      fs.renameSync(inputPath + '.tmp', inputPath);

      const newSize = Math.round(fs.statSync(inputPath).size / 1024);
      console.log(`✅ ${file}: ${sizeKB}KB → ${newSize}KB`);
    } catch (err) {
      console.log(`❌ ${file}: ${err.message}`);
    }
  }
  console.log('\n🎉 Compressão concluída!');
})();
