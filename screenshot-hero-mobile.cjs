const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 320,
    height: 644,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  console.log('📱 Acessando hero mobile...');
  await page.goto('https://pedrochalegre.netlify.app/', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  console.log('⏳ Aguardando vídeo e animações...');
  await new Promise(r => setTimeout(r, 5000));

  const outputPath = path.join(__dirname, 'public', 'hero-mobile-preview.png');
  await page.screenshot({ path: outputPath, type: 'png', fullPage: false });
  console.log(`✅ Salvo: hero-mobile-preview.png`);

  await browser.close();
  console.log('🎉 Pronto!');
})();
