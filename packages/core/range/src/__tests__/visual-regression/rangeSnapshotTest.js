// @flow
import {
  getExampleUrl,
  takeScreenShot,
} from '@findable/visual-regression/helper';

describe('Snapshot Test', () => {
  it(`Basic example should match prod`, async () => {
    const url = getExampleUrl('core', 'range', 'basic', global.__BASEURL__);
    const image = await takeScreenShot(global.page, url);
    //$FlowFixMe
    expect(image).toMatchProdImageSnapshot();
  });
});
