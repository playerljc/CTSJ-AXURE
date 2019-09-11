/**

 配置:
 el
 {
  mode: [normal(正常模式) | clone(克隆模式)]
  cloneClasses: mode为clone时移动节点的样式
  showMap: [Boolean] 是否显示地图
  moveStep: [number] 移动的步进 默认值1
  showGuide: [Boolean] 是否显示辅助线 (没实现)
  showStaff: [Boolean] 是否显示标尺 (没实现)
  infinite: [Boolean] 是否是无限拖动
  onStart: Function
  onEnd: Function
  onClick: Function
 }

 布局:
 <div class="ct-drag">
 <div class="ct-drag-item"></div>
 </div>

 功能:
 .拖拽移动一个元素
 .正常拖拽
 .clone的拖拽
 .拖拽中地图的显示
 .辅助线
 .触发的事件

 测试:

 log:

 demo:

 */
import { Dom6 } from '../../../util/CTMobile-UI-Util';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';
import './drag.less';

const selectorPrefix = 'ct-drag';

const scrollStep = 5;

const edgeWidth = 10;

const scrollWidth = 20;

/**
 * getDragTarget
 * @param {HTMLElement} - el
 * @return {HTMLElement}
 */
function getDragTarget(el) {
  if (el.classList.contains(`${selectorPrefix}-item`)) {
    return el;
  }

  const targetEl = Dom6.getTopDom(el, `${selectorPrefix}-item`);
  return targetEl;
}

/**
 * createCloneEl
 * @param {HTMLElement} - sourceEl
 * @access private
 */
function createCloneEl(sourceEl) {
  const self = this;
  const { cloneClasses = [] } = self.config;
  const cloneClassNames = cloneClasses.join(' ');
  self.sourceEl = Dom6.createElement(`<div class="${selectorPrefix}-clone ${cloneClassNames}"></div>`);
  self.sourceEl.style.width = `${sourceEl.offsetWidth}px`;
  self.sourceEl.style.height = `${sourceEl.offsetHeight}px`;
  const computedStyle = window.getComputedStyle(sourceEl);
  self.sourceEl.style.left = computedStyle.left;
  self.sourceEl.style.top = computedStyle.top;
  self.sourceEl.style.zIndex = `${window.parseInt(getMaxLevelNumber()) + 1}`;
  self.el.appendChild(self.sourceEl);
}

/**
 * createMapEl
 * @access private
 * @return {HTMLElement}
 */
function createMapEl() {
  const mapEl = Dom6.createElement(`<div class="${selectorPrefix}-map"></div>`);
  this.el.appendChild(mapEl);
  return mapEl;
}

/**
 * setMapPosition
 * @param {number} - left
 * @param {number} - top
 * @param {number} - width
 * @param {number} - height
 * @param {Boolean} - isRightEdge
 */
function setMapPosition(/* { left, top, width, height } */config, isRightEdge = false) {
  const { left, top, width, height } = config;

  if ('left' in config && 'top' in config && 'width' in config && 'height' in config) {
    this.mapEl.innerHTML = `
    <table>
      <tr>
        <td>x:${Math.floor(left)}</td>
        <td>y:${Math.floor(top)}</td>
      </tr>
      <tr>
        <td>w:${width}</td>
        <td>h:${height}</td>
      </tr>
    </table>
  `;
  }

  if ('left' in config && 'width' in config) {
    if (isRightEdge) {
      this.mapEl.style.left = `${left - this.mapEl.offsetWidth - 10}px`;
    } else {
      this.mapEl.style.left = `${left + width + 10}px`;
    }
  }

  if ('top' in config && 'height' in config) {
    this.mapEl.style.top = `${top + (height - this.mapEl.offsetHeight)}px`;
  }
}

/**
 * stepDetail
 * @param {Number} - pageX
 * @param {Number} - pageY
 * @return {Object}
 * @access private
 */
function stepDetail({ pageX, pageY }) {
  const self = this;
  const { moveStep: step = 1 } = self.config;

  let curX = pageX;
  let curY = pageY;

  // 位移
  const displacementX = Math.abs(curX - self.preX);
  const displacementY = Math.abs(curY - self.preY);

  // x,y段
  const segmentX = Math.floor(displacementX / step);
  const segmentY = Math.floor(displacementY / step);

  // 距离
  const distanceX = segmentX * step;
  const distanceY = segmentY * step;

  // X方向
  if (curX > self.preX) {
    // ->
    curX = self.preX + distanceX;
  } else {
    // <-
    curX = self.preX - distanceX;
  }
  self.preX = curX;

  // Y方向
  if (curY > self.preY) {
    // ->
    curY = self.preY + distanceY;
  } else {
    // <-
    curY = self.preY - distanceY;
  }
  self.preY = curY;

  return {
    curX,
    curY,
  };
}

/**
 * mouseupDetail
 * @access private
 */
function mouseupDetail() {
  const self = this;
  const { mode = 'normal', showMap = false } = self.config;
  // 如果model是clone时
  if (mode === 'clone' && self.srcEl && self.sourceEl) {
    if (self.ismove && (self.endTime - self.startTime >= 200)) {
      self.srcEl.style.left = self.sourceEl.style.left;
      self.srcEl.style.top = self.sourceEl.style.top;
    }
    self.sourceEl.parentElement.removeChild(self.sourceEl);
  }

  if (showMap && self.mapEl) {
    self.mapEl.parentElement.removeChild(self.mapEl);
  }
}

/**
 * 到达边缘的无限滚动
 * boundaryDetectionScroll
 * @param {Object} - condition
 * @access private
 */
function boundaryDetectionScroll(condition) {
  const self = this;

  const { top, bottom, left, right } = condition;

  const { showMap = true } = self.config;

  if (top) {
    if (self.scrollEl.scrollTop !== 0) {
      if (self.scrollEl.scrollTop - scrollStep < 0) {
        self.scrollEl.scrollTop = 0;
      } else {
        self.scrollEl.scrollTop -= scrollStep;
        const scrollTop = self.scrollEl.scrollTop;
        self.sourceEl.style.top = `${self.scrollEl.scrollTop}px`;
        if (showMap) {
          setMapPosition.call(self, {
            top: scrollTop,
            height: self.sourceElHeight,
          });
        }
      }
    }
  }

  if (bottom) {
    if (self.scrollEl.scrollTop !== self.scrollEl.scrollHeight) {
      if (self.scrollEl.scrollTop + scrollStep > self.scrollEl.scrollHeight) {
        self.scrollEl.scrollTop = self.scrollEl.scrollHeight;
      } else {
        self.scrollEl.scrollTop += scrollStep;
        const scrollElHeight = self.scrollEl.scrollTop + self.scrollElHeight;
        self.sourceEl.style.top = `${scrollElHeight - self.sourceElHeight}px`;
        if (showMap) {
          setMapPosition.call(self, {
            top: scrollElHeight - self.sourceElHeight,
            height: self.sourceElHeight,
          });
        }
      }
    }
  }

  if (left) {
    if (self.scrollEl.scrollLeft !== 0) {
      if (self.scrollEl.scrollLeft - scrollStep < 0) {
        self.scrollEl.scrollLeft = 0;
      } else {
        self.scrollEl.scrollLeft -= scrollStep;
        const scrollLeft = self.scrollEl.scrollLeft;
        self.sourceEl.style.left = `${scrollLeft}px`;
        if (showMap) {
          setMapPosition.call(self, {
            left: scrollLeft,
            width: self.sourceElWidth,
          });
        }
      }
    }
  }

  if (right) {
    if (self.scrollEl.scrollLeft !== self.scrollEl.scrollWidth) {
      if (self.scrollEl.scrollLeft + scrollStep > self.scrollEl.scrollWidth) {
        self.scrollEl.scrollLeft = self.scrollEl.scrollWidth;
      } else {
        self.scrollEl.scrollLeft += scrollStep;
        const scrollElWidth = self.scrollEl.scrollLeft + self.scrollElWidth;
        self.sourceEl.style.left = `${scrollElWidth - self.sourceElWidth}px`;
        if (showMap) {
          setMapPosition.call(self, {
            left: scrollElWidth - self.sourceElWidth,
            width: self.sourceElWidth,
          }, true);
        }
      }
    }
  }

  self.boundaryDetectionHandler = requestAnimationFrame(() => {
    boundaryDetectionScroll.call(self, condition);
  });
}

/**
 * initEvents
 * @access private
 */
function initEvents() {
  const self = this;
  Dom6.off(self.el, 'drag', 'mousedown');
  Dom6.on(self.el, 'drag', 'mousedown', self.onMousedown);

  Dom6.off(self.el, 'drag', 'mouseup');
  Dom6.on(self.el, 'drag', 'mouseup', self.onMouseup);

  Dom6.off(self.el, 'drag', 'mousemove');
  Dom6.on(self.el, 'drag', 'mousemove', self.onMousemove);

  Dom6.off(self.el, 'drag', 'mouseleave');
  Dom6.on(self.el, 'drag', 'mouseleave', (e) => {
    self.onMouseup(e);
  });
}

/**
 * reset
 * @access private
 */
function reset() {
  if (self.boundaryDetectionHandler) {
    cancelAnimationFrame(self.boundaryDetectionHandler);
    self.boundaryDetectionHandler = null;
  }

  this.isdown = false; // 是否按下了
  this.ismove = false; // 是否move了
  this.sourceEl = null;
  this.sourceElWidth = null;
  this.sourceElHeight = null;
  this.srcEl = null;
  this.mouseenterEl = null;
  this.mapEl = null;
  this.baseX = null;
  this.baseY = null;
  this.firstX = null;
  this.firstY = null;
  this.preX = null;
  this.preY = null;
}

/**
 * Drag
 * @class Drag
 * @classdesc Drag
 */
class Drag {
  /**
   * constructor
   * @constructor
   * @param {HTMLElement} - el
   * @param {Object} - config
   */
  constructor(el, config) {
    this.el = el;
    this.config = Object.assign({}, config);

    this.disable = false;

    this.onMousedown = this.onMousedown.bind(this);
    this.onMousemove = this.onMousemove.bind(this);
    this.onMouseup = this.onMouseup.bind(this);

    if (this.config.infinite) {
      this.scrollEl = this.el.parentElement;
      this.scrollElWidth = this.scrollEl.offsetWidth;
      this.scrollElHeight = this.scrollEl.offsetHeight;
      this.scrollElRect = this.scrollEl.getBoundingClientRect();
    }

    this.isdown = false; // 是否按下了
    this.ismove = false; // 是否move了
    this.sourceEl = null;
    this.sourceElWidth = null;
    this.sourceElHeight = null;
    this.srcEl = null;
    this.mouseenterEl = null;
    this.baseX = null;
    this.baseY = null;
    this.firstX = null;
    this.firstY = null;
    this.preX = null;
    this.preY = null;
    this.boundaryDetectionHandler = null;

    initEvents.call(this);
  }

  /**
   * onMousedown
   */
  onMousedown(e) {
    const self = this;

    const { disable = false } = self;

    if (disable) return false;

    const sourceEl = getDragTarget(e.target);
    if (!sourceEl) return false;

    e.preventDefault();
    e.stopPropagation();

    const { onStart, infinite = false } = self.config;
    if (onStart) {
      onStart(self.el, sourceEl);
    }

    self.startTime = new Date().getTime();
    self.isdown = true;

    const { mode = 'normal' } = self.config;
    if (mode === 'normal') {
      self.sourceEl = sourceEl;
    } else {
      // mode === 'clone'
      self.srcEl = sourceEl;
      // create clone element
      createCloneEl.call(self, sourceEl);
    }

    self.sourceElWidth = sourceEl.offsetWidth;
    self.sourceElHeight = sourceEl.offsetHeight;

    // 在parent里移动
    const sourceElRect = sourceEl.getBoundingClientRect();
    const containerElReact =
      !infinite ?
        self.el.getBoundingClientRect() :
        self.scrollEl.getBoundingClientRect();
    self.baseX = sourceElRect.left - containerElReact.left;
    self.baseY = sourceElRect.top - containerElReact.top;
    self.firstX = e.pageX;
    self.firstY = e.pageY;
    self.preX = e.pageX;
    self.preY = e.pageY;
  }

  /**
   * onMousemove
   */
  onMousemove(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) {
      return false;
    }

    e.preventDefault();
    e.stopPropagation();

    // 没有按下的时候
    if (!self.isdown) {
      // 在目标上移动
      const sourceEl = getDragTarget(e.target);
      if (sourceEl) {
        self.mouseenterEl = sourceEl;
        document.body.style.cursor = 'move';
      } else if (self.mouseenterEl) {
        document.body.style.cursor = 'default';
        self.mouseenterEl = null;
      }

      return false;
    }

    // 按下之后
    document.body.style.cursor = 'move';

    const curPoint = stepDetail.call(self, { pageX: e.pageX, pageY: e.pageY });
    const { curX, curY } = curPoint;

    if (!self.ismove) {
      self.ismove = true;
    }

    const { showMap = false } = self.config;
    if (showMap && !self.mapEl) {
      self.mapEl = createMapEl.call(self);
    }

    self.sourceEl.style.display = 'block';

    const incrementX = curX - self.firstX;
    const incrementY = curY - self.firstY;

    const left = self.baseX + incrementX;
    const top = self.baseY + incrementY;

    let computeLeft;
    let computeTop;

    const { infinite = false } = self.config;
    if (!infinite) {
      computeLeft = left;
      computeTop = top;
      self.sourceEl.style.left = `${computeLeft}px`;
      self.sourceEl.style.top = `${computeTop}px`;
    } else {
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

      const { clientX, clientY } = e;

      if (clientX <= self.scrollElRect.left + edgeWidth ||
        clientX >= self.scrollElRect.right - (edgeWidth + scrollWidth)
      ) {
        if (clientX <= self.scrollElRect.left + edgeWidth) {
          computeLeft = self.scrollEl.scrollLeft;
          condition.left = true;
        }

        if (clientX >= self.scrollElRect.right - (edgeWidth + scrollWidth)) {
          computeLeft = self.scrollEl.scrollLeft + self.scrollElWidth - self.sourceElWidth;
          condition.right = true;
        }
      } else {
        computeLeft = self.scrollEl.scrollLeft + left;
      }

      if (clientY <= self.scrollElRect.top + edgeWidth ||
        clientY >= self.scrollElRect.bottom - (edgeWidth + scrollWidth)
      ) {
        if (clientY <= self.scrollElRect.top + edgeWidth) {
          computeTop = self.scrollEl.scrollTop;
          condition.top = true;
        }

        if (clientY >= self.scrollElRect.bottom - (edgeWidth + scrollWidth)) {
          computeTop = self.scrollEl.scrollTop + self.scrollElHeight - self.sourceElHeight;
          condition.bottom = true;
        }
      } else {
        computeTop = self.scrollEl.scrollTop + top;
      }

      // if (left < 0 ||
      //   left + self.sourceElWidth > self.scrollElWidth
      // ) {
      //   // left
      //   if (left < 0) {
      //     computeLeft = self.scrollEl.scrollLeft;
      //     condition.left = true;
      //   }
      //
      //   // right
      //   if (left + self.sourceElWidth > self.scrollElWidth) {
      //     computeLeft = self.scrollEl.scrollLeft + self.scrollElWidth - self.sourceElWidth;
      //     condition.right = true;
      //   }
      // } else {
      //   computeLeft = self.scrollEl.scrollLeft + left;
      // }
      //
      // if (top < 0 ||
      //   top + self.sourceElHeight > self.scrollElHeight
      // ) {
      //   // top
      //   if (top < 0) {
      //     computeTop = self.scrollEl.scrollTop;
      //     condition.top = true;
      //   }
      //
      //   // bottom
      //   if (top + self.sourceElHeight > self.scrollElHeight) {
      //     computeTop = self.scrollEl.scrollTop + self.scrollElHeight - self.sourceElHeight;
      //     condition.bottom = true;
      //   }
      // } else {
      //   computeTop = self.scrollEl.scrollTop + top;
      // }

      self.sourceEl.style.left = `${computeLeft}px`;
      self.sourceEl.style.top = `${computeTop}px`;

      if (condition.left || condition.right || condition.top || condition.bottom) {
        boundaryDetectionScroll.call(self, condition);
      }
    }

    if (showMap) {
      setMapPosition.call(self, {
        left: computeLeft,
        top: computeTop,
        width: self.sourceEl.offsetWidth,
        height: self.sourceEl.offsetHeight,
      });
    }
  }

  /**
   * onMouseup
   */
  onMouseup(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;

    const { mode = 'normal' } = self.config;

    if (self.boundaryDetectionHandler) {
      cancelAnimationFrame(self.boundaryDetectionHandler);
      self.boundaryDetectionHandler = null;
    }

    let sourceEl;
    if (mode === 'normal') {
      sourceEl = self.sourceEl;
    } else {
      sourceEl = self.srcEl;
    }

    // 点击的是整个页面
    if (!self.isdown) {
      const { onClick } = self.config;
      e.preventDefault();
      e.stopPropagation();
      if (onClick) {
        onClick(sourceEl);
      }
      return false;
    }

    e.preventDefault();
    e.stopPropagation();

    self.endTime = new Date().getTime();
    mouseupDetail.call(self);

    const { onEnd } = self.config;
    if (onEnd) {
      onEnd(self.el, sourceEl);
    }

    reset.call(self);
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
 * DragManager
 * @class DragManager
 * @classdesc DragManager
 */
class DragManager {
  /**
   * constructor
   */
  constructor(el, config) {
    this.el = el;
    this.config = Object.assign({}, config);
    this.managers = new Map();
    this.init();
  }

  /**
   * init
   */
  init() {
    // TODO change
    // this.managers.clear();
    const els = Array.from(this.el.querySelectorAll(`.${selectorPrefix}`));
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!this.managers.get(el)) {
        this.managers.set(el, new Drag(el, this.config));
      }
    }

    const keys = this.managers.keys();
    for (const key in keys) {
      if (els.indexOf(key) === -1) {
        this.managers.delete(key);
      }
    }
  }

  /**
   * getDrag
   * @param {HTMLElement} - el
   * @return {Drag}
   * TODO change
   */
  getDrag(el) {
    return this.managers.get(el);
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
   */
  setDisable(disable) {
    this.managers.forEach((t) => {
      t.setDisable(disable);
    });
  }
}

/**
 * DragManagerFactory
 */
const DragManagerFactory = {
  /**
   * 创建一个DragManager
   * @param {HtmlElement} - el
   * @param {Object} - config
   * @return {DragManager} - DragManager
   */
  create(el, config) {
    return new DragManager(el, config);
  },
};

export default DragManagerFactory;
