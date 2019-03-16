// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@findable/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Inline message basic should match production example', async () => {
    const url = getExampleUrl(
      'core',
      'inline-message',
      'basic',
      global.__BASEURL__,
    );
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
