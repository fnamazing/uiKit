import { snapshot, mountRenderer, goToRendererTestingExample } from './_utils';
import { document } from './__fixtures__/document-without-media';
import { Page } from 'puppeteer';

describe('Snapshot Test: Dynamic Text Sizing', () => {
  let page: Page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await goToRendererTestingExample(page);
  });

  [
    { width: 1440, height: 2700 },
    { width: 1120, height: 2500 },
    { width: 1000, height: 2500 },
  ].forEach(size => {
    it(`should correctly render ${size.width}`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      await mountRenderer(page, {
        appearance: 'full-page',
        allowDynamicTextSizing: true,
        document,
      });
      await snapshot(page, 0.01);
    });
  });
});
