import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';

import DroppableFactory from '../../global/CT-UI-Droppable/droppable';

import Register from '../../library/Register';
import ComponentToolDragBaseHOC from '../../library/toolbox/ComponentToolDragBaseHOC';

import ShapeModel from '../../../model/ShapeModel';
import { Dom6 } from '../../../util/CTMobile-UI-Util';

import AppDragManager from './AppDragManager';
import AppResizeableManager from './AppResizeableManager';
import AppSelectableManager from './AppSelectableManager';
import AppSplitManager from './AppSplitManager';

let droppable;
let App;

/**
 * onDroppablePutSuccess - 组件的添加
 * @param {HTMLElement} - cloneSourceEl
 * @param {Function} - naturalRelease
 * @param {Array<HTMLElement>} - targetEls
 * @param {Object} - rect
 * @param {HTMLElement} - sourceEl
 * @return {boolean}
 */
function onPutSuccess({
  cloneSourceEl,
  naturalRelease,
  // rect,
  // sourceEl,
  targetEls,
}) {
  const { groupkey: groupKey, componentkey: componentKey } = cloneSourceEl.dataset;
  const componentId = uuidv1();
  const pageId = App.getCurPageId();
  const property = Register.get(groupKey).get(componentKey).propertyDefaultConfig();

  property.style.zIndex = ShapeModel.getShapesByPage(pageId).length + 1;

  App.createActiveShape({
    groupKey,
    componentKey,
    pageId,
    componentId,
    property,
    renderHandler: (el) => {
      const position = naturalRelease.fn.call(
        naturalRelease.context,
        App.getPageEl(pageId),
        el
      );

      const shape = ShapeModel.getShape({ pageId, componentId });
      const { style } = shape.getProperty();
      style.position.left = Math.floor(position.left);
      style.position.top = Math.floor(position.top);
      shape.setPropertyByProps('style', style);
    },
  });

  return true;
}

/**
 * onDroppableDragClone
 * @param {HTMLElement} - sourceEl
 * @param {Checkbox} - scale
 * @return {HTMLElement}
 */
function onDragClone(sourceEl, scale) {
  const groupKey = sourceEl.dataset.groupkey;
  const componentKey = sourceEl.dataset.componentkey;
  const el = Dom6.createElement('<div></div>');
  const ShapePropertyDefaultConfig = Register.get(groupKey).get(componentKey).propertyDefaultConfig();
  const { style: { width, height } } = ShapePropertyDefaultConfig;
  ShapePropertyDefaultConfig.style.width = width * scale;
  ShapePropertyDefaultConfig.style.height = height * scale;
  const Component = ComponentToolDragBaseHOC({ groupKey, componentKey });
  ReactDOM.render(
    <Component property={ShapePropertyDefaultConfig} />, el
  );
  return el.firstElementChild;
}

/**
 * 触碰边缘的时候触发,并且滚动
 */
function onBoundaryDetection({
  condition,
  scroll,
  targetEls,
}) {
  scroll(condition, targetEls[0]);
}

function onStart() {
  // console.log('Droppable Start');
  AppSplitManager.setDisable();
  AppDragManager.setDisable();
  AppResizeableManager.setDisable();
  AppSelectableManager.setDisable();
}

function onEnd() {
  // console.log('Droppable End');
  AppSplitManager.setEnable();
  AppDragManager.setEnable();
  AppSelectableManager.setEnable();
}

export default {
  init({ subEl, App: AppIns }) {
    App = AppIns;

    droppable = DroppableFactory.create(subEl, {
      onPutSuccess,
      onDragClone,
      onBoundaryDetection,
      onStart,
      onEnd,
      // 拖动对象的附加样式，拖动移动起来后触发
      dragSourceExtendClasses: ['sourceActive'],
      // 可放置对象的附加样式，当拖动到可以放置的区域时触发
      dragTargetExtendClasses: ['targetActive'],
      // 拖动后原始节点是否显示
      isDragSourceDisplay: true,
      // 拖动之后原始节点是否存在
      isDragSourceExist: true,
      // 不可放置的时候松开是否有动画返回效果
      noDragReturnAnimate: true,
      inclusionRelation: false,
      infinite: true,
    });
  },
  setDisable() {
    droppable.setDisable(true);
  },
  setEnable() {
    droppable.setDisable(false);
  },
  setScale(scale) {
    droppable.setScale(scale);
  },
  refresh() {
    droppable.refresh();
  },
};
