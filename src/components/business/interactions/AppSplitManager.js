import SplitFactory from '../../global/CT-UI-Split/split';
import AppDroppableManager from './AppDroppableManager';
import AppDragManager from './AppDragManager';
import AppSelectableManager from './AppSelectableManager';
import AppResizeableManager from './AppResizeableManager';

let splitV;
let splitH;
let App;

function onSplitVStart() {
  // console.log('onSplitVStart');
  splitH.setDisable(true);
  AppDroppableManager.setDisable();
  AppDragManager.setDisable();
  AppResizeableManager.setDisable();
  AppSelectableManager.setDisable();
  // App.activeShapeEnable();
}

function onSplitVSuccess() {

}

function onSplitVEnd() {
  // console.log('onSplitVEnd');
  splitH.setDisable(false);
  AppDroppableManager.setEnable();
  AppDragManager.setEnable();
  AppResizeableManager.setEnable();
  AppSelectableManager.setEnable();
  // App.activeShapeEnable();
}

function onSplitHStart() {
  // console.log('onSplitHStart');
  splitV.setDisable(true);
  AppDroppableManager.setDisable();
  AppDragManager.setDisable();
  AppResizeableManager.setDisable();
  AppSelectableManager.setDisable();
  // App.activeShapeEnable();
}

function onSplitHSuccess() {

}

function onSplitHEnd() {
  // console.log('onSplitHEnd');
  splitV.setDisable(false);
  AppDroppableManager.setEnable();
  AppDragManager.setEnable();
  AppResizeableManager.setEnable();
  AppSelectableManager.setEnable();
  // App.activeShapeEnable();
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
