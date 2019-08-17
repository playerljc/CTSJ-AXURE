/**
 配置:
 el
 {
   direction: [horizontal(横) | vertical(竖)]
   step: 1 步进(没实现)
   minBlankWidth: Number 横向最小留白距离 默认30
   minBlankHeight: Number 纵向最小留白距离 默认30
   onCanMove: Function 可以进行拖动
   onMove: Function  拖动中
   onSuccess: Function 拖动结束
   onStart Function
 }

 布局:
 <div class="ct-split">
   <div class="ct-split-main"></div>
   <div class="ct-split-left"></div>
   <div class="ct-split-right"></div>
 </div>

 <div class="ct-split">
   <div class="ct-split-main"></div>
   <div class="ct-split-top"></div>
   <div class="ct-split-bottom"></div>
 </div>

 功能:

 测试:

 log:

 demo:
 * */
import { Dom6 } from '../../../util/CTMobile-UI-Util';
import './split.less';

const selectorPrefix = 'ct-split';
// 边缘的步进
const edgeStep = 5;

// 最小宽度
const minWidth = 30;
// 最小高度
const minHeight = 30;

/**
 * initVar
 * @access private
 */
function initVar() {
  const { minBlankWidth = minWidth, minBlankHeight = minHeight } = this.config;

  this.disable = false;
  // 是否可以resize
  this.isCanResize = false;
  // 是否down
  this.isDown = false;
  // 是否移动
  this.isMove = false;
  // down的原点
  this.baseX = null;
  this.baseY = null;
  // 移动的值
  this.moveValue = null;

  // el的baseWith
  this.baseWidth = this.el.offsetWidth;
  // el的baseHeight
  this.baseHeight = this.el.offsetHeight;
  // 左侧的临界值
  this.leftCritical = -this.baseWidth + minBlankWidth;
  // 右侧的临界值
  this.rightCritical = this.baseWidth - minBlankWidth;
  // 上方的临界值
  this.topCritical = -this.baseHeight + minBlankHeight;
  // 下方的临界值
  this.bottomCritical = this.baseHeight - minBlankHeight;
  // 方向
  this.direction = null;

  const children = Array.from(this.el.children);
  this.mainEl = find(children, `${selectorPrefix}-main`);
  this.leftEl = find(children, `${selectorPrefix}-left`);
  this.rightEl = find(children, `${selectorPrefix}-right`);
  this.topEl = find(children, `${selectorPrefix}-top`);
  this.bottomEl = find(children, `${selectorPrefix}-bottom`);
}

/**
 * initDirection
 * @access private
 */
function initDirection() {
  // [horizontal(横) | vertical(竖)]
  const { direction = 'horizontal' } = this.config;
  if (direction === 'vertical') {
    this.el.style.flexDirection = 'column';
  }
}

/**
 * find
 * @param {Array} - collections
 * @param {String} - selector
 * @return {HTMLElement}
 */
function find(collections = [], selector) {
  let el;
  for (let i = 0; i < collections.length; i++) {
    if (collections[i].classList.contains(selector)) {
      el = collections[i];
      break;
    }
  }
  return el;
}

/**
 * initOrder
 * @access private
 */
function initOrder() {
  let order = 0;
  const { direction = 'horizontal' } = this.config;
  if (direction === 'horizontal') {
    if (this.leftEl) {
      this.leftEl.style.order = order++;
    }

    if (this.mainEl) {
      this.mainEl.style.order = order++;
    }

    if (this.rightEl) {
      this.rightEl.style.order = order++;
    }
  } else if (direction === 'vertical') {
    if (this.topEl) {
      this.topEl.style.order = order++;
    }

    if (this.mainEl) {
      this.mainEl.style.order = order++;
    }

    if (this.bottomEl) {
      this.bottomEl.style.order = order++;
    }
  }
}

/**
 * initDimension
 * @access private
 */
function initDimension() {
  // clientX
  this.clientX = this.mainEl.offsetLeft;
  // clientY
  this.clientY = this.mainEl.offsetTop;

  this.mainWith = this.mainEl.offsetWidth;
  this.mainHeight = this.mainEl.offsetHeight;

  if (this.leftEl) {
    this.leftWidth = this.leftEl.offsetWidth;
    this.leftHeight = this.leftEl.offsetHeight;
  }

  if (this.rightEl) {
    this.rightWidth = this.rightEl.offsetWidth;
    this.rightHeight = this.rightEl.offsetHeight;
  }

  if (this.topEl) {
    this.topWidth = this.topEl.offsetWidth;
    this.topHeight = this.topEl.offsetHeight;
  }

  if (this.bottomEl) {
    this.bottomWidth = this.bottomEl.offsetWidth;
    this.bottomHeight = this.bottomEl.offsetHeight;
  }
}

/**
 * initEvents
 * @access private
 */
function initEvents() {
  /**
   * mainEl mousedown
   */
  this.mainEl.addEventListener('mousedown', this.onMainMouseDown);

  /**
   * mainEl mousemove
   */
  this.mainEl.addEventListener('mousemove', this.onMainMouseMove);

  /**
   * mainEl mouseleave
   */
  this.mainEl.addEventListener('mouseleave', this.onMainMouseLeave);

  /**
   * el mousemove
   */
  this.el.addEventListener('mousemove', this.onElMouseMove);

  /**
   * el mouseup
   */
  this.el.addEventListener('mouseup', this.onElMouseUp);
}

/**
 * createSeparator
 * @access private
 */
function createSeparator() {
  const { direction = 'horizontal' } = this.config;
  this.separatorEl = Dom6.createElement(`<div class="${selectorPrefix}-separator ${direction}"></div>`);
  this.mainEl.appendChild(this.separatorEl);
}

/**
 * reset
 * @access private
 */
function reset() {
  document.body.style.cursor = 'default';
  const { minBlankWidth = minWidth, minBlankHeight = minHeight } = this.config;
  // 连续点击时候的处理
  if (this.isDown && this.isCanResize && !this.ismove) {
    this.isCanResize = true;
  } else {
    this.isCanResize = false;
    this.direction = null;
  }

  // 是否down
  this.isDown = false;
  this.ismove = false;
  // down的原点
  this.baseX = null;
  this.baseY = null;
  this.moveValue = null;

  // el的baseWith
  this.baseWidth = this.el.offsetWidth;
  // el的baseHeight
  this.baseHeight = this.el.offsetHeight;
  // 左侧的临界值
  this.leftCritical = -this.baseWidth + minBlankWidth;
  // 右侧的临界值
  this.rightCritical = this.baseWidth - minBlankWidth;
  // 上方的临界值
  this.topCritical = -this.baseHeight + minBlankHeight;
  // 下方的临界值
  this.bottomCritical = this.baseHeight - minBlankHeight;
  this.separatorEl.style.display = 'none';
  initDimension.call(this);
}

/**
 * getMoveValue
 * @param {Number} - min
 * @param {Number} - max
 * @param {Number} - val
 * @return {Number}
 */
function getMoveValue({ min, max, val }) {
  const { minBlankWidth = minWidth, minBlankHeight = minHeight } = this.config;
  const { direction = 'horizontal' } = this.config;
  const { direction: selfDirection = '' } = this;
  return val <= min ?
    min + (
      selfDirection === 'left' || selfDirection === 'top' ?
        (direction === 'horizontal' ? minBlankWidth : minBlankHeight) : 0
    )
    : (
      val >= max ?
        max - (
          selfDirection === 'right' || selfDirection === 'bottom' ?
            (direction === 'horizontal' ? minBlankWidth : minBlankHeight) : 0
        ) :
        val
    );
}

/**
 * Split
 * @class Split
 * @classdesc Split
 */
class Split {
  /**
   * constructor
   * @constructor
   * @param {HTMLElement} - el
   * @param {Object} - config
   */
  constructor(el, config) {
    this.el = el;
    this.config = Object.assign({
      minBlankWidth: minWidth,
      minBlankHeight: minHeight,
    }, config);
    this.disable = false;

    this.onMainMouseDown = this.onMainMouseDown.bind(this);
    this.onMainMouseMove = this.onMainMouseMove.bind(this);
    this.onMainMouseLeave = this.onMainMouseLeave.bind(this);
    this.onElMouseMove = this.onElMouseMove.bind(this);
    this.onElMouseUp = this.onElMouseUp.bind(this);

    initVar.call(this);
    initDirection.call(this);
    initOrder.call(this);
    initEvents.call(this);
    initDimension.call(this);
    createSeparator.call(this);

    this.mainEl.style.minWidth = `${this.config.minBlankWidth}px`;
    this.mainEl.style.minHeight = `${this.config.minBlankHeight}px`;
  }

  /**
   * onMainMouseDown
   * @param {MouseEvent} - e
   */
  onMainMouseDown(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;

    if (!self.isCanResize) {
      return false;
    }

    // console.log('mousedown', self.config.direction);

    const { onStart } = self.config;
    if (onStart) {
      onStart();
    }

    self.isDown = true;
    self.baseX = e.clientX;
    self.baseY = e.clientY;

    self.separatorEl.style.display = 'block';

    if (self.direction === 'left') {
      self.separatorEl.style.left = '0';
    } else if (self.direction === 'right') {
      self.separatorEl.style.left = `${self.mainWith}px`;
    } else if (self.direction === 'top') {
      self.separatorEl.style.top = '0';
    } else if (self.direction === 'bottom') {
      self.separatorEl.style.top = `${self.mainHeight}px`;
    }
  }

  /**
   * onMainMouseMove
   * @param {MouseEvent} - e
   */
  onMainMouseMove(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;

    const { direction = 'horizontal', onCanMove } = self.config;

    // 开启拖动模式
    if (self.isCanResize && self.isDown) {
      // el的mousemove不处理，放parent的mousemove处理
      return false;
    }

    // console.log('mainmousemove', direction);

    self.mainRect = self.mainEl.getBoundingClientRect();

    const { clientX, clientY } = e;

    if (clientX - edgeStep <= self.mainRect.left &&
      clientY - edgeStep > self.mainRect.top &&
      clientY + edgeStep < self.mainRect.bottom) {
      if (direction === 'horizontal') {
        e.stopPropagation();
        if (!self.leftEl) return false;
        self.direction = 'left';
        self.isCanResize = true;
        document.body.style.cursor = 'col-resize';
        if (onCanMove) onCanMove(self.direction);
        // console.log(direction, 'left');
      }
    } else if (clientX + edgeStep >= self.mainRect.right &&
      clientY - edgeStep > self.mainRect.top &&
      clientY + edgeStep < self.mainRect.bottom) {
      if (direction === 'horizontal') {
        e.stopPropagation();
        if (!self.rightEl) return false;
        self.direction = 'right';
        self.isCanResize = true;
        document.body.style.cursor = 'col-resize';
        if (onCanMove) onCanMove(self.direction);
        // console.log(direction, 'right');
      }
    } else if (clientY - edgeStep <= self.mainRect.top &&
      clientX - edgeStep > self.mainRect.left &&
      clientX + edgeStep < self.mainRect.right) {
      if (direction === 'vertical') {
        e.stopPropagation();
        if (!self.topEl) return false;
        self.direction = 'top';
        self.isCanResize = true;
        document.body.style.cursor = 'row-resize';
        if (onCanMove) onCanMove(self.direction);
        // console.log(direction, 'top', document.body.style.cursor);
      }
    } else if (clientY + edgeStep >= self.mainRect.bottom &&
      clientX - edgeStep > self.mainRect.left &&
      clientX + edgeStep < self.mainRect.right) {
      if (direction === 'vertical') {
        e.stopPropagation();
        if (!self.bottomEl) return false;
        self.direction = 'bottom';
        self.isCanResize = true;
        document.body.style.cursor = 'row-resize';
        if (onCanMove) onCanMove(self.direction);
        // console.log(direction, 'bottom');
      }
    } else {
      // e.stopPropagation();
      self.isCanResize = false;
      document.body.style.cursor = 'default';
      // console.log(direction, 'default', document.body.style.cursor);
    }
  }

  /**
   * onMainMouseLeave
   * @param {MouseEvent} - e
   */
  onMainMouseLeave(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;

    // 开启拖动模式
    if (self.isCanResize && self.isDown) {
      // el的mousemove不处理，放parent的mousemove处理
      return false;
    }

    document.body.style.cursor = 'default';
    // console.log('mouseleave', document.body.style.cursor);
    e.stopPropagation();
  }

  /**
   * onElMouseMove
   * @param {MouseEvent} - e
   */
  onElMouseMove(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;

    // console.log('elmousemove', self.config.direction);

    if (!(self.isCanResize && self.isDown)) {
      self.separatorEl.style.display = 'none';
      return false;
    }

    const { direction, onMove, minBlankWidth = minWidth, minBlankHeight = minHeight } = self.config;

    if (direction === 'horizontal') {
      document.body.style.cursor = 'col-resize';
    } else if (direction === 'vertical') {
      document.body.style.cursor = 'row-resize';
    }

    self.isMove = true;
    const { clientX, clientY } = e;

    const left = clientX - self.baseX;
    const top = clientY - self.baseY;

    let value;

    if (self.direction === 'left') {
      value = left;
      if (value < -self.leftWidth || value > self.mainWith - minBlankWidth) {
        if (value < -self.leftWidth) {
          value = -self.leftWidth;
        }

        if (value > self.mainWith - minBlankWidth) {
          value = self.mainWith - minBlankWidth;
        }
      }
      self.separatorEl.style.left = `${value}px`;
    } else if (self.direction === 'right') {
      value = self.mainWith + left;
      if (value < minBlankWidth || value > self.mainWith + self.rightWidth) {
        if (value < minBlankWidth) {
          value = minBlankWidth;
        }

        if (value > self.mainWith + self.rightWidth) {
          value = self.mainWith + self.rightWidth;
        }
      }

      self.separatorEl.style.left = `${value}px`;
    } else if (self.direction === 'top') {
      value = top;
      if (value < -self.topHeight || value > self.mainHeight - minBlankHeight) {
        if (value < -self.topHeight) {
          value = -self.topHeight;
        }

        if (value > self.mainHeight - minBlankHeight) {
          value = self.mainHeight - minBlankHeight;
        }
      }
      self.separatorEl.style.top = `${value}px`;
    } else if (self.direction === 'bottom') {
      value = self.mainEl.offsetHeight + top;
      if (value < minBlankHeight || value > self.mainHeight + self.bottomHeight) {
        if (value < minBlankHeight) {
          value = minBlankHeight;
        }

        if (value > self.mainHeight + self.bottomHeight) {
          value = self.mainHeight + self.bottomHeight;
        }
      }
      self.separatorEl.style.top = `${value}px`;
    }

    self.moveValue = value;

    if (onMove) onMove(self.direction, self.moveValue);

    e.stopPropagation();
  }

  /**
   * onElMouseUp
   */
  onElMouseUp() {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;


    if (!(self.isCanResize && self.isDown && self.isMove)) {
      reset.call(self);
      return false;
    }

    const { onSuccess, minBlankWidth = minWidth, minBlankHeight = minHeight } = self.config;

    if (self.direction === 'left') {
      // moveValue min -leftElWidth  max +mainWidth
      const moveValue = getMoveValue.call(self, {
        min: -self.leftEl.offsetWidth,
        max: self.mainEl.offsetWidth - minBlankWidth,
        val: self.moveValue });
      self.leftEl.style.width = `${self.leftEl.offsetWidth + moveValue}px`;
    } else if (self.direction === 'right') {
      // moveValue min 0 max mainWidth + rightWidth
      const moveValue = getMoveValue.call(self, {
        min: minBlankWidth,
        max: self.mainEl.offsetWidth + self.rightEl.offsetWidth,
        val: self.moveValue,
      });
      self.rightEl.style.width = `${self.rightEl.offsetWidth - (moveValue - self.mainEl.offsetWidth)}px`;
    } else if (self.direction === 'top') {
      // moveValue min -topElHeight   max +mainHeight
      const moveValue = getMoveValue.call(self, {
        min: -self.topEl.offsetHeight,
        max: self.mainEl.offsetHeight - minBlankHeight,
        val: self.moveValue,
      });
      self.topEl.style.height = `${self.topEl.offsetHeight + moveValue}px`;
    } else if (self.direction === 'bottom') {
      // moveValue min 0  max mainHeght+bottomHeight
      const moveValue = getMoveValue.call(self, {
        min: minBlankHeight,
        max: self.mainEl.offsetHeight + self.bottomEl.offsetHeight,
        val: self.moveValue,
      });
      self.bottomEl.style.height = `${self.bottomEl.offsetHeight - (moveValue - self.mainEl.offsetHeight)}px`;
    }

    reset.call(self);

    if (onSuccess) onSuccess();
  }

  /**
   * setDisable
   * @param {Boolean} - disable
   */
  setDisable(disable) {
    this.disable = disable;
  }
}


/**
 * SplitFactory
 */
const SplitFactory = {
  /**
   * 创建一个Split
   * @param {HTMLElement} - el
   * @param {Object} - config
   * @return {Split}
   */
  create(el, config) {
    return new Split(el, config);
  },
};

export default SplitFactory;
