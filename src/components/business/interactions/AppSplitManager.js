import SplitFactory from '../../global/CT-UI-Split/split';
import AppDroppableManager from './AppDroppableManager';
import AppDragManager from './AppDragManager';
import AppSelectableManager from './AppSelectableManager';

let splitV;
let splitH;
let App;

function onSplitVStart() {
  splitH.setDisable(true);
  AppDroppableManager.setDisable();
  AppDragManager.setDisable();
  AppSelectableManager.setDisable();
  App.activeShapeEnable();
}

function onSplitVSuccess() {

}

function onSplitVEnd() {
  splitH.setDisable(false);
  AppDroppableManager.setEnable();
  AppDragManager.setEnable();
  AppSelectableManager.setEnable();
  App.activeShapeEnable();
}

function onSplitHStart() {
  splitV.setDisable(true);
  AppDroppableManager.setDisable();
  AppDragManager.setDisable();
  AppSelectableManager.setDisable();
  App.activeShapeEnable();
}

function onSplitHSuccess() {

}

function onSplitHEnd() {
  splitV.setDisable(false);
  AppDroppableManager.setEnable();
  AppDragManager.setEnable();
  AppSelectableManager.setEnable();
  App.activeShapeEnable();
}

export default {
  init({ el, subEl, App: AppIns }) {
    App = AppIns;

    /**
     * 初始化Split vertical
     */
    splitV = SplitFactory.create(el, {
      direction: 'vertical',
      onStart: onSplitVStart,
      onSuccess: onSplitVSuccess,
      onEnd: onSplitVEnd,
    });

    /**
     * 初始化Split horizontal
     */
    splitH = SplitFactory.create(subEl, {
      direction: 'horizontal',
      onStart: onSplitHStart,
      onSuccess: onSplitHSuccess,
      onEnd: onSplitHEnd,
    });
  },
  setHDisable() {
    splitH.setDisable(true);
  },
  setVDisable() {
    splitV.setDisable(true);
  },
  setHEnable() {
    splitH.setDisable(false);
  },
  setVEnable() {
    splitV.setDisable(false);
  },
  setDisable() {
    this.setHDisable();
    this.setVDisable();
  },
  setEnable() {
    this.setHEnable();
    this.setVEnable();
  },
};
