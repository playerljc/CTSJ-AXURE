/**
 *
 # CTSJ-UI-Selectable
 支持PC的UI组件-Selectable

 配置:
 el
 {
   moveInclude: Function(Array<HtmlElement>) 选取到的元素
   moveExclude: Function(Array<HtmlElement>) 未选取的元素
   upInclude: Function(Array<HtmlElement>) 选取结束后选取的元素
   rangeClasses: Array<String> 选取框的样式
   infinite: [Boolean] 是否是无限拖动
   onStart: Function
   onEnd: Function
   onClick: Function
}

 布局:
 <div>
 <div class="ct-selectable-item"></div>
 ...
 </div>

 功能:
 在一个区域内进行选取，区域内带有ct-selectable-item样式的元素会参与计算
 圈选中获取选中和非选中的元素，选取结束获取选取的元素

 测试:

 log:
 .无限拖拽，可以脱出父窗口

 demo:
 .一个normal
 .二个互补影响的选区

 */
import { Dom6 } from '../../../util/CTMobile-UI-Util';

import './selectable.less';

const selectorPrefix = 'ct-selectable';

const edgeWidth = 10;

const scrollStep = 5;

const scrollWidth = 20;

/**
 * initEvents
 * @access private
 */
function initEvents() {
  const self = this;

  Dom6.off(self.el, 'selectable', 'mousedown');
  Dom6.on(self.el, 'selectable', 'mousedown', self.onMouseDown);

  Dom6.off(self.el, 'selectable', 'mouseup');
  Dom6.on(self.el, 'selectable', 'mouseup', self.onMouseUp);

  Dom6.off(self.el, 'selectable', 'mousemove');
  Dom6.on(self.el, 'selectable', 'mousemove', self.onMouseMove);

  Dom6.off(self.el, 'selectable', 'mouseleave');
  Dom6.on(self.el, 'selectable', 'mouseleave', (e) => {
    this.onMouseUp(e);
  });
}

/**
 * Selectable
 * @class Selectable
 * @classdesc Selectable
 */
class Selectable {
  /**
   * constructor
   * @constructor
   * @param {HTMLElement} - el
   * @param {Object} - config
   */
  constructor(el, config) {
    this.el = el;
    this.config = Object.assign({}, config);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.disable = false;

    // if (this.config.infinite) {
    this.scrollEl = this.el.parentElement;
    this.scrollElWidth = this.scrollEl.offsetWidth;
    this.scrollElHeight = this.scrollEl.offsetHeight;
    this.scrollElRect = this.scrollEl.getBoundingClientRect();
    // }
    this.elRect = this.el.getBoundingClientRect();

    this.isdown = false;
    // 是移动
    this.ismove = false;
    this.baseX = null;
    this.baseY = null;
    // 选取节点
    this.cloneEl = null;
    this.includeEls = [];
    this.excludeEls = [];

    initEvents.call(this);
  }

  /**
   * onMouseDown
   * @param {MouseEvent} - ev
   * @return {boolean}
   */
  onMouseDown(ev) {
    const self = this;

    const { disable = false } = self;

    if (disable) return false;

    self.isdown = true;

    const { onStart } = self.config;
    if (onStart) {
      onStart();
    }

    if (self.cloneEl) {
      self.ismove = false;
      self.cloneEl.parentElement.removeChild(self.cloneEl);
      self.cloneEl = null;
    }

    // 转换为position:absolute的坐标
    self.baseX = ev.clientX - (self.elRect.left - self.scrollEl.scrollLeft);
    self.baseY = ev.clientY - (self.elRect.top - self.scrollEl.scrollTop);

    // 获取
    self.itemEls = Array.from(self.el.querySelectorAll(`.${selectorPrefix}-item`)).map((itemEl) => {
      const xa1 = itemEl.offsetLeft;
      const ya1 = itemEl.offsetTop;
      return {
        xa1,
        xa2: xa1 + itemEl.offsetWidth,
        ya1,
        ya2: ya1 + itemEl.offsetHeight,
        itemEl,
      };
    });

    // 创建区域dom
    const tel = document.createElement('div');
    tel.innerHTML = `<div class="${selectorPrefix}-select"></div>`;
    self.cloneEl = tel.firstElementChild;
    if (self.config.rangeClasses && self.config.rangeClasses.length !== 0) {
      self.config.rangeClasses.map((className) => {
        if (!self.cloneEl.classList.contains(className)) {
          self.cloneEl.classList.add(className);
        }
      });
    }
    self.cloneEl.style.left = `${self.baseX}px`;
    self.cloneEl.style.top = `${self.baseY}px`;

    self.el.appendChild(self.cloneEl);
  }

  /**
   * onMouseMove
   * @param {MouseEvent} - ev
   * @return {boolean}
   */
  onMouseMove(ev) {
    const self = this;

    const { disable = false } = self;

    if (disable) return false;

    if (!self.isdown) return false;

    self.ismove = true;

    ev.preventDefault();

    if (self.boundaryDetectionHandler) {
      cancelAnimationFrame(self.boundaryDetectionHandler);
      self.boundaryDetectionHandler = null;
    }

    const curX = ev.clientX;
    const curY = ev.clientY;

    const condition = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    };

    if (curX <= self.scrollElRect.left + edgeWidth) {
      condition.left = true;
    }

    if (curX >= self.scrollElRect.right - (edgeWidth + scrollWidth)) {
      condition.right = true;
    }

    if (curY <= self.scrollElRect.top + edgeWidth) {
      condition.top = true;
    }

    if (curY >= self.scrollElRect.bottom - (edgeWidth + scrollWidth)) {
      condition.bottom = true;
    }

    // 不能拖动出el这个rect
    // const elRect = self.el.getBoundingClientRect();
    // if (!(
    //   curX >= elRect.left &&
    //   curX <= elRect.right &&
    //   curY >= elRect.top &&
    //   curY <= elRect.bottom)) {
    //   return false;
    // }

    self.updateRange(ev);

    if (condition.left || condition.right || condition.top || condition.bottom) {
      self.boundaryDetectionScroll(condition, ev);
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

    if (self.boundaryDetectionHandler) {
      cancelAnimationFrame(self.boundaryDetectionHandler);
      self.boundaryDetectionHandler = null;
    }

    self.baseX = null;
    self.baseY = null;
    if (self.cloneEl) {
      self.cloneEl.parentElement.removeChild(self.cloneEl);
      self.cloneEl = null;
    }


    if (self.isdown && self.ismove && self.config.upInclude) {
      self.config.upInclude([].concat(self.includeEls));
    }

    const { onEnd, onClick } = self.config;
    if (onEnd) {
      onEnd();
    }

    if (self.isdown && !self.ismove) {
      if (onClick) {
        onClick();
      }
    }

    self.isdown = false;
    self.ismove = false;
    self.itemEls = null;
  }

  /**
   * updateRange
   * @param {MouseEvent} - ev
   */
  updateRange(ev) {
    const self = this;

    const curX = ev.clientX - (self.elRect.left - self.scrollEl.scrollLeft);
    const curY = ev.clientY - (self.elRect.top - self.scrollEl.scrollTop);

    if (self.baseY === curY) {
      // 水平
      self.cloneEl.style.height = '0';
      if (self.baseX > curX) {
        // console.log('水平左');
        self.cloneEl.style.left = `${curX}px`;
        self.cloneEl.style.right = `${self.baseX}px`;
        self.cloneEl.style.top = `${curY}px`;
      } else if (self.baseX < curX) {
        // 水平右
        // console.log('水平右');
        self.cloneEl.style.left = `${self.baseX}px`;
        self.cloneEl.style.right = `${curX}px`;
        self.cloneEl.style.top = `${self.baseY}px`;
      } else {
        // 重合了
        // console.log('重合了');
        self.cloneEl.style.left = `${self.baseX}px`;
        self.cloneEl.style.right = `${self.baseX}px`;
        self.cloneEl.style.top = `${self.baseY}px`;
      }
    } else if (self.baseX === curX) {
      // 垂直
      self.cloneEl.style.width = '0';
      if (curY < self.baseY) {
        // console.log('垂直上');
        self.cloneEl.style.left = `${self.baseX}px`;
        self.cloneEl.style.top = `${curY}px`;
        self.cloneEl.style.bottom = `${self.baseY}px`;
      } else if (curY > self.baseY) {
        // 垂直下
        // console.log('垂直下');
        self.cloneEl.style.left = `${self.baseX}px`;
        self.cloneEl.style.top = `${self.baseY}px`;
        self.cloneEl.style.bottom = `${curY}px`;
      } else {
        // 重合了
        // console.log('重合了');
        self.cloneEl.style.left = `${self.baseX}px`;
        self.cloneEl.style.right = `${self.baseX}px`;
        self.cloneEl.style.top = `${self.baseY}px`;
      }
    } else {
      // 带有角度
      const width = Math.abs(self.baseX - curX);
      const height = Math.abs(self.baseY - curY);

      let left;
      let right;
      let top;
      let bottom;
      if (curX < self.baseX && curY < self.baseY) {
        // 左上
        // console.log('左上');
        // left
        left = curX;
        // right
        right = self.baseX;
        // top
        top = curY;
        // bottom
        bottom = self.baseY;
      } else if (curX > self.baseX && curY < self.baseY) {
        // 右上
        // console.log('右上');
        // left
        left = self.baseX;
        // right
        right = curX;
        // top
        top = curY;
        // bottom
        bottom = self.baseY;
      } else if (curX < self.baseX && curY > self.baseY) {
        // 左下
        // console.log('左下');
        // left
        left = curX;
        // right
        right = self.baseX;
        // top
        top = self.baseY;
        // bottom
        bottom = curY;
      } else if (curX > self.baseX && curY > self.baseY) {
        // 右下
        // console.log('右下');
        // left
        left = self.baseX;
        // right
        right = curX;
        // top
        top = self.baseY;
        // bottom
        bottom = curY;
      }

      self.cloneEl.style.width = `${width}px`;
      self.cloneEl.style.height = `${height}px`;
      self.cloneEl.style.left = `${left}px`;
      self.cloneEl.style.right = `${right}px`;
      self.cloneEl.style.top = `${top}px`;
      self.cloneEl.style.bottom = `${bottom}px`;

      // console.log('width:', width, 'height:', height, 'left:', left, 'right:', right, 'top:', top, 'bottom:', bottom);
    }

    self.includeEls = [];
    self.excludeEls = [];

    const xb1 = self.cloneEl.offsetLeft;
    const xb2 = xb1 + self.cloneEl.offsetWidth;
    const yb1 = self.cloneEl.offsetTop;
    const yb2 = yb1 + self.cloneEl.offsetHeight;

    // const itemEls = self.el.querySelectorAll(`.${selectorPrefix}-item`);
    // for (let i = 0; i < itemEls.length; i++) {
    //   const itemEl = itemEls[i];
    //   const xa1 = itemEl.offsetLeft;
    //   const xa2 = itemEl.offsetLeft + itemEl.offsetWidth;
    //   const ya1 = itemEl.offsetTop;
    //   const ya2 = itemEl.offsetTop + itemEl.offsetHeight;
    //
    //   if (
    //     (Math.abs(xb2 + xb1 - xa2 - xa1) <= (xa2 - xa1 + xb2 - xb1)) &&
    //     (Math.abs(yb2 + yb1 - ya2 - ya1) <= (ya2 - ya1 + yb2 - yb1))
    //   ) {
    //     self.includeEls.push(itemEl);
    //   } else {
    //     self.excludeEls.push(itemEl);
    //   }
    // }

    for (let i = 0; i < self.itemEls.length; i++) {
      const {
        xa1,
        xa2,
        ya1,
        ya2,
        itemEl,
      } = self.itemEls[i];

      if (
        (Math.abs(xb2 + xb1 - xa2 - xa1) <= (xa2 - xa1 + xb2 - xb1)) &&
        (Math.abs(yb2 + yb1 - ya2 - ya1) <= (ya2 - ya1 + yb2 - yb1))
      ) {
        self.includeEls.push(itemEl);
      } else {
        self.excludeEls.push(itemEl);
      }
    }

    if (self.config.moveInclude) {
      self.config.moveInclude([].concat(self.includeEls));
    }

    if (self.config.moveExclude) {
      self.config.moveExclude([].concat(self.excludeEls));
    }
  }

  /**
   * boundaryDetectionScroll
   * @param {Object} - condition
   * @param {MouseEvent} - ev
   */
  boundaryDetectionScroll(condition, ev) {
    const self = this;

    const { top, bottom, left, right } = condition;

    if (top) {
      if (self.scrollEl.scrollTop !== 0) {
        if (self.scrollEl.scrollTop - scrollStep < 0) {
          self.scrollEl.scrollTop = 0;
        } else {
          self.scrollEl.scrollTop -= scrollStep;
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
      }
    }

    if (left) {
      if (self.scrollEl.scrollLeft !== 0) {
        if (self.scrollEl.scrollLeft - scrollStep < 0) {
          self.scrollEl.scrollLeft = 0;
        } else {
          self.scrollEl.scrollLeft -= scrollStep;
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
      }
    }

    self.updateRange(ev);

    self.boundaryDetectionHandler = requestAnimationFrame(() => {
      self.boundaryDetectionScroll(condition, ev);
    });
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
 * SelectableManager
 * @class SelectableManager
 * @classdesc SelectableManager
 */
class SelectableManager {
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
        this.managers.set(el, new Selectable(el, this.config));
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
   * getSelectable
   * @param {HTMLElement} - el
   * @return {Selectable}
   * TODO change
   */
  getSelectable(el) {
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
 * SelectableManagerFactory
 */
const SelectableManagerFactory = {
  /**
   * 创建一个SelectableManager
   * @param {HtmlElement} - el
   * @param {Object} - config
   * @return {SelectableManager} - SelectableManager
   */
  create(el, config) {
    return new SelectableManager(el, config);
  },
};

export default SelectableManagerFactory;
