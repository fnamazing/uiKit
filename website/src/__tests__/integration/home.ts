import { BrowserTestCase } from '@findable/webdriver-runner/runner';
import Page from '@findable/webdriver-runner/wd-wrapper';

const urlHome = 'http://localhost:9000/';

const app = '#app';
const atlaskitLayer = '[spacing="cosy"]';
const atlaskitLogo = '[alt="Atlaskit logo"]';
const atlaskitTitle = 'h1';

BrowserTestCase(
  'home.js: The website home page should be displayed without errors',
  { skip: ['firefox', 'safari'] },
  // TODO: Please unskip when Editor fix this ED-5921
  async client => {
    const homeTest = new Page(client);
    await homeTest.goto(urlHome);
    await homeTest.waitForSelector(app);
    const subHeaderTitle = await homeTest.getText(atlaskitTitle);
    const logo = await homeTest.isVisible(atlaskitLogo);
    const pageIsVisible = await homeTest.isVisible(atlaskitLayer);

    expect(logo).toBe(true);
    expect(subHeaderTitle).toBe('Atlaskit');
    expect(pageIsVisible).toBe(true);
    await homeTest.checkConsoleErrors();
  },
);
