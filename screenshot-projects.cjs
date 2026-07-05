const puppeteer = require('puppeteer');
const path = require('path');

const projects = [
  { name: 'c4odonto', url: 'https://c4odonto.com.br/' },
  { name: 'atelier-premium', url: 'https://atelierpremium.netlify.app' },
  { name: 'grupolmb', url: 'https://grupolmb.com.br/' },
  { name: 'prlmb', url: 'https://prlmb.grupolmb.com.br/' },
  { name: 'art-sapiens', url: 'https://testetatto2.netlify.app' },
  { name: 'barbearia-meus-manos', url: 'https://barbeariameusmanos.vercel.app/' },
  { name: 'feijoadadaspretas', url: 'https://feijoadadaspretas.netlify.app/' },
  { name: 'gsap-scroll', url: 'https://testegeladeira.vercel.app/' },
  { name: 'clenia-imoveis', url: 'https://cleniamedeirosimoveis.netlify.app' },
  { name: 'jackson-menezes', url: 'https://jacksonmenezes.netlify.app' },
  { name: 'meus-manos-barber', url: 'https://meusmanosbarber.netlify.app' },
  { name: 'matheus-silva', url: 'https://msthebarber.netlify.app' },
  { name: 'chalegre-energy', url: 'https://chalegreenergy.netlify.app' },
  { name: 'tvg-engenharia', url: 'https://tvgengenharia.com.br' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const outputDir = path.join(__dirname, 'public');

  for (const project of projects) {
    console.log(`📸 Capturando: ${project.name} (${project.url})`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 900, deviceScaleFactor: 1 });

    try {
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000));

      const outputPath = path.join(outputDir, `${project.name}.png`);
      await page.screenshot({ path: outputPath, type: 'png', fullPage: false });
      console.log(`  ✅ Salvo: ${project.name}.png`);
    } catch (err) {
      console.log(`  ❌ Erro: ${err.message}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('\n🎉 Todas as imagens foram capturadas!');
})();
