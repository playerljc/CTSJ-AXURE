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
const minWidth = 2;
// 最小高度
const minHeight = 2;
const scrollStep = 5;

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
   * @param {SelectOptions} - index
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

    if (clientX - edgeStep <= self.rect.left &&
      clientY - edgeStep > self.rect.top &&
      clientY + edgeStep < self.rect.bottom) {
      this.triggerResizeOption('left');
    } else if (clientX + edgeStep >= self.rect.right &&
      clientY - edgeStep > self.rect.top &&
      clientY + edgeStep < self.rect.bottom) {
      this.triggerResizeOption('right');
    } else if (clientX - edgeStep <= self.rect.left &&
      clientY - edgeStep <= self.rect.top) {
      this.triggerResizeOption('lefttop');
    } else if (clientX - edgeStep <= self.rect.left &&
      clientY + edgeStep >= self.rect.bottom) {
      this.triggerResizeOption('leftbottom');
    } else if (clientX + edgeStep >= self.rect.right &&
      clientY - edgeStep <= self.rect.top) {
      this.triggerResizeOption('righttop');
    } else if (clientX + edgeStep >= self.rect.right &&
      clientY + edgeStep >= self.rect.bottom) {
      this.triggerResizeOption('rightbottom');
    } else if (clientY - edgeStep <= self.rect.top &&
      clientX - edgeStep > self.rect.left &&
      clientX + edgeStep < self.rect.right) {
      this.triggerResizeOption('top');
    } else if (clientY + edgeStep >= self.rect.bottom &&
      clientX - edgeStep > self.rect.left &&
      clientX + edgeStep < self.rect.right) {
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
    // console.log(this.id, this.disable);
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

    this.scrollEl = this.el.parentElement;
    this.scrollElRect = this.scrollEl.getBoundingClientRect();
    this.scrollElWidth = this.scrollEl.offsetWidth;
    this.scrollElHeight = this.scrollEl.offsetHeight;

    this.isBoundaryDetectionHandler = false;

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

    // console.log('resizegroup', 'mouse');

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

    if (clientX <= self.scrollElRect.left) {
      condition.left = true;
    }

    if (clientX >= self.scrollElRect.right - 20) {
      condition.right = true;
    }

    if (clientY <= self.scrollElRect.top) {
      condition.top = true;
    }

    if (clientY >= self.scrollElRect.bottom - 20) {
      condition.bottom = true;
    }


    const incrementWidth = clientX - self.cur.baseX;
    const incrementHeight = clientY - self.cur.baseY;

    const left = self.cur.clientX;
    const top = self.cur.clientY;

    if (self.cur.direction === 'right') {
      self.resizeRightDetail(incrementWidth);
    } else if (self.cur.direction === 'left') {
      self.resizeLeftDetail({ incrementWidth, left });
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

      self.isBoundaryDetectionHandler = true;
      self.boundaryDetectionScroll(condition);
    }
  }

  /**
   * onMouseUp
   * @return {boolean}
   */
  onMouseUp() {
    const self = this;

    const { disable = false } = self;

    if (disable) return false;

    if (!(self.cur && self.cur.isCanResize && self.cur.isDown)) {
      return false;
    }

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

    const curElRect = self.cur.el.getBoundingClientRect();

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

    self.boundaryDetectionHandler = requestAnimationFrame(() => {
      self.boundaryDetectionScroll(condition);
    });
  }

  /**
   * resizeLeftDetail
   * @param {SelectOptions} - incrementWidth
   * @param {SelectOptions} - left
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

    if (computeLeft >= 0) {
      self.cur.el.style.width = `${computeWidth}px`;
      self.cur.el.style.left = `${computeLeft}px`;
    }
  }

  /**
   * resizeRightDetail
   * @param {SelectOptions} - incrementWidth
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
   * @param {SelectOptions} - incrementHeight
   * @param {SelectOptions} - top
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
    if (computeTop >= 0) {
      self.cur.el.style.height = `${computeHeight}px`;
      self.cur.el.style.top = `${computeTop}px`;
    }
  }

  /**
   * resizeBottomDetail
   * @param {SelectOptions} - incrementHeight
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
  }

  /**
   * reset
   */
  reset() {
    if (self.boundaryDetectionHandler) {
      cancelAnimationFrame(self.boundaryDetectionHandler);
      self.boundaryDetectionHandler = null;
    }

    this.isBoundaryDetectionHandler = false;

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
    const els = this.el.querySelectorAll(`.${selectorPrefix}-item`);
    this.ins.clear();
    for (let i = 0; i < els.length; i++) {
      this.ins.set(els[i], new Resizeable(els[i], this.config, this, i));
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
    this.resizeManager.clear();
    const resizeableEls = this.el.querySelectorAll(`.${selectorPrefix}`);
    for (let i = 0; i < resizeableEls.length; i++) {
      this.resizeManager.set(resizeableEls[i], new ResizeableGroup(resizeableEls[i], this.config));
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
