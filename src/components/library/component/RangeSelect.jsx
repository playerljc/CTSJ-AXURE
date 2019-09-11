import { Dom6 } from '../../../util/CTMobile-UI-Util';
import { getMaxLevelNumber } from './ComponentBaseHOC';
import KeyBoard from '../../../util/KeyBoard';

import './RangeSelect.less';

const selectorPrefix = 'ct-axure-range-select-shape';

const dragItemSelectorPrefix = 'ct-drag-item';
const resizeItemSelectorPrefix = 'ct-resizeable-item';
const selectableItemSelectorPrefix = 'ct-selectable-item';

const drSelectorPrefix = [
  dragItemSelectorPrefix,
  resizeItemSelectorPrefix,
];

const drsSelectorPrefix = [
  dragItemSelectorPrefix,
  resizeItemSelectorPrefix,
  selectableItemSelectorPrefix,
];

/**
 * getDRClassName
 * @return {String}
 * @access private
 */
function getDRClassName() {
  return drSelectorPrefix.join(' ');
}

/**
 * getDRSClassName
 * @return {String}
 * @access private
 */
function getDRSClassName() {
  return drsSelectorPrefix.join(' ');
}

/**
 * getRect
 * @param {Array<HTMLElement>} els
 * @return {left,top,width,height}
 * @access private
 */
function getRect(els) {
  const elsArr = Array.from(els);
  let leftEl;
  let rightEl;
  let topEl;
  let bottomEl;
  let minLeft = Number.MAX_VALUE;
  let maxLeft = Number.MIN_VALUE;
  let minTop = Number.MAX_VALUE;
  let maxTop = Number.MIN_VALUE;
  elsArr.forEach((el) => {
    if (el.offsetLeft < minLeft) {
      minLeft = el.offsetLeft;
      leftEl = el;
    }

    if (el.offsetLeft + el.offsetWidth > maxLeft) {
      maxLeft = el.offsetLeft + el.offsetWidth;
      rightEl = el;
    }

    if (el.offsetTop < minTop) {
      minTop = el.offsetTop;
      topEl = el;
    }

    if (el.offsetTop + el.offsetHeight > maxTop) {
      maxTop = el.offsetTop + el.offsetHeight;
      bottomEl = el;
    }
  });

  const left = leftEl.offsetLeft;
  const top = topEl.offsetTop;
  const width = rightEl.offsetLeft - leftEl.offsetLeft + rightEl.offsetWidth;
  const height = bottomEl.offsetTop - topEl.offsetTop + bottomEl.offsetHeight;

  return {
    left,
    top,
    width,
    height,
  };
}

/**
 * RangeSelect
 * @class RangeSelect
 * @classdesc RangeSelect
 */
class RangeSelect {
  constructor(children, pageId) {
    this.config = {
      children,
      pageId,
    };

    this.keyBoardMap = new Map([
      [['ArrowUp'], this.onArrowUp],

      [['ArrowDown'], this.onArrowDown],

      [['ArrowLeft'], this.onArrowLeft],

      [['ArrowRight'], this.onArrowRight],

      [['Ctrl', 'ArrowUp'], this.onCtrlArrowUp],

      [['Ctrl', 'ArrowDown'], this.onCtrlArrowDown],

      [['Ctrl', 'ArrowLeft'], this.onCtrlArrowLeft],

      [['Ctrl', 'ArrowRight'], this.onCtrlArrowRight],


      [['Shift', 'ArrowUp'], this.onCtrlArrowUp],

      [['Shift', 'ArrowDown'], this.onCtrlArrowDown],

      [['Shift', 'ArrowLeft'], this.onCtrlArrowLeft],

      [['Shift', 'ArrowRight'], this.onCtrlArrowRight],


      [['Repeat', 'ArrowUp'], this.onRepeatArrowUp],

      [['Repeat', 'ArrowDown'], this.onRepeatArrowDown],

      [['Repeat', 'ArrowLeft'], this.onRepeatArrowLeft],

      [['Repeat', 'ArrowRight'], this.onRepeatArrowRight],


      [['Repeat', 'Ctrl', 'ArrowUp'], this.onRepeatCtrlArrowUp],

      [['Repeat', 'Ctrl', 'ArrowDown'], this.onRepeatCtrlArrowDown],

      [['Repeat', 'Ctrl', 'ArrowLeft'], this.onRepeatCtrlArrowLeft],

      [['Repeat', 'Ctrl', 'ArrowRight'], this.onRepeatCtrlArrowRight],


      [['Repeat', 'Shift', 'ArrowUp'], this.onRepeatCtrlArrowUp],

      [['Repeat', 'Shift', 'ArrowDown'], this.onRepeatCtrlArrowDown],

      [['Repeat', 'Shift', 'ArrowLeft'], this.onRepeatCtrlArrowLeft],

      [['Repeat', 'Shift', 'ArrowRight'], this.onRepeatCtrlArrowRight],


      [['Ctrl', 'c'], this.onCtrlC],

      [['Ctrl', 'v'], this.onCtrlV],

      [['Delete'], this.onDelete],

      [['Backspace'], this.onBackapace],

      [['Ctrl', 'Control'], this.onCtrl],
    ]);

    this.bindKeyBoard();
    this.render();
  }

  /**
   * bindKeyBoard
   */
  bindKeyBoard() {
    const entrys = this.keyBoardMap.entries();
    for (const [key, handler] of entrys) {
      KeyBoard.on(key, handler);
    }
  }

  /**
   * unBindKeyBoard
   */
  unBindKeyBoard() {
    const entrys = this.keyBoardMap.entries();
    for (const [key, handler] of entrys) {
      KeyBoard.off(key, handler);
    }
  }

  /**
   * clear
   * 进行选择的清理操作
   */
  clear() {
    this.unBindKeyBoard();

    // 改变的元素
    const changeEls = Array.from(this.el.querySelectorAll('.ct-axure-shape'));
    const pLeft = this.el.offsetLeft;
    const pTop = this.el.offsetTop;
    const { config: { children } } = this;

    children.forEach((el) => {
      // 同步现在数据的left, top , width, height的数据，并更新到Shape中
      const { componentid } = el.dataset;
      const changeEl = changeEls.find(targetEl => targetEl.dataset.componentid === componentid);
      if (changeEl) {
        el.style.left = `${pLeft + parseFloat(changeEl.style.left.replace('px', ''))}px`;
        el.style.top = `${pTop + parseFloat(changeEl.style.top.replace('px', ''))}px`;
        el.style.width = changeEl.style.width;
        el.style.height = changeEl.style.height;
      }
      // 让之前的元素进行显示
      el.style.display = 'flex';
    });

    this.el.parentElement.removeChild(this.el);
  }

  /**
   * arrowDetail
   * @param {String} - direction [top,bottom,left,right]
   * @param {Number} - step
   */
  arrowDetail(direction, step = 1) {
    const styleKey = (direction === 'top' || direction === 'bottom') ? 'top' : 'left';
    const styleUpperKey = styleKey.charAt(0).toUpperCase() + styleKey.substring(1);

    if (direction === 'left' || direction === 'top') {
      if (this.el[`offset${styleUpperKey}`] - step < 0) {
        this.el.style[styleKey] = '0';
      } else {
        this.el.style[styleKey] = `${this.el[`offset${styleUpperKey}`] - step}px`;
      }
    } else {
      this.el.style[styleKey] = `${this.el[`offset${styleUpperKey}`] + step}px`;
    }

    const { pageid: pageId } = this.el.dataset;
    const pageEl = document.getElementById(pageId).parentElement;
    const elRect = this.el.getBoundingClientRect();
    const pageRect = pageEl.getBoundingClientRect();

    if (direction === 'left' || direction === 'top') {
      if (elRect[direction] <= pageRect[direction]) {
        if (pageEl[`scroll${styleUpperKey}`] > 0) {
          pageEl[`scroll${styleUpperKey}`] -= (pageRect[direction] - elRect[direction]);
        }
      }
    } else if (elRect[direction] >= pageRect[direction]) {
      pageEl[`scroll${styleUpperKey}`] += (elRect[direction] - pageRect[direction]);
    }
  }

  onArrowUp = () => {
    console.log('arrowUp');
    this.arrowDetail('top', 1);
  };

  onArrowDown = () => {
    console.log('arrowDown');
    this.arrowDetail('bottom', 1);
  };

  onArrowLeft = () => {
    console.log('arrowLeft');
    this.arrowDetail('left', 1);
  };

  onArrowRight = () => {
    console.log('arrowRight');
    this.arrowDetail('right', 1);
  };


  onCtrlArrowUp = () => {
    console.log('ctrlArrowUp');
    this.arrowDetail('top', 10);
  };

  onCtrlArrowDown = () => {
    console.log('ctrlArrowDown');
    this.arrowDetail('bottom', 10);
  };

  onCtrlArrowLeft = () => {
    console.log('ctrlArrowLeft');
    this.arrowDetail('left', 10);
  };

  onCtrlArrowRight = () => {
    console.log('ctrlArrowRight');
    this.arrowDetail('right', 10);
  };

  onRepeatArrowUp = () => {
    console.log('repeatArrowUp');
    this.arrowDetail('top', 1);
  };

  onRepeatArrowDown = () => {
    console.log('repeatArrowDown');
    this.arrowDetail('bottom', 1);
  };

  onRepeatArrowLeft = () => {
    console.log('repeatArrowLeft');
    this.arrowDetail('left', 1);
  };

  onRepeatArrowRight = () => {
    console.log('repeatArrowRight');
    this.arrowDetail('right', 1);
  };

  onRepeatCtrlArrowUp = () => {
    console.log('repeatCtrlArrowUp');
    this.arrowDetail('top', 10);
  };

  onRepeatCtrlArrowDown = () => {
    console.log('repeatCtrlArrowDown');
    this.arrowDetail('bottom', 10);
  };

  onRepeatCtrlArrowLeft = () => {
    console.log('repeatCtrlArrowLeft');
    this.arrowDetail('left', 10);
  };

  onRepeatCtrlArrowRight = () => {
    console.log('repeatCtrlArrowRight');
    this.arrowDetail('right', 10);
  };

  onCtrlC = () => {
    console.log('CtrlC');
  };

  onCtrlV = () => {
    console.log('CtrlV');
  };

  onDelete = () => {
    console.log('Delete');
  };

  onBackapace = () => {
    console.log('Backapace');
  };

  onCtrl = () => {
    console.log('Ctrl');
  };

  /**
   * render
   */
  render() {
    const { config: { children, pageId } } = this;

    const { width, height, left, top } = getRect(children);
    const rangeSelectEl = Dom6.createElement(
      `<div 
            class="${selectorPrefix} ${getDRClassName()}"
            data-pageid="${pageId}" 
            style="left:${left}px;
                   top:${top}px;
                   width:${width}px;
                   height:${height}px;
                   z-index:${getMaxLevelNumber() + 1}"
                   >
              <span class="${selectorPrefix}-indicator-pointer top"></span>
              <span class="${selectorPrefix}-indicator-pointer bottom"></span>
              <span class="${selectorPrefix}-indicator-pointer left"></span>
              <span class="${selectorPrefix}-indicator-pointer right"></span>
              <span class="${selectorPrefix}-indicator-pointer lefttop"></span>
              <span class="${selectorPrefix}-indicator-pointer leftbottom"></span>
              <span class="${selectorPrefix}-indicator-pointer righttop"></span>
              <span class="${selectorPrefix}-indicator-pointer rightbottom"></span>
          </div>`
    );

    // 把children放进
    const parentLeft = left;
    const parentTop = top;
    const df = document.createDocumentFragment();

    const hocChildren = [];

    children.forEach((el) => {
      const cloneEl = el.cloneNode(true);

      // 去掉元素中的drs样式
      cloneEl.className = cloneEl.className.replace(getDRSClassName(), '');

      // 计算cloneEl在rangeSelectEl中的位置
      const cloneLeft = parseFloat(cloneEl.style.left.replace('px', ''));
      const cloneTop = parseFloat(cloneEl.style.top.replace('px', ''));
      cloneEl.style.left = `${cloneLeft - parentLeft}px`;
      cloneEl.style.top = `${cloneTop - parentTop}px`;
      df.appendChild(cloneEl);

      hocChildren.push({
        el: cloneEl,
        baseWidth: Math.floor(el.offsetWidth),
        baseHeight: Math.floor(el.offsetHeight),
        clientX: Math.floor(cloneLeft - parentLeft),
        clientY: Math.floor(cloneTop - parentTop),
      });

      // 隐藏元素元素
      el.style.display = 'none';
    });

    rangeSelectEl.appendChild(df);

    this.el = rangeSelectEl;
    this.children = hocChildren;
  }
}

/**
 * CreateRangeSelectEl
 * @param {Array<HTMLElement>} children
 * @param {String} - pageId
 * @return {Object}
 */
export function CreateRangeSelectEl(children, pageId) {
  return new RangeSelect(children, pageId);
}
