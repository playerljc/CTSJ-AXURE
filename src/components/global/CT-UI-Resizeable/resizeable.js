/**
 * # CTSJ-UI-Resizeable
 支持PC的UI组件-Resizeable


 配置:
 el
 {

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
import './resizeable.less';

const selectorPrefix = 'ct-resizeable';
// 边缘的步进
const edgeStep = 5;
// 最小宽度
const minWidth = 2;
// 最小高度
const minHeight = 2;

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
   * @param {ResizeableGroup} - parent
   */
  constructor(el, parent) {
    this.el = el;
    this.parent = parent;
    this.disable = false;
    this.initVar();
    this.initEvents();
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

    // el的baseWith
    this.baseWidth = this.el.offsetWidth;
    // el的baseHeight
    this.baseHeight = this.el.offsetHeight;
    // 左侧的临界值
    this.leftCritical = -this.baseWidth + minWidth;
    // 右侧的临界值
    this.rightCritical = this.baseWidth - minWidth;
    // 上方的临界值
    this.topCritical = -this.baseHeight + minHeight;
    // 下方的临界值
    this.bottomCritical = this.baseHeight - minHeight;
    // 方向
    this.direction = null;

    // clientX
    this.clientX = this.el.offsetLeft;
    // clientY
    this.clientY = this.el.offsetTop;
  }

  /**
   * initEvents
   */
  initEvents() {
    const self = this;
    /**
     * el mousedown
     */
    this.el.addEventListener('mousedown', (e) => {
      const { disable = false } = self;

      if (disable) return false;

      if (!self.isCanResize) {
        // console.log('el down no');
        return false;
      }
      // console.log('el down yes');
      self.isDown = true;
      self.parent.cur = self;
      self.baseX = e.clientX;
      self.baseY = e.clientY;
    });

    /**
     * el mousemove
     */
    this.el.addEventListener('mousemove', (e) => {
      const { disable = false } = self;

      if (disable) return false;

      // console.log('555');
      if (self.parent.cur && self.parent.cur !== self) {
        // console.log('el-mousemove', self.id);
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

      // console.log(clientX, clientY);

      if (clientX - edgeStep <= self.rect.left &&
        clientY - edgeStep > self.rect.top &&
        clientY + edgeStep < self.rect.bottom) {
        self.direction = 'left';
        self.isCanResize = true;
        self.el.style.cursor = 'w-resize';
      } else if (clientX + edgeStep >= self.rect.right &&
        clientY - edgeStep > self.rect.top &&
        clientY + edgeStep < self.rect.bottom) {
        self.direction = 'right';
        self.isCanResize = true;
        self.el.style.cursor = 'e-resize';
      } else if (clientX - edgeStep <= self.rect.left &&
        clientY - edgeStep <= self.rect.top) {
        self.direction = 'lefttop';
        self.isCanResize = true;
        self.el.style.cursor = 'nw-resize';
      } else if (clientX - edgeStep <= self.rect.left &&
        clientY + edgeStep >= self.rect.bottom) {
        self.direction = 'leftbottom';
        self.isCanResize = true;
        self.el.style.cursor = 'sw-resize';
      } else if (clientX + edgeStep >= self.rect.right &&
        clientY - edgeStep <= self.rect.top) {
        self.direction = 'righttop';
        self.isCanResize = true;
        self.el.style.cursor = 'ne-resize';
      } else if (clientX + edgeStep >= self.rect.right &&
        clientY + edgeStep >= self.rect.bottom) {
        self.direction = 'rightbottom';
        self.isCanResize = true;
        self.el.style.cursor = 'se-resize';
      } else if (clientY - edgeStep <= self.rect.top &&
        clientX - edgeStep > self.rect.left &&
        clientX + edgeStep < self.rect.right) {
        self.direction = 'top';
        self.isCanResize = true;
        self.el.style.cursor = 'n-resize';
      } else if (clientY + edgeStep >= self.rect.bottom &&
        clientX - edgeStep > self.rect.left &&
        clientX + edgeStep < self.rect.right) {
        self.direction = 'bottom';
        self.isCanResize = true;
        self.el.style.cursor = 's-resize';
      } else {
        self.isCanResize = false;
        self.parent.cur = null;
        self.el.style.cursor = 'default';
      }
    });
  }

  /**
   * reset
   */
  reset() {
    this.isCanResize = false;
    this.isDown = false;
    this.baseX = null;
    this.baseY = null;
    this.baseWidth = this.el.offsetWidth;
    this.baseHeight = this.el.offsetHeight;
    // 左侧的临界值
    this.leftCritical = -this.baseWidth + minWidth;
    // 右侧的临界值
    this.rightCritical = this.baseWidth - minWidth;
    // 上方的临界值
    this.topCritical = -this.baseHeight + minHeight;
    // 下方的临界值
    this.bottomCritical = this.baseHeight - minHeight;
    this.clientX = this.el.offsetLeft;
    this.clientY = this.el.offsetTop;
    // this.rect = this.el.getBoundingClientRect();
    this.direction = null;
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
 * ResizeableGroup
 * @class ResizeableGroup
 * @classdesc ResizeableGroup
 */
class ResizeableGroup {
  /**
   * constructor
   * @constructor
   * @param {HTMLElement} - el
   */
  constructor(el) {
    this.el = el;
    this.disable = false;
    this.rect = this.el.getBoundingClientRect();
    this.cur = null;
    this.initEvents();
    this.init();
  }

  /**
   * initEvents
   */
  initEvents() {
    const self = this;

    /**
     * group mousemove
     */
    self.el.addEventListener('mousemove', (e) => {
      const { disable = false } = self;

      if (disable) return false;
      // console.log('body-mousemove', self.cur.id);
      // console.log('666');
      if (!(self.cur && self.cur.isCanResize && self.cur.isDown)) {
        if (self.cur) {
          self.reset();
        }
        return false;
      }

      const { clientX, clientY } = e;

      const width = clientX - self.cur.baseX;
      const height = clientY - self.cur.baseY;

      // var curStyle = window.getComputedStyle(self.cur.el);
      const left = self.cur.clientX; // self.cur.rect.left - self.rect.left;
      const top = self.cur.clientY; // self.cur.rect.top - self.rect.top;

      if (self.cur.direction === 'right') {
        self.cur.el.style.width = width > self.cur.leftCritical ? `${self.cur.baseWidth + width}px` : `${minWidth}px`;
      } else if (self.cur.direction === 'left') {
        self.cur.el.style.width = width < self.cur.rightCritical ? `${self.cur.baseWidth - width}px` : `${minWidth}px`;
        self.cur.el.style.left = width < self.cur.rightCritical ? `${left + width}px` : `${left + self.cur.rightCritical}px`;
      } else if (self.cur.direction === 'top') {
        self.cur.el.style.height = height < self.cur.bottomCritical ? `${self.cur.baseHeight - height}px` : `${minHeight}px`;
        self.cur.el.style.top = height < self.cur.bottomCritical ? `${top + height}px` : `${top + self.cur.bottomCritical}px`;
      } else if (self.cur.direction === 'bottom') {
        self.cur.el.style.height = height > self.cur.topCritical ? `${self.cur.baseHeight + height}px` : `${minHeight}px`;
      } else if (self.cur.direction === 'lefttop') {
        self.cur.el.style.width = width < self.cur.rightCritical ? `${self.cur.baseWidth - width}px` : `${minWidth}px`;
        self.cur.el.style.left = width < self.cur.rightCritical ? `${left + width}px` : `${left + self.cur.rightCritical}px`;
        self.cur.el.style.height = height < self.cur.bottomCritical ? `${self.cur.baseHeight - height}px` : `${minHeight}px`;
        self.cur.el.style.top = height < self.cur.bottomCritical ? `${top + height}px` : `${top + self.cur.bottomCritical}px`;
      } else if (self.cur.direction === 'leftbottom') {
        self.cur.el.style.width = width < self.cur.rightCritical ? `${self.cur.baseWidth - width}px` : `${minWidth}px`;
        self.cur.el.style.left = width < self.cur.rightCritical ? `${left + width}px` : `${left + self.cur.rightCritical}px`;
        self.cur.el.style.height = height > self.cur.topCritical ? `${self.cur.baseHeight + height}px` : `${minHeight}px`;
      } else if (self.cur.direction === 'righttop') {
        self.cur.el.style.width = width > self.cur.leftCritical ? `${self.cur.baseWidth + width}px` : `${minWidth}px`;
        self.cur.el.style.height = height < self.cur.bottomCritical ? `${self.cur.baseHeight - height}px` : `${minHeight}px`;
        self.cur.el.style.top = height < self.cur.bottomCritical ? `${top + height}px` : `${top + self.cur.bottomCritical}px`;
      } else if (self.cur.direction === 'rightbottom') {
        self.cur.el.style.width = width > self.cur.leftCritical ? `${self.cur.baseWidth + width}px` : `${minWidth}px`;
        self.cur.el.style.height = height > self.cur.topCritical ? `${self.cur.baseHeight + height}px` : `${minHeight}px`;
      }
    });

    /**
     * group mouseup
     */
    self.el.addEventListener('mouseup', () => {
      const { disable = false } = self;

      if (disable) return false;
      if (!(self.cur && self.cur.isCanResize && self.cur.isDown)) {
        // console.log('抬起，没reset');
        return false;
      }
      // console.log('抬起，reset');
      self.reset();
    });
  }

  /**
   * reset
   */
  reset() {
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
    this.ins = [];
    for (let i = 0; i < els.length; i++) {
      this.ins.push(new Resizeable(els[i], this, i));
    }
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
    this.disable = disable;
    this.ins.forEach((t) => {
      t.setDisable(disable);
    });
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
   */
  constructor() {
    this.init();
  }

  /**
   * init
   */
  init() {
    this.resizeManagers = [];
    const resizeableEls = document.querySelectorAll(`.${selectorPrefix}`);
    for (let i = 0; i < resizeableEls.length; i++) {
      this.resizeManagers.push(new ResizeableGroup(resizeableEls[i]));
    }
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
    this.resizeManagers.forEach((t) => {
      t.setDisable(disable);
    });
  }
}

/**
 * ResizeableFactory
 */
const ResizeableFactory = {
  /**
   * 创建一个Resizeable
   * @return {ResizeableGroupManager} - ResizeableGroupManager
   */
  create() {
    return new ResizeableGroupManager();
  },
};

export default ResizeableFactory;
