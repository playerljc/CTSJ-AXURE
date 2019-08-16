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
import { Dom6 } from '@ctmobile/ui-util';
import './drag.less';

const selectorPrefix = 'ct-drag-';

// const Dom6 = {
//   getTopDom(target, selector) {
//     if (!target || !selector) return null;
//
//     if (target.className.indexOf(selector) !== -1) {
//       return target;
//     }
//
//     let parentDom = target;
//     while ((parentDom = parentDom.parentNode)) {
//       if (parentDom.className.indexOf(selector) !== -1) {
//         break;
//       } else if (parentDom === document.body) break;
//     }
//
//     if (parentDom) {
//       if (parentDom === document.body) {
//         return null;
//       } else {
//         return parentDom;
//       }
//     } else {
//       return null;
//     }
//   },
//
//   createElement(html) {
//     const dom = document.createElement('div');
//     dom.innerHTML = html;
//     return dom.firstElementChild;
//   },
// };


/**
 * getDragTarget
 * @param {HTMLElement} - el
 * @return {HTMLElement}
 */
function getDragTarget(el) {
  if (el.classList.contains(`${selectorPrefix}item`)) {
    return el;
  }

  const targetEl = Dom6.getTopDom(el, `${selectorPrefix}item`);
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
  self.sourceEl = Dom6.createElement(`<div class="${selectorPrefix}clone ${cloneClassNames}"></div>`);
  self.sourceEl.style.width = `${sourceEl.offsetWidth}px`;
  self.sourceEl.style.height = `${sourceEl.offsetHeight}px`;
  const computedStyle = window.getComputedStyle(sourceEl);
  self.sourceEl.style.left = computedStyle.left;
  self.sourceEl.style.top = computedStyle.top;
  self.el.appendChild(self.sourceEl);
}

/**
 * createMapEl
 * @access private
 * @return {HTMLElement}
 */
function createMapEl() {
  const mapEl = Dom6.createElement(`<div class="${selectorPrefix}map"></div>`);
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
  self.el.addEventListener('mousedown', self.onMousedown);
  self.el.addEventListener('mouseup', self.onMouseup);
  self.el.addEventListener('mousemove', self.onMousemove);
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
  onMouseup() {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;
    mouseupDetail.call(self);
    reset.call(self);
  }

  /**
   * onMousemove
   */
  onMousemove(e) {
    const self = this;
    const { disable = false } = self;

    if (disable) return false;
    if (!self.isdown) {
      const sourceEl = getDragTarget(e.target);
      if (sourceEl) {
        self.mouseenterEl = sourceEl;
        self.el.style.cursor = 'move';
      } else if (self.mouseenterEl) {
        self.el.style.cursor = 'default';
        self.mouseenterEl = null;
      }

      return false;
    }

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
 * DragFactory
 */
const DragFactory = {
  /**
   * 创建一个Drag
   * @param {HtmlElement} - el
   * @param {Object} - config
   * @return {Drag} - Drag
   */
  create(el, config) {
    return new Drag(el, config);
  },
};

export default DragFactory;
