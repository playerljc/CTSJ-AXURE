import DragFactory from '../../global/CT-UI-Drag/drag';

import ShapeModel from '../../../model/ShapeModel';
import RangeSelectManager from './RangeSelectManager';

import { RANGESELECTPREFIX } from '../../../util/Constant';
import Emitter from '../../../util/Emitter';
import Actions from '../../../util/Actions';

import ActiveShapeManager from './ActiveShapeManager';
import AppDroppableManager from './AppDroppableManager';
import AppSelectableManager from './AppSelectableManager';
import AppResizeableManager from './AppResizeableManager';
import AppSplitManager from './AppSplitManager';

let drag;
let App;

/**
 * onStart
 * @param el
 * @param sourceEl
 * @return {boolean}
 */
function onStart(el, sourceEl) {
// console.log('Drag Start');
  if (!el || !sourceEl) return false;
  // drag点击
  AppSplitManager.setDisable();
  AppDroppableManager.setDisable();
  AppResizeableManager.setDisable();
  AppSelectableManager.setDisable();
}

/**
 * @param e
 * @param el
 * @param sourceEl
 * @return {boolean}
 */
function onEnd(e, el, sourceEl) {
  if (!el || !sourceEl) return false;
  AppSplitManager.setEnable();
  AppDroppableManager.setEnable();
  AppSelectableManager.setEnable();

  const { shiftKey = false, path = []} = e;
  const pageId = App.getCurPageId();

  let curEl = sourceEl;
  let componentId = curEl.dataset.componentid;

  // @todo 按shift的Shape点击
  if (shiftKey) {
    const isRangeSelectShape = sourceEl.classList.contains(RANGESELECTPREFIX);
    if (isRangeSelectShape) {
      const index = path.findIndex(el => el === sourceEl);
      if (index !== -1) {
        curEl = path[index - 1];
      }
    }

    if (!curEl) return false;

    componentId = curEl.dataset.componentid;
    const shapes = ActiveShapeManager.getShape(pageId) || [];
    let index = shapes.indexOf(ShapeModel.getShape({ pageId, componentId }));
    let els;
    if (index !== -1) {
      // 当前节点是激活节点
      els = shapes.map(shape => shape.getEl());
      index = els.findIndex((el) => {
        return el.dataset.pageid === curEl.dataset.pageid &&
          el.dataset.componentid === curEl.dataset.componentid;
      });
      if (index !== -1) {
        els.splice(index, 1);
      }
    } else {
      // 当前节点不是激活节点
      els = shapes.map(shape => shape.getEl());
      els.push(curEl);
    }

    App.onSelectAll(els);
  } else {
    // @todo 正常Shape点击
    const rangeSelect = RangeSelectManager.get(App.getCurPageId());

    if (componentId) {
      const shape = ShapeModel.getShape({ pageId, componentId });
      const { style } = shape.getProperty();
      style.position = {
        left: curEl.offsetLeft,
        top: curEl.offsetTop,
      };
      shape.setPropertyByProps('style', style, () => {
        Emitter.trigger(Actions.components.library.component.stylechange, {
          pageId,
          componentId,
        });

        // 如果拖动的是一个节点
        App.clearRangeSelect();
        App.componentActive({ pageId, componentId });
      });
    } else {
      // 如果拖动的是RangeSelect
      if (rangeSelect) {
        // 刷新当前页面ResizeGroup
        App.resizeSelfEnable({
          groupEl: App.getCurPageEl(),
          resizeEl: rangeSelect.el,
        });
      }
    }
  }
}

export default {
  init({ canvasEl, App: AppIns }) {
    App = AppIns;

    drag = DragFactory.create(canvasEl, {
      mode: 'clone',
      showMap: true,
      moveStep: 1,
      infinite: true,
      showGuide: true,
      onStart,
      onEnd, /* ,
      onChange({ left, top }) {

      }, */
    });
  },
  setDisable() {
    drag.setDisable(true);
  },
  setEnable() {
    drag.setDisable(false);
  },
  setScale(scale) {
    drag.setScale(scale);
  },
  refresh() {
    drag.refresh();
  },
};
