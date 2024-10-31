const dc = require('./dc');

const BASE_URL = 'discord.com';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto('BASE_URL');
})