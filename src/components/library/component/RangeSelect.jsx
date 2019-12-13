import { getMaxLevelNumber } from './ComponentBaseHOC';

import { Dom6, Immutable } from '../../../util/CTMobile-UI-Util';

import ShapeModel from '../../../model/ShapeModel';

import RangeSelectManager from '../../../components/business/interactions/RangeSelectManager';

import {
  DRITEMSELECTORPREFIX,
  DRSITEMSELECTORPREFIX,
  KEYBOARD_NORMAL_STEP,
  DRSPREFIX,
} from '../../../util/Constant';

import RangeSelectKeyBoard from './RangeSelectKeyBoard';

import './RangeSelect.less';
import ClipBoard from '../../../util/ClipBoard';

const selectorPrefix = 'ct-axure-range-select-shape';

/**
 * getDRClassName
 * @return {String}
 * @access private
 */
function getDRClassName() {
  return DRITEMSELECTORPREFIX.join(' ');
}

/**
 * getDRSClassName
 * @return {String}
 * @access private
 */
function getDRSClassName() {
  return DRSITEMSELECTORPREFIX.join(' ');
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

    this.rangeSelectKeyBoard = new RangeSelectKeyBoard(this);
    this.bindKeyBoard();
    this.render();
  }

  /**
   * bindKeyBoard
   */
  bindKeyBoard() {
    this.rangeSelectKeyBoard.bindKeyBoard();
  }

  /**
   * unBindKeyBoard
   */
  unBindKeyBoard() {
    this.rangeSelectKeyBoard.unBindKeyBoard();
  }

  /**
   * clear
   * 进行选择的清理操作
   */
  clear() {
    this.unBindKeyBoard();

    // 改变的元素
    const changeEls = Array.from(this.el.querySelectorAll(`.${DRSPREFIX}`));
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

      if (changeEl) {
        setTimeout(() => {
          const {
            offsetWidth: width,
            offsetHeight: height,
            offsetLeft: left,
            offsetTop: top,
            dataset: {
              pageid: pageId,
              componentid: componentId,
            },
          } = el;

          const shape = ShapeModel.getShape({ pageId, componentId });
          if (!shape) return false;
          const { style } = shape.getProperty();
          style.position = {
            left,
            top,
          };
          style.dimension = {
            width,
            height,
          };
          shape.setPropertyByProps('style', style);
        }, 10);
      }
    });

    this.el.parentElement.removeChild(this.el);
  }

  /**
   * arrowDetail
   * @param {String} - direction [top,bottom,left,right]
   * @param {SelectOptions} - step
   */
  arrowDetail(direction, step = KEYBOARD_NORMAL_STEP) {
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

  /**
   * deleteSelf
   */
  deleteSelf() {
    const { config: { children = [], pageId } } = this;

    children.forEach((el) => {
      const { componentid: componentId } = el.dataset;
      const shape = ShapeModel.getShape({ pageId, componentId });
      if (shape) {
        shape.deleteSelf();
      }
    });

    this.unBindKeyBoard();

    const rangeSelect = RangeSelectManager.get(pageId);
    if (rangeSelect) {
      rangeSelect.clear();
      RangeSelectManager.delete(pageId);
    }
  }

  /**
   * copy
   */
  copy() {
    const { config: { pageId } } = this;

    const changeEls = Array.from(this.el.querySelectorAll(`.${DRSPREFIX}`));
    const pLeft = this.el.offsetLeft;
    const pTop = this.el.offsetTop;

    ClipBoard.set(pageId, changeEls.map((el) => {
      const { groupkey: groupKey, componentkey: componentKey, componentid: componentId } = el.dataset;
      const property = Immutable.cloneDeep(ShapeModel.getShape({ pageId, componentId }).getProperty());
      const left = pLeft + parseFloat(el.style.left.replace('px', ''));
      const top = pTop + parseFloat(el.style.top.replace('px', ''));
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      const active = false;

      return {
        groupKey,
        componentKey,
        pageId,
        property,
        left,
        top,
        width,
        height,
        active,
      };
    }));
  }

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
