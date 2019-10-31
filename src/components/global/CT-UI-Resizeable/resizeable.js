/**
 * # CTSJ-UI-Resizeable
 支持PC的UI组件-Resizeable


 配置:
 el
 {
   onStart: Function
   onEnd: Function

   onCanResizeTop: Function
   onCanResizeBottom: Function
   onCanResizeLeft: Function
   onCanResizeRight: Function
   onCanResizeLeftTop: Function
   onCanResizeLeftBottom: Function
   onCanResizeRightTop: Function
   onCanResizeRightBottom: Function
   onChange: Function
   scale: [Number] 0.25 缩放比例
}

 布局:
 .ct-resizeable
 .ct-resizeable-item
 ...
 ...

 功能:
 .上、下、左、右、左上、左下、右上、右下8个方向的resizeable
 .一组中多个元素resizeable
 .多组都可以resizeable

 测试:

 log:

 demo:
 */
import { Dom6 } from '../../../util/CTMobile-UI-Util';

import './resizeable.less';

const selectorPrefix = 'ct-resizeable';

// 边缘的步进
const edgeStep = 5;
// 最小宽度
const minWidth = 20;
// 最小高度
const minHeight = 20;
const scrollStep = 5;
const edgeWidth = 10;
const scrollWidth = 20;

/**
 * Resizeable
 * @class Resizeable
 * @classdesc Resizeable
 */
class Resizeable {
  /**
   * constructor
   * @constructor
   * @param {HTMLElement} - el
   * @param {Object} - config
   * @param {ResizeableGroup} - parent
   * @param {Number} - index
   */
  constructor(el, config, parent, index) {
    this.el = el;
    this.id = index;
    this.config = Object.assign({}, config);
    this.index = index;
    this.parent = parent;
    this.disable = true;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.initVar();
    this.initEvents();
  }

  /**
   * onMouseDown
   * @param {HTMLElement} - e
   * @return {boolean}
   */
  onMouseDown(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;

    if (!self.isCanResize) {
      return false;
    }

    // el的baseWith
    self.baseWidth = self.el.offsetWidth;
    // el的baseHeight
    self.baseHeight = self.el.offsetHeight;
    // 左侧的临界值
    self.leftCritical = -self.baseWidth + minWidth;
    // 右侧的临界值
    self.rightCritical = self.baseWidth - minWidth;
    // 上方的临界值
    self.topCritical = -self.baseHeight + minHeight;
    // 下方的临界值
    self.bottomCritical = self.baseHeight - minHeight;
    // clientX
    self.clientX = self.el.offsetLeft;
    // clientY
    self.clientY = self.el.offsetTop;

    const { onStart } = self.config;
    if (onStart) {
      onStart();
    }

    self.isDown = true;
    self.parent.cur = self;
    self.baseX = e.clientX;
    self.baseY = e.clientY;
  }

  /**
   * onMouseMove
   * @param {HTMLElement} - e
   * @return {boolean}
   */
  onMouseMove(e) {
    const self = this;
    const { disable } = self;

    self.parent.capture = true;

    if (disable) {
      return false;
    }

    if (self.parent.cur && self.parent.cur !== self) {
      return false;
    }

    // 开启拖动模式
    if (self.isCanResize && self.isDown) {
      // el的mousemove不处理，放parent的mousemove处理
      return false;
    }

    e.preventDefault();
    e.stopPropagation();

    self.rect = self.el.getBoundingClientRect();

    const { clientX, clientY } = e;

    if (
      clientX - edgeStep <= self.rect.left &&
      clientY - edgeStep > self.rect.top &&
      clientY + edgeStep < self.rect.bottom
    ) {
      this.triggerResizeOption('left');
    } else if (
      clientX + edgeStep >= self.rect.right &&
      clientY - edgeStep > self.rect.top &&
      clientY + edgeStep < self.rect.bottom
    ) {
      this.triggerResizeOption('right');
    } else if (
      clientX - edgeStep <= self.rect.left &&
      clientY - edgeStep <= self.rect.top
    ) {
      this.triggerResizeOption('lefttop');
    } else if (
      clientX - edgeStep <= self.rect.left &&
      clientY + edgeStep >= self.rect.bottom
    ) {
      this.triggerResizeOption('leftbottom');
    } else if (
      clientX + edgeStep >= self.rect.right &&
      clientY - edgeStep <= self.rect.top
    ) {
      this.triggerResizeOption('righttop');
    } else if (
      clientX + edgeStep >= self.rect.right &&
      clientY + edgeStep >= self.rect.bottom
    ) {
      this.triggerResizeOption('rightbottom');
    } else if (
      clientY - edgeStep <= self.rect.top &&
      clientX - edgeStep > self.rect.left &&
      clientX + edgeStep < self.rect.right
    ) {
      this.triggerResizeOption('top');
    } else if (
      clientY + edgeStep >= self.rect.bottom &&
      clientX - edgeStep > self.rect.left &&
      clientX + edgeStep < self.rect.right
    ) {
      this.triggerResizeOption('bottom');
    } else {
      this.triggerResizeOption();
    }
  }

  /**
   * initVar
   */
  initVar() {
    // 是否可以resize
    this.isCanResize = false;
    // 是否down
    this.isDown = false;
    // down的原点
    this.baseX = null;
    this.baseY = null;

    // 方向
    this.direction = null;
  }

  /**
   * initEvents
   */
  initEvents() {
    Dom6.off(this.el, 'resize', 'mousedown');
    Dom6.on(this.el, 'resize', 'mousedown', this.onMouseDown);

    Dom6.off(this.el, 'resize', 'mousemove');
    Dom6.on(this.el, 'resize', 'mousemove', this.onMouseMove);
  }

  /**
   * reset
   */
  reset() {
    this.isCanResize = false;
    this.isDown = false;
    this.baseX = null;
    this.baseY = null;
    this.direction = null;
    this.disable = false;
  }

  /**
   * setDisable
   * @param {Boolean} - disable
   */
  setDisable(disable) {
    this.disable = disable;
  }

  /**
   * triggerResizeOption
   * @param {String} - direction
   */
  triggerResizeOption(direction) {
    const self = this;
    const { el } = self;
    const {
      onCanResizeTop,
      onCanResizeBottom,
      onCanResizeLeft,
      onCanResizeRight,
      onCanResizeLeftTop,
      onCanResizeLeftBottom,
      onCanResizeRightTop,
      onCanResizeRightBottom,
    } = self.config;

    let can = true;
    // console.log(4);
    switch (direction) {
      case 'left':
        if (onCanResizeLeft) {
          can = onCanResizeLeft(el);
        }
        if (can) {
          self.direction = 'left';
          self.isCanResize = true;
          document.body.style.cursor = 'w-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      case 'right':
        if (onCanResizeRight) {
          can = onCanResizeRight(el);
        }
        if (can) {
          self.direction = 'right';
          self.isCanResize = true;
          document.body.style.cursor = 'e-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      case 'top':
        if (onCanResizeTop) {
          can = onCanResizeTop(el);
        }
        if (can) {
          self.direction = 'top';
          self.isCanResize = true;
          document.body.style.cursor = 'n-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      case 'bottom':
        if (onCanResizeBottom) {
          can = onCanResizeBottom(el);
        }
        if (can) {
          self.direction = 'bottom';
          self.isCanResize = true;
          document.body.style.cursor = 's-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      case 'lefttop':
        if (onCanResizeLeftTop) {
          can = onCanResizeLeftTop(el);
        }
        if (can) {
          self.direction = 'lefttop';
          self.isCanResize = true;
          document.body.style.cursor = 'nw-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      case 'leftbottom':
        if (onCanResizeLeftBottom) {
          can = onCanResizeLeftBottom(el);
        }
        if (can) {
          self.direction = 'leftbottom';
          self.isCanResize = true;
          document.body.style.cursor = 'sw-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      case 'righttop':
        if (onCanResizeRightTop) {
          can = onCanResizeRightTop(el);
        }
        if (can) {
          self.direction = 'righttop';
          self.isCanResize = true;
          document.body.style.cursor = 'ne-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      case 'rightbottom':
        if (onCanResizeRightBottom) {
          can = onCanResizeRightBottom(el);
        }
        if (can) {
          self.direction = 'rightbottom';
          self.isCanResize = true;
          document.body.style.cursor = 'se-resize';
        } else {
          self.isCanResize = false;
          self.parent.cur = null;
          document.body.style.cursor = 'move';
        }
        break;
      default:
        self.isCanResize = false;
        self.parent.cur = null;
        document.body.style.cursor = 'move';
        break;
    }
  }
}

/**
 * ResizeableGroup
 * @class ResizeableGroup
 * @classdesc ResizeableGroup
 */
class ResizeableGroup {
  /**
   * constructor
   * @constructor
   * @param {HTMLElement} - el
   * @param {Object} - config
   */
  constructor(el, config) {
    this.el = el;
    this.config = Object.assign({}, config);
    this.ins = new Map();
    this.disable = false;

    this.setScale(this.config.scale || 1);

    this.scrollEl = this.el.parentElement;
    this.scrollElRect = this.scrollEl.getBoundingClientRect();
    this.scrollElWidth = this.scrollEl.offsetWidth;
    this.scrollElHeight = this.scrollEl.offsetHeight;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.rect = this.el.getBoundingClientRect();
    this.cur = null;
    this.initEvents();
    this.init();
  }

  /**
   * onMouseMove
   * @param {HTMLElement} - e
   * @return {boolean}
   */
  onMouseMove(e) {
    const self = this;

    const { disable = false } = self;

    if (disable) {
      return false;
    }

    if (!(self.cur && self.cur.isCanResize && self.cur.isDown)) {
      if (self.cur) {
        self.reset();
      }

      if (self.capture) {
        document.body.style.cursor = 'move';
      } else {
        document.body.style.cursor = 'default';
      }

      self.capture = false;

      return false;
    }

    const { clientX, clientY } = e;

    if (self.boundaryDetectionHandler) {
      cancelAnimationFrame(self.boundaryDetectionHandler);
      self.boundaryDetectionHandler = null;
    }

    const condition = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    };

    if (clientX <= self.scrollElRect.left + edgeWidth) {
      condition.left = self.scrollEl.scrollLeft !== 0;
    }

    if (clientX >= self.scrollElRect.right - (edgeWidth + scrollWidth)) {
      condition.right = true;
    }

    if (clientY <= self.scrollElRect.top + edgeWidth) {
      condition.top = self.scrollEl.scrollTop !== 0;
    }

    if (clientY >= self.scrollElRect.bottom - (edgeWidth + scrollWidth)) {
      condition.bottom = true;
    }

    const incrementWidth = (clientX - self.cur.baseX) / self.scale;
    const incrementHeight = (clientY - self.cur.baseY) / self.scale;

    const left = (self.cur.clientX) / self.scale;
    const top = (self.cur.clientY) / self.scale;

    const { onChange } = self.config;

    if (self.cur.direction === 'left') {
      self.resizeLeftDetail({ incrementWidth, left });
    } else if (self.cur.direction === 'right') {
      self.resizeRightDetail(incrementWidth);
    } else if (self.cur.direction === 'top') {
      self.resizeTopDetail({ incrementHeight, top });
    } else if (self.cur.direction === 'bottom') {
      self.resizeBottomDetail(incrementHeight);
    } else if (self.cur.direction === 'lefttop') {
      self.resizeLeftTopDetail({ incrementWidth, left, incrementHeight, top });
    } else if (self.cur.direction === 'leftbottom') {
      self.resizeLeftBottomDetail({ incrementWidth, left, incrementHeight });
    } else if (self.cur.direction === 'righttop') {
      self.resizeRightTopDetail({ incrementWidth, incrementHeight, top });
    } else if (self.cur.direction === 'rightbottom') {
      self.resizeRightBottomDetail({ incrementWidth, incrementHeight });
    }


    if (condition.left || condition.right || condition.top || condition.bottom) {
      if (condition.left || condition.right) {
        self.cur.baseWidth = self.cur.el.offsetWidth;
        self.cur.clientX = self.cur.el.offsetLeft;
        // 左侧的临界值
        self.cur.leftCritical = -self.cur.baseWidth + minWidth;
        // 右侧的临界值
        self.cur.rightCritical = self.cur.baseWidth - minWidth;
      }

      if (condition.top || condition.bottom) {
        self.cur.baseHeight = self.cur.el.offsetHeight;
        self.cur.clientY = self.cur.el.offsetTop;
        // 上方的临界值
        self.cur.topCritical = -self.cur.baseHeight + minHeight;
        // 下方的临界值
        self.cur.bottomCritical = self.cur.baseHeight - minHeight;
      }

      if (onChange) {
        onChange({ incrementWidth, incrementHeight, condition }, {
          handler: (el, params) => {
            return self.resizeCore(el, params);
          },
          context: self,
        });
      }

      self.boundaryDetectionScroll(condition);
    } else if (onChange) {
      onChange({ incrementWidth, incrementHeight, condition }, {
        handler: (el, params) => {
          return self.resizeCore(el, params);
        },
        context: self,
      });
    }
  }

  /**
   * onMouseUp
   * @return {boolean}
   */
  onMouseUp(e) {
    const self = this;

    const { disable = false } = self;

    if (disable) return false;

    if (!(self.cur && self.cur.isCanResize && self.cur.isDown)) {
      return false;
    }

    this.onMouseMove(e);
    // console.log('resizegroup', 'up');

    self.reset();

    const { onEnd } = self.config;
    if (onEnd) {
      onEnd();
    }
  }

  /**
   * boundaryDetectionScroll
   * @param {Object} - condition
   */
  boundaryDetectionScroll(condition) {
    const self = this;

    const { top, bottom, left, right } = condition;

    if (!self.cur || !self.cur.el) return false;

    const curElRect = self.cur.el.getBoundingClientRect();

    if (left) {
      if (self.scrollEl.scrollLeft !== 0) {
        if (self.scrollEl.scrollLeft - scrollStep < 0) {
          self.scrollEl.scrollLeft = 0;
        } else {
          self.scrollEl.scrollLeft -= scrollStep;
        }

        if (self.cur.direction === 'left') {
          self.cur.baseX = curElRect.left;
        } else if (self.cur.direction === 'lefttop') {
          self.cur.baseX = curElRect.left;
        } else if (self.cur.direction === 'leftbottom') {
          self.cur.baseX = curElRect.left;
        } else if (self.cur.direction === 'right') {
          self.cur.baseX = curElRect.right;
        } else if (self.cur.direction === 'righttop') {
          self.cur.baseX = curElRect.right;
        } else if (self.cur.direction === 'rightbottom') {
          self.cur.baseX = curElRect.right;
        }
      }
    }

    if (right) {
      if (self.scrollEl.scrollLeft !== self.scrollEl.scrollWidth) {
        if (self.scrollEl.scrollLeft + scrollStep > self.scrollEl.scrollWidth) {
          self.scrollEl.scrollLeft = self.scrollEl.scrollWidth;
        } else {
          self.scrollEl.scrollLeft += scrollStep;
        }

        if (self.cur.direction === 'left') {
          self.cur.baseX = curElRect.left;
        } else if (self.cur.direction === 'lefttop') {
          self.cur.baseX = curElRect.left;
        } else if (self.cur.direction === 'leftbottom') {
          self.cur.baseX = curElRect.left;
        } else if (self.cur.direction === 'right') {
          self.cur.baseX = curElRect.right;
        } else if (self.cur.direction === 'righttop') {
          self.cur.baseX = curElRect.right;
        } else if (self.cur.direction === 'rightbottom') {
          self.cur.baseX = curElRect.right;
        }
      }
    }

    if (top) {
      if (self.scrollEl.scrollTop !== 0) {
        if (self.scrollEl.scrollTop - scrollStep < 0) {
          self.scrollEl.scrollTop = 0;
        } else {
          self.scrollEl.scrollTop -= scrollStep;
        }
        if (self.cur.direction === 'top') {
          self.cur.baseY = curElRect.top;
        } else if (self.cur.direction === 'lefttop') {
          self.cur.baseY = curElRect.top;
        } else if (self.cur.direction === 'righttop') {
          self.cur.baseY = curElRect.top;
        } else if (self.cur.direction === 'bottom') {
          self.cur.baseY = curElRect.bottom;
        } else if (self.cur.direction === 'leftbottom') {
          self.cur.baseY = curElRect.bottom;
        } else if (self.cur.direction === 'rightbottom') {
          self.cur.baseY = curElRect.bottom;
        }
      }
    }

    if (bottom) {
      if (self.scrollEl.scrollTop !== self.scrollEl.scrollHeight) {
        if (self.scrollEl.scrollTop + scrollStep > self.scrollEl.scrollHeight) {
          self.scrollEl.scrollTop = self.scrollEl.scrollHeight;
        } else {
          self.scrollEl.scrollTop += scrollStep;
        }
        if (self.cur.direction === 'top') {
          self.cur.baseY = curElRect.top;
        } else if (self.cur.direction === 'lefttop') {
          self.cur.baseY = curElRect.top;
        } else if (self.cur.direction === 'righttop') {
          self.cur.baseY = curElRect.top;
        } else if (self.cur.direction === 'bottom') {
          self.cur.baseY = curElRect.bottom;
        } else if (self.cur.direction === 'leftbottom') {
          self.cur.baseY = curElRect.bottom;
        } else if (self.cur.direction === 'rightbottom') {
          self.cur.baseY = curElRect.bottom;
        }
      }
    }

    self.boundaryDetectionHandler = requestAnimationFrame(() => {
      self.boundaryDetectionScroll(condition);
    });
  }

  /**
   * resizeCore
   * @param {HTMLElement} - el
   * @param {Number} - baseWidth
   * @param {Number} - baseHeight
   * @param {Number} - incrementWidth
   * @param {Number} - incrementHeight
   */
  resizeCore(el, {
    baseWidth,
    baseHeight,
    clientX,
    clientY,
    incrementWidth,
    incrementHeight,
  }) {
    const self = this;
    if (self.cur.direction === 'left') {
      self.resizeLeftDetailCore(el, { baseWidth, incrementWidth, clientX });
    } else if (self.cur.direction === 'right') {
      self.resizeRightDetailCore(el, { baseWidth, incrementWidth, clientX });
    } else if (self.cur.direction === 'top') {
      self.resizeTopDetailCore(el, { baseHeight, incrementHeight, clientY });
    } else if (self.cur.direction === 'bottom') {
      self.resizeBottomDetailCore(el, { baseHeight, incrementHeight, clientY });
    } else if (self.cur.direction === 'lefttop') {
      self.resizeLeftTopDetailCore(el, {
        baseWidth,
        baseHeight,
        clientX,
        clientY,
        incrementWidth,
        incrementHeight,
      });
    } else if (self.cur.direction === 'leftbottom') {
      self.resizeLeftBottomDetailCore(el, {
        baseWidth,
        baseHeight,
        clientX,
        clientY,
        incrementWidth,
        incrementHeight,
      });
    } else if (self.cur.direction === 'righttop') {
      self.resizeRightTopDetailCore(el, {
        baseWidth,
        baseHeight,
        clientX,
        clientY,
        incrementWidth,
        incrementHeight,
      });
    } else if (self.cur.direction === 'rightbottom') {
      self.resizeRightBottomDetailCore(el, {
        baseWidth,
        baseHeight,
        clientX,
        clientY,
        incrementWidth,
        incrementHeight,
      });
    }
  }

  /**
   * resizeLeftDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseWidth
   * @param {Number} - incrementWidth
   */
  resizeLeftDetailCore(el, { baseWidth, incrementWidth, clientX }) {
    const computeWidth = baseWidth - incrementWidth;
    el.style.width = `${computeWidth < 0 ? 0 : computeWidth}px`;
    if (this.cur.el.offsetWidth < clientX) {
      el.style.left = `${clientX - (clientX - this.cur.el.offsetWidth)}px`;
    } else {
      el.style.left = `${clientX}px`;
    }
  }

  /**
   * resizeRightDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseWidth
   * @param {Number} - incrementWidth
   */
  resizeRightDetailCore(el, { baseWidth, incrementWidth, clientX }) {
    const computeWidth = baseWidth + incrementWidth;
    el.style.width = `${computeWidth < 0 ? 0 : computeWidth}px`;
    if (this.cur.el.offsetWidth < clientX) {
      el.style.left = `${clientX - (clientX - this.cur.el.offsetWidth)}px`;
    } else {
      el.style.left = `${clientX}px`;
    }
  }

  /**
   * resizeTopDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseHeight
   * @param {Number} - incrementHeight
   */
  resizeTopDetailCore(el, { baseHeight, incrementHeight, clientY }) {
    const computeHeight = baseHeight - incrementHeight;
    el.style.height = `${computeHeight < 0 ? 0 : computeHeight}px`;
    if (this.cur.el.offsetHeight < clientY) {
      el.style.top = `${clientY - (clientY - this.cur.el.offsetHeight)}px`;
    } else {
      el.style.top = `${clientY}px`;
    }
  }

  /**
   * resizeBottomDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseHeight
   * @param {Number} - incrementHeight
   */
  resizeBottomDetailCore(el, { baseHeight, incrementHeight, clientY }) {
    const computeHeight = baseHeight + incrementHeight;
    el.style.height = `${computeHeight < 0 ? 0 : computeHeight}px`;
    if (this.cur.el.offsetHeight < clientY) {
      el.style.top = `${clientY - (clientY - this.cur.el.offsetHeight)}px`;
    } else {
      el.style.top = `${clientY}px`;
    }
  }

  /**
   * resizeLeftTopDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseWidth
   * @param {Number} - incrementWidth
   * @param {Number} - baseHeight
   * @param {Number} - incrementHeight
   */
  resizeLeftTopDetailCore(el, { baseWidth, incrementWidth, clientX, clientY, baseHeight, incrementHeight }) {
    this.resizeLeftDetailCore(el, { baseWidth, incrementWidth, clientX });
    this.resizeTopDetailCore(el, { baseHeight, incrementHeight, clientY });
  }

  /**
   * resizeLeftBottomDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseWidth
   * @param {Number} - incrementWidth
   * @param {Number} - baseHeight
   * @param {Number} - incrementHeight
   */
  resizeLeftBottomDetailCore(el, { baseWidth, incrementWidth, clientX, clientY, baseHeight, incrementHeight }) {
    this.resizeLeftDetailCore(el, { baseWidth, incrementWidth, clientX });
    this.resizeBottomDetailCore(el, { baseHeight, incrementHeight, clientY });
  }

  /**
   * resizeRightTopDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseWidth
   * @param {Number} - incrementWidth
   * @param {Number} - baseHeight
   * @param {Number} - incrementHeight
   */
  resizeRightTopDetailCore(el, { baseWidth, incrementWidth, clientX, clientY, baseHeight, incrementHeight }) {
    this.resizeRightDetailCore(el, { baseWidth, incrementWidth, clientX });
    this.resizeTopDetailCore(el, { baseHeight, incrementHeight, clientY });
  }

  /**
   * resizeRightBottomDetailCore
   * @param {HTMLElement} - el
   * @param {Number} - baseWidth
   * @param {Number} - incrementWidth
   * @param {Number} - baseHeight
   * @param {Number} - incrementHeight
   */
  resizeRightBottomDetailCore(el, { baseWidth, incrementWidth, clientX, clientY, baseHeight, incrementHeight }) {
    this.resizeRightDetailCore(el, { baseWidth, incrementWidth, clientX });
    this.resizeBottomDetailCore(el, { baseHeight, incrementHeight, clientY });
  }

  /**
   * resizeLeftDetail
   * @param {Number} - incrementWidth
   * @param {Number} - left
   * @param {Boolean} - isUpdateCursor
   */
  resizeLeftDetail({ incrementWidth, left }, isUpdateCursor = true) {
    const self = this;
    const computeWidth = incrementWidth < self.cur.rightCritical ?
      self.cur.baseWidth - incrementWidth :
      minWidth;
    const computeLeft = incrementWidth < self.cur.rightCritical ?
      left + incrementWidth :
      left + self.cur.rightCritical;
    if (isUpdateCursor) {
      document.body.style.cursor = 'w-resize';
    }

    self.cur.el.style.width = `${computeWidth}px`;
    self.cur.el.style.left = `${computeLeft}px`;
  }

  /**
   * resizeRightDetail
   * @param {Number} - incrementWidth
   * @param {Boolean} - isUpdateCursor
   */
  resizeRightDetail(incrementWidth, isUpdateCursor = true) {
    const self = this;
    const computeWidth = incrementWidth > self.cur.leftCritical ?
      self.cur.baseWidth + incrementWidth :
      minWidth;
    if (isUpdateCursor) {
      document.body.style.cursor = 'e-resize';
    }
    self.cur.el.style.width = `${computeWidth}px`;
  }

  /**
   * resizeTopDetail
   * @param {Number} - incrementHeight
   * @param {Number} - top
   * @param {Boolean} - isUpdateCursor
   */
  resizeTopDetail({ incrementHeight, top }, isUpdateCursor = true) {
    const self = this;
    const computeHeight = incrementHeight < self.cur.bottomCritical ?
      self.cur.baseHeight - incrementHeight :
      minHeight;
    const computeTop = incrementHeight < self.cur.bottomCritical ?
      top + incrementHeight :
      top + self.cur.bottomCritical;
    if (isUpdateCursor) {
      document.body.style.cursor = 'n-resize';
    }

    self.cur.el.style.height = `${computeHeight}px`;
    self.cur.el.style.top = `${computeTop}px`;
  }

  /**
   * resizeBottomDetail
   * @param {Number} - incrementHeight
   * @param {Boolean} - isUpdateCursor
   */
  resizeBottomDetail(incrementHeight, isUpdateCursor = true) {
    const self = this;
    const computeHeight = incrementHeight > self.cur.topCritical ?
      self.cur.baseHeight + incrementHeight :
      minHeight;
    if (isUpdateCursor) {
      document.body.style.cursor = 's-resize';
    }
    self.cur.el.style.height = `${computeHeight}px`;
  }

  /**
   * resizeLeftTopDetail
   * @param incrementWidth
   * @param left
   * @param incrementHeight
   * @param top
   */
  resizeLeftTopDetail({ incrementWidth, left, incrementHeight, top }) {
    this.resizeLeftDetail({ incrementWidth, left }, false);
    this.resizeTopDetail({ incrementHeight, top }, false);
    document.body.style.cursor = 'nw-resize';
  }

  /**
   * resizeLeftBottomDetail
   * @param incrementWidth
   * @param left
   * @param incrementHeight
   */
  resizeLeftBottomDetail({ incrementWidth, left, incrementHeight }) {
    this.resizeLeftDetail({ incrementWidth, left }, false);
    this.resizeBottomDetail(incrementHeight, false);
    document.body.style.cursor = 'sw-resize';
  }

  /**
   * resizeRightTopDetail
   * @param incrementWidth
   * @param incrementHeight
   * @param top
   */
  resizeRightTopDetail({ incrementWidth, incrementHeight, top }) {
    this.resizeRightDetail(incrementWidth, false);
    this.resizeTopDetail({ incrementHeight, top }, false);
    document.body.style.cursor = 'ne-resize';
  }

  /**
   * resizeRightBottomDetail
   * @param incrementWidth
   * @param incrementHeight
   */
  resizeRightBottomDetail({ incrementWidth, incrementHeight }) {
    this.resizeRightDetail(incrementWidth, false);
    this.resizeBottomDetail(incrementHeight, false);
    document.body.style.cursor = 'se-resize';
  }

  /**
   * initEvents
   */
  initEvents() {
    const self = this;

    Dom6.off(self.el, 'resize', 'mousemove');
    Dom6.on(self.el, 'resize', 'mousemove', this.onMouseMove);

    Dom6.off(self.el, 'resize', 'mouseup');
    Dom6.on(self.el, 'resize', 'mouseup', this.onMouseUp);

    Dom6.off(self.el, 'resize', 'mouseleave');
    Dom6.on(self.el, 'resize', 'mouseleave', (e) => {
      this.onMouseUp(e);
    });
  }

  /**
   * reset
   */
  reset() {
    if (self.boundaryDetectionHandler) {
      cancelAnimationFrame(self.boundaryDetectionHandler);
      self.boundaryDetectionHandler = null;
    }

    this.capture = false;
    if (this.cur) {
      this.cur.reset();
    }
    this.cur = null;
  }

  /**
   * init
   */
  init() {
    // this.ins.clear();
    const els = Array.from(this.el.querySelectorAll(`.${selectorPrefix}-item`));
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!this.ins.get(el)) {
        this.ins.set(el, new Resizeable(el, this.config, this, i));
      }
    }

    const keys = this.ins.keys();
    for (const key in keys) {
      if (els.indexOf(key) === -1) {
        this.ins.delete(key);
      }
    }
  }

  /**
   * getResize
   * @param {HTMLElement} - el
   * @return {Resizeable}
   */
  getResize(el) {
    return this.ins.get(el);
  }

  /**
   * refresh
   */
  refresh() {
    this.init();
  }

  /**
   * setScale
   * @param {Number} - scale
   */
  setScale(scale) {
    this.scale = scale;
  }

  /**
   * setDisable
   * @param {Boolean} - disable
   * @param {Boolean} - cascade 是否级联操作
   */
  setDisable(disable, cascade = true) {
    this.disable = disable;
    if (cascade) {
      this.ins.forEach((t) => {
        t.setDisable(disable);
      });
    }
  }
}

/**
 * ResizeableGroupManager
 * @class ResizeableGroupManager
 * @classdesc ResizeableGroupManager
 */
class ResizeableGroupManager {
  /**
   * constructor
   * @param {HTMLElement} - el
   * @param {Object} - config
   */
  constructor(el, config) {
    this.el = el;
    this.config = Object.assign({}, config);
    this.resizeManager = new Map();
    this.init();
  }

  /**
   * init
   */
  init() {
    // this.resizeManager.clear();
    const resizeableEls = Array.from(this.el.querySelectorAll(`.${selectorPrefix}`));
    for (let i = 0; i < resizeableEls.length; i++) {
      const el = resizeableEls[i];
      if (!this.resizeManager.get(el)) {
        this.resizeManager.set(el, new ResizeableGroup(el, this.config));
      }
    }

    const keys = this.resizeManager.keys();
    for (const key in keys) {
      if (resizeableEls.indexOf(key) === -1) {
        this.resizeManager.delete(key);
      }
    }
  }

  /**
   * getGroup
   * @param {HTMLElement} - groupEl
   * @return {ResizeableGroup}
   */
  getGroup(groupEl) {
    return this.resizeManager.get(groupEl);
  }

  /**
   * refresh
   */
  refresh() {
    this.init();
  }

  /**
   * setScale
   * @param {Number} - scale
   */
  setScale(scale) {
    this.resizeManager.forEach((t) => {
      t.setScale(scale);
    });
  }

  /**
   * setDisable
   * @param {Boolean} - disable
   * @param {Boolean} - cascade 是否是级联操作
   */
  setDisable(disable, cascade = true) {
    this.resizeManager.forEach((t) => {
      t.setDisable(disable, cascade);
    });
  }
}

/**
 * ResizeableFactory
 */
const ResizeableFactory = {
  /**
   * 创建一个Resizeable
   * @param {HTMLElement} - el
   * @param {Object} - config
   * @return {ResizeableGroupManager} - ResizeableGroupManager
   */
  create(el, config) {
    return new ResizeableGroupManager(el, config);
  },
};

export default ResizeableFactory;
