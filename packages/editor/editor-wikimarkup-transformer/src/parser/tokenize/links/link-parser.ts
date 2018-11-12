/**
 * Minimal string buffer implementation to match Java implementation
 */
import { isBlank, isDigit, isNotBlank, StringBuffer } from '../../utils/text';

function trimIfPossible(s: string | null): string | null {
  if (s == null) {
    return null;
  }

  return s.trim();
}

function extractLinkBody(buffer: StringBuffer): string | null {
  if (
    buffer.indexOf('!') == -1 ||
    buffer.indexOf('!') > buffer.indexOf('|') ||
    buffer.indexOf('!') == buffer.lastIndexOf('!')
  ) {
    return divideOn(buffer, '|');
  } else {
    const body = new StringBuffer();
    let inEscape = false;

    for (let i = 0; i < buffer.length(); i++) {
      const c = buffer.charAt(i);
      if (c == '!') {
        inEscape = !inEscape;
      }
      if (c == '|' && !inEscape) {
        buffer.delete(0, i + 1);
        return body.toString();
      }
      body.append(c);
    }

    return null;
  }
}

function divideAfterLast(buffer: StringBuffer, divider: string): string | null {
  if (buffer.length() == 0) {
    return null;
  }

  return divideAfter(buffer, buffer.lastIndexOf(divider));
}

function divideAfter(
  buffer: StringBuffer,
  index: number | string,
): string | null {
  if (typeof index === 'string') {
    index = buffer.indexOf(index);
  }

  if (index < 0) {
    return null;
  } else if (index == buffer.length() - 1) {
    buffer.deleteCharAt(buffer.length() - 1);
    return null;
  } else {
    const body = buffer.substring(index + 1);
    buffer.delete(index, buffer.length());
    return body;
  }
}

/**
 * Split a StringBuffer on some dividing character. Return everything before the divider,
 * and remove that prefix _and_ the divider from the StringBuffer. If there is no divider,
 * return null.
 * <p/>
 * If the buffer begins with the divider, then the divider will be removed _and_ null returned.
 * If the buffer ends with the divider, everything before the divider is returned and the buffer
 * will remain empty.
 *
 * @param buffer  the text we want to divide. Will be modified during the operation
 * @param divider the character to divide the buffer on
 * @return the characters before the divider, or the default if there are none
 */
function divideOn(buffer: StringBuffer, divider: string): string | null {
  if (buffer.length() == 0) {
    return null;
  }

  const i = buffer.indexOf(divider);

  if (i < 0) {
    return null;
  } else if (i == 0) {
    buffer.deleteCharAt(0);
    return null;
  } else {
    const body = buffer.substring(0, i);
    buffer.delete(0, i + 1);
    return body;
  }
}

function extractNumber(buf: StringBuffer): number {
  const digits = new StringBuffer();
  let i = 0;

  for (; i < buf.length() && isDigit(buf.charAt(i)); i++) {
    digits.append(buf.charAt(i));
  }

  if (i > 0) {
    buf.delete(0, i);
  }

  try {
    return parseInt(digits.toString());
  } catch (e) {
    return 0;
  }
}

export interface Link {
  readonly originalLinkText: string;
  readonly linkBody: string | null;
  readonly notLinkBody: string;
  readonly linkTitle: string | null;
}

export function parseLink(linkText: string): Link {
  const originalLinkText = linkText;

  // we want to decode single quotes (represented by &#039;) back before parsing the link test
  if (linkText.indexOf('&#039;') != -1) {
    linkText = linkText.replace('&#039;', "'");
  }

  const buf = new StringBuffer(linkText);
  const linkBody = extractLinkBody(buf);
  const linkTitle = trimIfPossible(divideAfter(buf, '|'));
  const notLinkBody = buf.toString().trim();

  return {
    originalLinkText,
    linkBody,
    linkTitle,
    notLinkBody,
  };
}

export interface ContentLink extends Link {
  readonly spaceKey: string | null;
  readonly destinationTitle: string;
  readonly anchor: string | null;
  readonly shortcutName: string | null;
  readonly shortcutValue: string | null;
  readonly attachmentName: string | null;
  readonly contentId: number;
}

export function parseContentLink(link: Link | string): ContentLink {
  if (typeof link === 'string') {
    link = parseLink(link);
  }

  const { notLinkBody } = link;

  let shortcutName: string | null = null;
  let shortcutValue: string | null = null;
  let spaceKey: string | null = null;
  let attachmentName: string | null = null;
  let anchor: string | null = null;
  let destinationTitle: string = '';

  let contentId = 0;

  // Don't treat it as a short link when it starts with "~"
  if (!notLinkBody.startsWith('~')) {
    const shortcutBuf = new StringBuffer(notLinkBody);
    shortcutName = trimIfPossible(divideAfterLast(shortcutBuf, '@'));

    if (isNotBlank(shortcutName)) {
      shortcutValue = shortcutBuf.toString();
    }
  }

  const buf = new StringBuffer(notLinkBody);

  if (isBlank(shortcutName)) {
    spaceKey = trimIfPossible(divideOn(buf, ':'));

    if (buf.indexOf('$') == 0) {
      buf.deleteCharAt(0);
      contentId = extractNumber(buf);
      if (contentId == 0) {
        return {
          ...link,
          shortcutName,
          shortcutValue,
          spaceKey,
          contentId,
          attachmentName,
          anchor,
          destinationTitle,
        };
      }
    }

    attachmentName = trimIfPossible(divideAfter(buf, '^'));
    anchor = trimIfPossible(divideAfter(buf, '#'));
  }

  if (contentId == 0) {
    destinationTitle = buf.toString().trim();
  }

  return {
    ...link,
    shortcutName,
    shortcutValue,
    spaceKey,
    contentId,
    attachmentName,
    anchor,
    destinationTitle,
  };
}
