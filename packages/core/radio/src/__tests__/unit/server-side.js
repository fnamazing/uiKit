/**
 * @jest-environment node
 */
// @flow
import React from 'react';
import { getExamplesFor } from '@findable/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';

test('Field radio group server side rendering', async () => {
  (await getExamplesFor('field-radio-group')).forEach(examples => {
    // $StringLitteral
    const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
