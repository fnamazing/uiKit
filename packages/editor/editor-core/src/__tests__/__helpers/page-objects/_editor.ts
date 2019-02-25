import { Page } from './_types';
export const selectors = {
  editor: '.ProseMirror',
  dropList: 'div[data-role="droplistContent"]',
  emojiPicker: 'div[data-emoji-picker-container="true"]',
  mentionQuery: 'span[data-type-ahead-query]',
  gapCursor: '.ProseMirror-gapcursor',
  layoutDataSection: '[data-layout-section="true"]',
  panelContent: '.ak-editor-panel__content',
  codeContent: '.code-content',
};

export async function clickEditableContent(page: Page) {
  await page.waitForSelector(selectors.editor);
  await page.click(selectors.editor);
}

const replaceInputStr = (str: string) => {
  return `concat('${str.replace(/'/g, `', "'", '`)}', '')`;
};

export const clickElementWithText = async ({ page, tag, text }) => {
  const elementPath = `//${tag}[contains(text(), ${replaceInputStr(text)})]`;
  await page.waitForXPath(elementPath, 5000);
  const target = await page.$x(elementPath);
  expect(target.length).toBeGreaterThan(0);
  await target[0].click();
};

export const getBoundingRect = async (page, selector) => {
  return await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);
};

// Execute the click using page.evaluate
// There appears to be a bug in Puppeteer which causes the
// "Node is either not visible or not an HTMLElement" error.
// https://product-fabric.atlassian.net/browse/ED-5688
export const evaluateClick = (page, selector) => {
  return page.evaluate(selector => {
    document.querySelector(selector).click();
  }, selector);
};

export async function animationFrame(page) {
  // Give browser time to render, waitForFunction by default fires on RAF.
  await page.waitForFunction('1 === 1');
}
