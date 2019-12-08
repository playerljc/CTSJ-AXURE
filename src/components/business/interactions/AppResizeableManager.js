import ResizeableFactory from '../../global/CT-UI-Resizeable/resizeable';
import RangeSelectManager from './RangeSelectManager';
import ShapeModel from '../../../model/ShapeModel';
import Emitter from '../../../util/Emitter';
import Actions from '../../../util/Actions';

import AppDroppableManager from './AppDroppableManager';
import AppDragManager from './AppDragManager';
import AppSelectableManager from './AppSelectableManager';
import AppSplitManager from './AppSplitManager';

let resizeable;
let App;

/**
 * onStart
 */
function onStart() {
  // console.log('Resize Start');
  AppSplitManager.setDisable();
  AppDroppableManager.setDisable();
  AppDragManager.setDisable();
  AppSelectableManager.setDisable();
}

/**
 * onEnd
 */
function onEnd() {
  // console.log('Resize End');
  AppSplitManager.setEnable();
  AppDroppableManager.setEnable();
  AppDragManager.setEnable();
  AppSelectableManager.setEnable();

  const rangeSelect = RangeSelectManager.get(App.getCurPageId());
  if (rangeSelect) {
    const { children = [] } = rangeSelect;
    rangeSelect.children = children.map((t) => {
      const { el } = t;
      return Object.assign(t, {
        baseWidth: el.offsetWidth,
        baseHeight: el.offsetHeight,
        clientX: el.offsetLeft,
        clientY: el.offsetTop,
      });
    });
  }
}

/**
 * 当resizeable有变化的时候
 * @param {HTMLElement} - curEl
 * @param {number} - incrementWidth
 * @param {number} - incrementHeight
 * @param {Object} - condition
 * @param {Function} - callback
 * @return {boolean}
 */
function onChange(curEl,
  {
    incrementWidth,
    incrementHeight,
    condition,
  },
  {
    handler,
    context,
  }) {
  const {
    offsetWidth: width,
    offsetHeight: height,
    offsetLeft: left,
    offsetTop: top,
    dataset: {
      pageid: pageId,
      componentid: componentId,
    },
  } = curEl;

  const rangeSelect = RangeSelectManager.get(App.getCurPageId());
  if (!rangeSelect) {
    // 没有对rangeSelect进行处理
    const shape = ShapeModel.getShape({ pageId, componentId });
    const { style } = shape.getProperty();
    style.position = {
      left,
      top,
    };
    style.dimension = {
      width,
      height,
    };
    shape.setPropertyByProps('style', style, () => {
      Emitter.trigger(Actions.components.library.component.stylechange, {
        pageId,
        componentId,
      });
    });
  } else {
    // 对rangeSelect进行处理
    const { children = [] } = rangeSelect;
    children.forEach((entry) => {
      const { el, baseWidth, baseHeight, clientX, clientY } = entry;

      handler.call(
        context,
        el,
        {
          baseWidth,
          baseHeight,
          clientX,
          clientY,
          incrementWidth,
          incrementHeight,
        }
      );

      if (condition.left || condition.right || condition.top || condition.bottom) {
        if (condition.left || condition.right) {
          entry.baseWidth = el.offsetWidth;
          entry.clientX = el.offsetLeft;
        }

        if (condition.top || condition.bottom) {
          entry.baseHeight = el.offsetHeight;
          entry.clientY = el.offsetTop;
        }
      }
    });
  }
}
export default {
  init({ canvasEl, App: AppIns }) {
    App = AppIns;
    resizeable = ResizeableFactory.create(canvasEl, {
      onStart,
      onEnd,
      onChange,
    });
  },
  setDisable() {
    resizeable.setDisable(true);
  },
  setEnable() {
    resizeable.setDisable(false);
  },
  setScale(scale) {
    resizeable.setScale(scale);
  },
  refresh() {
    resizeable.refresh();
  },
  getGroup(groupEl) {
    return resizeable.getGroup(groupEl);
  },
};
