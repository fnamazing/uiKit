// @flow
import Tooltip from './Tooltip';
import { getStyle } from './utils';

const SHOW_DELAY = 300;
const HIDE_DELAY = 300;

function isScrollable(node) {
  return (/auto|scroll/.test(getStyle(node, 'overflow')));
}

export default class TooltipMarshal {
  queuedForShow: ?Tooltip
  queuedForHide: ?Tooltip
  visibleTooltip: ?Tooltip
  showTimeout: ?number
  hideTimeout: ?number

  scrollListenerBound: boolean = false

  show(tooltip: Tooltip) {
    // if the tooltip is already queued for show, don't interfere
    if (this.queuedForShow === tooltip) return;

    // if another tooltip is queued for show, clear it out
    if (this.queuedForShow) {
      this.clearShowTimeout();
    }

    // if the tooltip is already visible, make sure it's not about to be hidden
    if (this.visibleTooltip === tooltip) {
      if (this.queuedForHide === tooltip) {
        this.clearHideTimeout();
      }
      return;
    }

    // if a tooltip is already visible, but is not the one that should be
    // displayed, immediately switch them
    if (this.visibleTooltip) {
      // the visible tooltip may be queued to be hidden; prevent that
      if (this.queuedForHide) {
        this.clearHideTimeout();
      }
      // immediately hide the old tooltip and show the new one
      this.showTooltip(tooltip, { immediate: true });
      return;
    }

    // if no tooltip is displayed, show the tooltip after a delay
    this.queuedForShow = tooltip;

    this.showTimeout = setTimeout(() => {
      this.showTooltip(tooltip, { immediate: false });
    }, SHOW_DELAY);
  }
  showTooltip(tooltip, options) {
    this.queuedForShow = null;
    this.showTimeout = null;
    if (this.visibleTooltip) {
      this.visibleTooltip.hide({ immediate: true });
    }
    this.visibleTooltip = tooltip;
    this.addScrollListener(tooltip);
    tooltip.show(options);
  }
  clearShowTimeout() {
    clearTimeout(this.showTimeout);
    this.showTimeout = null;
  }
  addScrollListener(tooltip) {
    if (this.scrollListenerBound) return;
    this.scrollListenerBound = true;
    let parent = tooltip.wrapper.parentNode;
    while (parent) {
      if (parent.tagName === 'BODY') {
        window.addEventListener('scroll', this.handleScroll);
        break;
      } else if (isScrollable(parent)) {
        parent.addEventListener('scroll', this.handleScroll);
        break;
      }

      parent = parent.parentNode;
    }
  }
  removeScrollListener(tooltip) {
    if (!this.scrollListenerBound) return;
    this.scrollListenerBound = false;
    let parent = tooltip.wrapper.parentNode;
    while (parent) {
      if (parent.tagName === 'BODY') {
        window.addEventListener('scroll', this.handleScroll);
        break;
      } else if (isScrollable(parent)) {
        parent.removeEventListener('scroll', this.handleScroll);
        break;
      }

      parent = parent.parentNode;
    }
  }
  handleScroll = () => {
    if (!this.visibleTooltip) return;
    this.hideTooltip(this.visibleTooltip, { immediate: true });
  }
  hide(tooltip: Tooltip) {
    // if the tooltip is already queued for hide, don't interfere
    if (this.queuedForHide === tooltip) return;

    // if the tooltip is queued for show clear it
    if (this.queuedForShow === tooltip) {
      this.clearShowTimeout();
      this.queuedForShow = null;
      return;
    }

    // bail if not the visible tooltip
    if (this.visibleTooltip !== tooltip) return;

    // queue for hide, hide current, and cleanup
    this.queuedForHide = tooltip;

    this.hideTimeout = setTimeout(() => {
      this.hideTooltip(tooltip, { immediate: false });
    }, HIDE_DELAY);
  }
  hideTooltip(tooltip, options) {
    this.queuedForHide = null;
    this.hideTimeout = null;
    if (!this.visibleTooltip) {
      return;
    }
    this.removeScrollListener(this.visibleTooltip);
    this.visibleTooltip = null;
    tooltip.hide(options);
  }
  clearHideTimeout() {
    clearTimeout(this.hideTimeout);
    this.queuedForHide = null;
  }
}
