require('dotenv').config(); 
const puppeteer = require('puppeteer');

const BASE_URL = 'https://discord.com/login';

const discord = {
    browser: null,
    page: null,

    Initialize: async () => {
        discord.browser = await puppeteer.launch({ headless: false }); 
        discord.page = await discord.browser.newPage();
        await discord.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

        console.log("Navigated to Discord login page");
    },

    login: async () => {
        await discord.page.waitForSelector('input[name="email"]');
        await discord.page.type('input[name="email"]', process.env.DISCORD_EMAIL, { delay: 100 });

      
        await discord.page.waitForSelector('input[name="password"]');
        await discord.page.type('input[name="password"]', process.env.DISCORD_PASSWORD, { delay: 100 });

  
        await discord.page.click('button[type="submit"]');
        console.log("Login button clicked");

        await discord.page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log("Login successful!");
    },

    close: async () => {
        if (discord.browser) {
            await discord.browser.close();
            console.log("Browser closed");
        }
    }
};

// Inisialisasi dan login
discord.Initialize()
    .then(() => discord.login())
    .catch((error) => console.error("Error during automation:", error))
    .finally(() => discord.close());
