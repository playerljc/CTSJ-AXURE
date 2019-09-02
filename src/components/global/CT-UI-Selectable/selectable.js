/**
 * # CTSJ-UI-Selectable
 支持PC的UI组件-Selectable

 配置:
 el
 {
   moveInclude: Function(Array<HtmlElement>) 选取到的元素
   moveExclude: Function(Array<HtmlElement>) 未选取的元素
   upInclude: Function(Array<HtmlElement>) 选取结束后选取的元素
   rangeClasses: Array<String> 选取框的样式
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
import './selectable.less';

const selectorPrefix = 'ct-selectable-';

/**
 * initEvents
 * @access private
 */
function initEvents() {
  const self = this;

  /**
   * mousedown
   */
  self.el.addEventListener('mousedown', (ev) => {
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

    self.baseX = ev.clientX;
    self.baseY = ev.clientY;

    // 创建区域dom
    const tel = document.createElement('div');
    tel.innerHTML = `<div class="${selectorPrefix}select"></div>`;
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

    // self.cloneEl.addEventListener('mouseup', () => {
    //   self.ismove = false;
    //   self.isdown = false;
    //   self.baseX = null;
    //   self.baseY = null;
    //   if (self.cloneEl) {
    //     self.cloneEl.parentElement.removeChild(self.cloneEl);
    //     self.cloneEl = null;
    //   }
    //   if (self.config.upInclude) {
    //     self.config.upInclude([].concat(self.includeEls));
    //   }
    // });

    // self.cloneEl.addEventListener('mouseleave', () => {
    //   // console.log('鼠标离开了cloneEl');
    // });

    self.el.appendChild(self.cloneEl);
  });

  /**
   * mousemove
   */
  self.el.addEventListener('mousemove', (ev) => {
    const { disable = false } = self;

    if (disable) return false;

    if (!self.isdown) return false;

    self.ismove = true;

    ev.preventDefault();

    const curX = ev.clientX;
    const curY = ev.clientY;

    // 不能拖动出el这个rect
    const elRect = self.el.getBoundingClientRect();
    if (!(curX >= elRect.left && curX <= elRect.right && curY >= elRect.top && curY <= elRect.bottom)) {
      return false;
    }

    // console.log(curX, curY);

    // 水平
    if (self.baseY === curY) {
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
    }
    // 垂直
    else if (self.baseX === curX) {
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
    }
    // 带有角度
    else {
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
    }

    self.includeEls = [];
    self.excludeEls = [];
    const rangeRect = self.cloneEl.getBoundingClientRect();
    const itemEls = self.el.querySelectorAll(`.${selectorPrefix}item`);
    for (let i = 0; i < itemEls.length; i++) {
      const itemEl = itemEls[i];
      const rect = itemEl.getBoundingClientRect();
      // console.log(rangeRect,rect)
      const xa1 = rect.left;
      const xa2 = rect.right;
      const ya1 = rect.top;
      const ya2 = rect.bottom;

      const xb1 = rangeRect.left;
      const xb2 = rangeRect.right;
      const yb1 = rangeRect.top;
      const yb2 = rangeRect.bottom;
      if (
        (Math.abs(xb2 + xb1 - xa2 - xa1) <= (xa2 - xa1 + xb2 - xb1)) &&
        (Math.abs(yb2 + yb1 - ya2 - ya1) <= (ya2 - ya1 + yb2 - yb1))
      // (rect.left >= rangeRect.left && rect.left <= rangeRect.right && rect.top >= rangeRect.top && rect.top <= rangeRect.bottom) ||
      // (rect.right >= rangeRect.left && rect.right <= rangeRect.right && rect.top >= rangeRect.top && rect.top <= rangeRect.bottom) ||
      // (rect.left >= rangeRect.left && rect.left <= rangeRect.right && rect.bottom >= rangeRect.top && rect.bottom <= rangeRect.bottom) ||
      // (rect.right >= rangeRect.left && rect.right <= rangeRect.right && rect.bottom >= rangeRect.top && rect.bottom <= rangeRect.bottom)
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
  });

  /**
   * mouseup
   */
  self.el.addEventListener('mouseup', () => {
    const { disable = false } = self;

    if (disable) return false;

    debugger

    self.baseX = null;
    self.baseY = null;
    if (self.cloneEl) {
      self.cloneEl.parentElement.removeChild(self.cloneEl);
      self.cloneEl = null;
    }
    if (self.config.upInclude) {
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
  });

  // /**
  //  * mouseleave
  //  */
  // self.el.addEventListener('mouseleave', () => {
  //   // console.log('鼠标离开了el');
  // });

  // /**
  //  * mouseup
  //  */
  // document.body.addEventListener('mouseup', () => {
  //   const { disable = false } = self;
  //
  //   if (disable) return false;
  //
  //   self.ismove = false;
  //   self.isdown = false;
  //   self.baseX = null;
  //   self.baseY = null;
  //   if (self.cloneEl) {
  //     self.cloneEl.parentElement.removeChild(self.cloneEl);
  //     self.cloneEl = null;
  //   }
  //   if (self.config.upInclude) {
  //     self.config.upInclude([].concat(self.includeEls));
  //   }
  // });
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

    this.disable = false;

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
   * setDisable
   * @param {Boolean} - disable
   */
  setDisable(disable) {
    this.disable = disable;
  }
}

/**
 * SelectableFactory
 */
const SelectableFactory = {
  /**
   * 创建一个Selectable
   * @param {HtmlElement} - el
   * @param {Object} - config
   * @return {Selectable} - Selectable
   */
  create(el, config) {
    return new Selectable(el, config);
  },
};

export default SelectableFactory;
