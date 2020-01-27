import SelectableFactory from '../../global/CT-UI-Selectable/selectable';

import AppDroppableManager from './AppDroppableManager';
import AppResizeableManager from './AppResizeableManager';
import AppSplitManager from './AppSplitManager';
import AppDragManager from './AppDragManager';

let selectable;
let App;

/**
 * 选取中包含的节点
 * @param {Array<String>} - ids
 */
function moveInclude(ids) {
  App.rangeSelectActive(ids);
}

/**
 * 选取中不包含的节点
 * @param {Array<String>} - ids
 */
function moveExclude(ids) {
  App.unRangeSelectActive(ids);
}

/**
 * 选取结束后包含的节点
 * @param {Array<HTMLElement>} - els
 */
function upInclude(els) {
  App.createRangeSelect(els);
}

/**
 * onStart
 * 开始进行选取
 */
function onStart() {
  // console.log('selectStart');
  App.clearRangeSelect();

  // 开始进行选取之前清除掉激活的Shape
  App.clearCurPageActiveShape();

  AppSplitManager.setDisable();
  AppDroppableManager.setDisable();
  AppDragManager.setDisable();
  AppResizeableManager.setDisable();
}

/**
 * onEnd
 * 选取的结束
 */
function onEnd() {
  // console.log('selectEnd');
  AppSplitManager.setEnable();
  AppDroppableManager.setEnable();
  AppDragManager.setEnable();
  AppResizeableManager.setEnable();
}

/**
 * @todo 页面的点击
 */
function onClick() {
  App.clearRangeSelect();
  App.clearCurPageActiveShape();
}

export default {
  init({ canvasEl, App: AppIns }) {
    App = AppIns;

    selectable = SelectableFactory.create(canvasEl, {
      /**
       * 选取中包含的节点
       * @param {Array<HTMLElement>} - els
       */
      moveInclude,
      /**
       * 选取中不包含的节点
       * @param {Array<HTMLElement>} - els
       */
      moveExclude,
      /**
       * 选取结束后包含的节点
       * @param {Array<HTMLElement>} - els
       */
      upInclude,
      /**
       * onStart
       * 开始进行选取
       */
      onStart,
      /**
       * onEnd
       * 选取的结束
       */
      onEnd,
      /**
       * @todo 页面的点击
       */
      onClick,
      rangeClasses: ['SelectableRange'],
    });
  },
  setDisable() {
    selectable.setDisable(true);
  },
  setEnable() {
    selectable.setDisable(false);
  },
  setScale(scale) {
    selectable.setScale(scale);
  },
  refresh() {
    selectable.refresh();
  },
};
