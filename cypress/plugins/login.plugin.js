const puppeteer = require('puppeteer')

module.exports.PuppeteerLogin = async function PuppeteerLogin(options = {}) {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
  });
  // get first page of current browser
  const page = (await browser.pages())[0];
  const elementHandle = await page.$(`iframe[src="https://www.aboutyou.de/dein-shop"]`);
  const frame = await elementHandle.contentFrame();
  // I don't know if you have control over this iframe or not, or if the class is static
  // but you need to get this in order to 'go inside' the iframe
  const login = await frame.$('iframe._iframe_f4657');
  const loginIframe = await login.contentFrame();
  await loginIframe.waitForSelector('input[name="email"]', { visible: true });
  await loginIframe.type('input[name="email"]', options.username, { delay: 100 });
  await loginIframe.waitForSelector('input[name="password"]');
  await loginIframe.type('input[name="password"]', options.password, { delay: 100 });
  await loginIframe.waitForSelector('button[type="submit"]', { visible: true })
  await loginIframe.click('button[type="submit"]')
  return null;
}