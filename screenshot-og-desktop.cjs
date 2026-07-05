const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
  });

  console.log('🖥️ Acessando hero desktop...');
  await page.goto('https://pedrochalegre.netlify.app/', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  console.log('⏳ Aguardando vídeo e animações...');
  await new Promise(r => setTimeout(r, 5000));

  const outputPath = path.join(__dirname, 'public', 'og-image.png');
  await page.screenshot({ path: outputPath, type: 'png', fullPage: false });
  console.log(`✅ Salvo: og-image.png (1200x630)`);

  await browser.close();
  console.log('🎉 Pronto!');
})();
