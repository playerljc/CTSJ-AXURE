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
  self.sourceEl.style.zIndex = `${window.parseInt(getMaxLevelNumber()) + 1}`
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
 */
function setMapPosition({ left, top, width, height }) {
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
  this.mapEl.style.left = `${left + width + 10}px`;
  this.mapEl.style.top = `${top + (height - this.mapEl.offsetHeight)}px`;
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
    self.srcEl.style.left = self.sourceEl.style.left;
    self.srcEl.style.top = self.sourceEl.style.top;
    self.sourceEl.parentElement.removeChild(self.sourceEl);
  }

  if (showMap && self.mapEl) {
    self.mapEl.parentElement.removeChild(self.mapEl);
  }
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
}

/**
 * reset
 * @access private
 */
function reset() {
  this.isdown = false; // 是否按下了
  this.ismove = false; // 是否move了
  this.sourceEl = null;
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
    this.onMouseup = this.onMouseup.bind(this);
    this.onMousemove = this.onMousemove.bind(this);

    this.isdown = false; // 是否按下了
    this.ismove = false; // 是否move了
    this.sourceEl = null;
    this.srcEl = null;
    this.mouseenterEl = null;
    this.baseX = null;
    this.baseY = null;
    this.firstX = null;
    this.firstY = null;
    this.preX = null;
    this.preY = null;

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

    const { onStart } = self.config;
    if (onStart) {
      onStart(self.el, sourceEl);
    }

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

    // 在parent里移动
    const sourceElRect = sourceEl.getBoundingClientRect();
    const containerElReact = self.el.getBoundingClientRect();
    self.baseX = sourceElRect.left - containerElReact.left;
    self.baseY = sourceElRect.top - containerElReact.top;
    self.firstX = e.pageX;
    self.firstY = e.pageY;
    self.preX = e.pageX;
    self.preY = e.pageY;
  }

  /**
   * onMouseup
   */
  onMouseup(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;

    console.log('drag', 'up');

    const { mode = 'normal' } = self.config;

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

    mouseupDetail.call(self);

    const { onEnd } = self.config;
    if (onEnd) {
      onEnd(self.el, sourceEl);
    }

    reset.call(self);
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

    if (showMap) {
      setMapPosition.call(self, {
        left,
        top,
        width: self.sourceEl.offsetWidth,
        height: self.sourceEl.offsetHeight,
      });
    }

    self.sourceEl.style.left = `${left}px`;
    self.sourceEl.style.top = `${top}px`;
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
    this.managers.clear();
    const els = this.el.querySelectorAll(`.${selectorPrefix}`);
    for (let i = 0; i < els.length; i++) {
      this.managers.set(els[i], new Drag(els[i], this.config));
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
