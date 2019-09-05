import { Dom6 } from '../../../util/CTMobile-UI-Util';
import { getMaxLevelNumber } from './ComponentBaseHOC';
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
 */
function getDRClassName() {
  return drSelectorPrefix.join(' ');
}

/**
 * getDRSClassName
 * @return {String}
 */
function getDRSClassName() {
  return drsSelectorPrefix.join(' ');
}

/**
 * getRect
 * @param {Array<HTMLElement>} els
 * @return {left,top,width,height}
 */
export function getRect(els) {
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

    if (el.offsetLeft > maxLeft) {
      maxLeft = el.offsetLeft;
      rightEl = el;
    }

    if (el.offsetTop < minTop) {
      minTop = el.offsetTop;
      topEl = el;
    }

    if (el.offsetTop > maxTop) {
      maxTop = el.offsetTop;
      bottomEl = el;
    }
  });

  const left = leftEl.offsetLeft;
  const top = topEl.offsetTop;
  const width = rightEl.offsetLeft - leftEl.offsetLeft + rightEl.offsetWidth;
  const height = bottomEl.offsetTop - topEl.offsetTop + bottomEl.offsetHeight;

  console.log(left, top, width, height);

  return {
    left,
    top,
    width,
    height,
  };
}

/**
 * CreateRangeSelectEl
 * @param {number} - width
 * @param {number} - height
 * @param {number} - left
 * @param {number} - top
 * @param {Array<HTMLElement>} children
 * @return {Object}
 */
export function CreateRangeSelectEl({ width, height, left, top }, children) {
  const rangeSelectEl = Dom6.createElement(
    `<div 
            class="${selectorPrefix} ${getDRClassName()}" 
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
  children.forEach((el) => {
    const cloneEl = el.cloneNode(true);
    cloneEl.className = cloneEl.className.replace(getDRSClassName(), '');
    const cloneLeft = parseFloat(cloneEl.style.left.replace('px', ''));
    const cloneTop = parseFloat(cloneEl.style.top.replace('px', ''));
    cloneEl.style.left = `${cloneLeft - parentLeft}px`;
    cloneEl.style.top = `${cloneTop - parentTop}px`;
    df.appendChild(cloneEl);
    el.style.display = 'none';
  });
  rangeSelectEl.appendChild(df);

  return {
    el: rangeSelectEl,
    children,
    clear: () => {
      children.forEach((el) => {
        el.style.display = 'flex';
      });

      rangeSelectEl.parentElement.removeChild(rangeSelectEl);
    },
  };
}
