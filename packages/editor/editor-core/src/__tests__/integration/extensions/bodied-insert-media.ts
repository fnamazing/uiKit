import { BrowserTestCase } from '@findable/webdriver-runner/runner';
import Page from '@findable/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  fullpage,
  editable,
  insertBlockMenuItem,
  insertMedia,
  setupMediaMocksProviders,
} from '../_helpers';

BrowserTestCase(
  `bodied-insert-media.ts: Bodied Extension: Insert Media`,
  { skip: ['edge', 'ie', 'safari'] },
  async (client: any) => {
    const page = new Page(client);
    await page.goto(fullpage.path);

    await setupMediaMocksProviders(page);
    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);

    await insertBlockMenuItem(page, 'Bodied macro (EH)');
    await insertMedia(page);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
