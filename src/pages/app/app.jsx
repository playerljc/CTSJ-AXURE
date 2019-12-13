import React from 'react';
import ReactDOM from 'react-dom';

import SystemMenuBar from '../../components/business/layout/SystemMenuBar/SystemMenuBar';
import SystemToolBar from '../../components/business/layout/SystemToolBar/SystemToolBar';
import FunctionalPanel from '../../components/business/layout/FunctionalPanel/FunctionalPanel';
import PropertyPanel from '../../components/business/layout/PropertyPanel/PropertyPanel';
import CanvasPanel from '../../components/business/layout/CanvasPanel/CanvasPanel';
import { selectPrefix as SummaryPanelSelectPrefix } from '../../components/business/layout/SummaryPanel/SummaryPanel';

// 存储每一个页面active的Shape实例,一个page里面有多个ActiveShape
import ActiveShapeManager from '../../components/business/interactions/ActiveShapeManager';
// 存储active的CanvasTabPanel
import ActivePageManaager from '../../components/business/interactions/ActivePageManager';
// 存储每一个页面的rangeSelect，一个page里面只有一个rangeSelect
import RangeSelectManager from '../../components/business/interactions/RangeSelectManager';
// 管理页面激活Shape的KeyBoard的bind和unBind
import ActiveShapeKeyBoardBind from '../../components/business/interactions/ActiveShapeKeyBoardBind';
// 管理激活Page的KeyBoard的bind和unBind
import ActivePageKeyBoardBind from '../../components/business/interactions/ActivePageKeyBoardBind';
// 管理激活Page的MouseWheel的bind和unBind
import ActivePageMouseWheelBind from '../../components/business/interactions/ActivePageMouseWheelBind';
import AppSplitManager from '../../components/business/interactions/AppSplitManager';
import AppDroppableManager from '../../components/business/interactions/AppDroppableManager';
import AppResizeableManager from '../../components/business/interactions/AppResizeableManager';
import AppSelectableManager from '../../components/business/interactions/AppSelectableManager';
import AppDragManager from '../../components/business/interactions/AppDragManager';

import Register from '../../components/library/Register';
import { CreateRangeSelectEl } from '../../components/library/component/RangeSelect';

import Actions from '../../util/Actions';
import Emitter from '../../util/Emitter';
import { Dom6 } from '../../util/CTMobile-UI-Util';
import ClipBoard from '../../util/ClipBoard';
import {
  PAST_XPOSITION_STEP,
  PAST_YPOSITION_STEP,
  DRSWRAPPREFIX,
} from '../../util/Constant';

import ShapeModel from '../../model/ShapeModel';
import OpenPageModel from '../../model/OpenPageModel';

import './app.less';

/**
 * App
 */
class App extends React.PureComponent {
  /**
   * App
   * @class App
   * @classdesc App
   * @param props
   */
  constructor(props) {
    super(props);

    this.EmitterRegister = [
      {
        action: Actions.components.business.canvaspanel.addtab,
        removeHandler: this.onAddTab,
        onHandler: ::this.onAddTab,
      },
      {
        action: Actions.components.business.canvaspanel.changetab,
        removeHandler: this.onChangeTab,
        onHandler: ::this.onChangeTab,
      },
      {
        action: Actions.components.business.canvaspanel.removetab,
        removeHandler: this.onRemoveTab,
        onHandler: ::this.onRemoveTab,
      },
      {
        action: Actions.components.business.canvaspanel.paste,
        removeHandler: this.onPaste,
        onHandler: ::this.onPaste,
      },
      {
        action: Actions.components.business.canvaspanel.selectall,
        removeHandler: this.onSelectAll,
        onHandler: ::this.onSelectAll,
      },
      {
        action: Actions.components.business.canvaspanel.mousewheel,
        removeHandler: this.onMouseWheel,
        onHandler: null,
      },
      {
        action: Actions.components.business.canvaspanel.removeshape,
        removeHandler: this.onRemoveShape,
        onHandler: ::this.onRemoveShape,
      },
      {
        action: Actions.components.library.component.active,
        removeHandler: this.onComponentActive,
        onHandler: ::this.onComponentActive,
      },
      {
        action: Actions.components.library.component.unactive,
        removeHandler: this.onUnComponentActive,
        onHandler: ::this.onUnComponentActive,
      },
    ];

    // 当前激活页面的pageId
    this.curPageId = '';
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.initEvents();
    AppSplitManager.init({ el: this.el, subEl: this.subEl, App: this });
    AppDroppableManager.init({ subEl: this.subEl, App: this });
    AppResizeableManager.init({ canvasEl: this.canvasEl, App: this });
    AppDragManager.init({ canvasEl: this.canvasEl, App: this });
    AppSelectableManager.init({ canvasEl: this.canvasEl, App: this });
  }

  /**
   * componentWillUnMount
   */
  componentWillUnMount() {
    this.EmitterRegister.forEach(({ action, removeHandler }) => {
      Emitter.remove(action, removeHandler);
    });
  }

  /**
   * initEvents
   */
  initEvents() {
    this.EmitterRegister.forEach(({ action, onHandler }) => {
      Emitter.on(action, onHandler);
    });
  }

  /**
   * getResizeByPageAndShape
   * @param {String} - pageId
   * @param {Shape} - shape
   * @return {Resize}
   */
  getResizeByPageIdAndShape({ pageId, shape }) {
    let resize;
    const groupEl = this.getPageEl(pageId);
    if (groupEl) {
      const resizeGroup = AppResizeableManager.getGroup(groupEl);
      if (resizeGroup) {
        resize = resizeGroup.getResize(shape.getEl());
      }
    }

    return resize;
  }

  /**
   * shapeUnActive
   * @param {String} - pageId
   */
  acitveShapeUnActive(pageId) {
    const preActiveShapes = ActiveShapeManager.getShape(pageId);
    if (preActiveShapes && preActiveShapes.length !== 0) {
      preActiveShapes.forEach((preActiveShape) => {
        // 取消样式Active
        preActiveShape.unActive();
        // 取消rangeSelectActive
        preActiveShape.unRangeSelectActive();
        // preActiveShape不能resize
        const resize = this.getResizeByPageIdAndShape({ pageId, shape: preActiveShape });
        if (resize) {
          resize.setDisable(true);
        }
      });
      ActiveShapeManager.removeShape(pageId);
    }
  }

  /**
   * activeShapeEnable
   */
  activeShapeEnable() {
    const pageId = this.curPageId;
    const preActiveShapes = ActiveShapeManager.getShape(pageId);
    if (preActiveShapes && preActiveShapes.length !== 0) {
      const groupEl = this.getPageEl(pageId);
      const resizeGroup = AppResizeableManager.getGroup(groupEl);
      resizeGroup.setDisable(false, false);

      preActiveShapes.forEach((preActiveShape) => {
        const resize = this.getResizeByPageIdAndShape({ pageId, shape: preActiveShape });
        if (resize) {
          resize.setDisable(false);
        }
      });
    }
  }

  /**
   * rangeSelectActive
   * @param {Array<HTMLElement>} - els
   */
  rangeSelectActive(els) {
    // console.log('选取包含的节点:', els.length);
    Array.from(els).forEach((el) => {
      const { pageid: pageId, componentid: componentId } = el.dataset;
      const shape = ShapeModel.getShape({ pageId, componentId });
      if (shape) {
        shape.rangeSelectActive();
      }
    });
  }

  /**
   * unRangeSelectActive
   * @param {Array<HTMLElement>} - els
   */
  unRangeSelectActive(els) {
    // console.log('选取不包含的节点:', els.length);
    Array.from(els).forEach((el) => {
      const { pageid: pageId, componentid: componentId } = el.dataset;
      const shape = ShapeModel.getShape({ pageId, componentId });
      if (shape) {
        shape.unRangeSelectActive();
      }
    });
  }

  /**
   * componentActive
   * @param {String} - pageId
   * @param {String} - componentId
   */
  componentActive({ pageId, componentId }) {
    const shape = ShapeModel.getShape({ pageId, componentId });

    if (!shape) return false;

    // preShape进行unActive的操作
    this.acitveShapeUnActive(pageId);

    // 一下三个调用Shape的active方法实现
    // .元素边框的变化
    // .属性面板初始化
    // .概要面板初始化
    shape.active();
    ActiveShapeManager.setShape({ pageId, shape });
    OpenPageModel.get(pageId).setActiveShape(shape);

    // .当前resize的group也可以resize
    const groupEl = this.getPageEl(pageId);
    const resizeGroup = AppResizeableManager.getGroup(groupEl);
    resizeGroup.setDisable(false, false);
    // .可以当前激活的Shape的el可以resize
    const resize = this.getResizeByPageIdAndShape({ pageId, shape });
    if (resize) {
      resize.setDisable(false);
    }

    // Emitter.trigger(Actions.components.library.component.active, {
    //   pageId,
    //   componentId,
    // });
  }

  /**
   * clearRangeSelect
   */
  clearRangeSelect() {
    const rangeSelect = RangeSelectManager.get(this.curPageId);
    if (rangeSelect) {
      rangeSelect.clear();
      RangeSelectManager.delete(this.curPageId);
    }
  }

  /**
   * resizeSelfEnable
   * @package {HtmlElement} - groupEl
   * @param {HTMLElement} - resizeEl
   */
  resizeSelfEnable({ groupEl, resizeEl }) {
    const resizeGroup = AppResizeableManager.getGroup(groupEl);
    resizeGroup.refresh();
    resizeGroup.setDisable(false, false);
    const resize = resizeGroup.getResize(resizeEl);
    if (resize) {
      resize.setDisable(false);
    }
  }

  /**
   * clearCurPageActiveShape
   */
  clearCurPageActiveShape() {
    this.acitveShapeUnActive(this.curPageId);
    OpenPageModel.get(this.curPageId).setActiveShape(null);
    Emitter.trigger(Actions.components.business.canvaspanel.activetab, this.curPageId);
  }

  /**
   * getCurPageEl
   * @return {HTMLElement}
   */
  getCurPageEl() {
    return this.getPageEl(this.curPageId);
  }

  /**
   * getCurPageId
   * @return {string}
   */
  getCurPageId() {
    return this.curPageId;
  }

  /**
   * getPageEl
   * @param {String} - pageId
   * @return {HTMLElement}
   */
  getPageEl(pageId) {
    return document.getElementById(pageId);
  }

  /**
   * createShape - 创建一个Shape
   * @param {String} - groupKey
   * @param {String} - componentKey
   * @param {String} - pageId
   * @param {String} - componentId
   * @param {Object} - property
   * @param {Function} - renderHandler
   */
  createShape({
    groupKey,
    componentKey,
    pageId,
    componentId,
    property,
    renderHandler,
  }) {
    // preShape进行unActive的操作
    this.acitveShapeUnActive(pageId);

    const el = Dom6.createElement(`<div class="${DRSWRAPPREFIX}"></div>`);
    const Component = Register.get(groupKey).get(componentKey);
    ReactDOM.render(
      <Component.Component
        pageId={pageId}
        componentId={componentId}
        // number={ShapeModel.getShapesByPage(pageId).length + 1}
        property={property}
        getInstance={(ins) => {
          ShapeModel.add(ins);
          renderHandler(el/* el.firstElementChild */);
        }}
      />, el
    );

    // renderHandler(el/* el.firstElementChild */);

    const resizeGroup = AppResizeableManager.getGroup(this.getPageEl(pageId));
    resizeGroup.refresh();

    // // 激活当前Shape
    // this.componentActive({ pageId, componentId });

    // 清除rangeSelect
    this.clearRangeSelect();

    Emitter.trigger(Actions.components.business.canvaspanel.addshape, { pageId, componentId });
  }

  /**
   * createActiveShape
   * @param {Object} - params
   */
  createActiveShape(params) {
    this.createShape(params);
    const { pageId, componentId } = params;
    // 激活当前Shape
    this.componentActive({ pageId, componentId });
  }

  /**
   * createRangeSelect
   * @param {Array<HTMLElement>} - els
   * @return {boolean}
   */
  createRangeSelect(els) {
    if (!els || els.length === 0) return false;

    // 如果只选择了一个节点
    if (els.length === 1) {
      const { pageid: pageId, componentid: componentId } = els[0].dataset;
      this.componentActive({ pageId, componentId });
      return false;
    }

    const elsArr = Array.from(els);
    elsArr.forEach((el) => {
      const { pageid: pageId, componentid: componentId } = el.dataset;
      const shape = ShapeModel.getShape({ pageId, componentId });
      ActiveShapeManager.setShape({ pageId, shape });
    });
    // console.log('选取结束包含的节点:', els.length);


    // 1.根据els计算出一个Rect
    // 2.赋值Rect的4个值,left,top,width,height

    // Drag的操作
    // 4.放入把克隆的els放入Rect中，并计算位置,隐藏els对象
    // 5.拖动结束删除Rect并更新隐藏的els的位置

    const targetEl = this.getCurPageEl();
    // 创建RangeSelecl
    const rangeSelect = CreateRangeSelectEl(els, this.curPageId);
    RangeSelectManager.set(this.curPageId, rangeSelect);
    targetEl.appendChild(rangeSelect.el);

    // 刷新当前页面ResizeGroup
    this.resizeSelfEnable({
      groupEl: targetEl,
      resizeEl: rangeSelect.el,
    });
  }

  /**
   * setDRDSScale
   * @param {SelectOptions} - scale
   */
  setDRDSScale(scale) {
    AppDroppableManager.setScale(scale);
    AppResizeableManager.setScale(scale);
    AppDragManager.setScale(scale);
    AppSelectableManager.setScale(scale);
  }

  /**
   * refreshDRDS
   */
  refreshDRDS() {
    AppDroppableManager.refresh();
    AppDragManager.refresh();
    AppResizeableManager.refresh();
    AppSelectableManager.refresh();
  }

  /**
   * onAddTab
   * 新增一个页面
   * @param {String} - pageId
   */
  onAddTab(pageId) {
    ActiveShapeKeyBoardBind.unBindKeyBoard(this.curPageId);
    ActivePageKeyBoardBind.unBindKeyBoard(this.curPageId);
    ActivePageMouseWheelBind.unBindMouseWheel(this.curPageId);
    ActivePageManaager.removePage(this.curPageId);

    this.curPageId = pageId;
    ActivePageManaager.setPage(this.curPageId, OpenPageModel.get(this.curPageId));
    ActivePageKeyBoardBind.bindKeyBoard(this.curPageId);
    ActivePageMouseWheelBind.bindMouseWheel(this.curPageId);

    this.refreshDRDS();

    const scale = ActivePageManaager.getPage(this.curPageId).getScale();
    this.setDRDSScale(scale);
  }

  /**
   * onChangeTab
   * 切换一个页面
   * @param {String} - pageId
   */
  onChangeTab(pageId) {
    ActiveShapeKeyBoardBind.unBindKeyBoard(this.curPageId);
    ActivePageKeyBoardBind.unBindKeyBoard(this.curPageId);
    ActivePageMouseWheelBind.unBindMouseWheel(this.curPageId);
    ActivePageManaager.removePage(this.curPageId);

    ActiveShapeKeyBoardBind.bindKeyBoard(pageId);

    this.curPageId = pageId;
    ActivePageManaager.setPage(this.curPageId, OpenPageModel.get(this.curPageId));
    ActivePageKeyBoardBind.bindKeyBoard(pageId);
    ActivePageMouseWheelBind.bindMouseWheel(pageId);

    this.refreshDRDS();

    const scale = ActivePageManaager.getPage(pageId).getScale();
    this.setDRDSScale(scale);
  }

  /**
   * onRemoveTab
   * 删除一个页面
   * @param {String} - removeKey
   * @param {String} - activeKey
   */
  onRemoveTab({ removeKey, activeKey }) {
    ActiveShapeKeyBoardBind.unBindKeyBoard(removeKey);
    ActivePageKeyBoardBind.unBindKeyBoard(removeKey);
    ActivePageMouseWheelBind.unBindMouseWheel(removeKey);
    ActivePageManaager.removePage(removeKey);
    ClipBoard.delete(removeKey);

    if (activeKey && this.curPageId !== activeKey) {
      ActiveShapeKeyBoardBind.bindKeyBoard(activeKey);
    }

    this.curPageId = activeKey;
    ActivePageManaager.setPage(this.curPageId, OpenPageModel.get(this.curPageId));
    if (activeKey && this.curPageId !== activeKey) {
      ActivePageKeyBoardBind.bindKeyBoard(this.curPageId);
      ActivePageMouseWheelBind.bindMouseWheel(this.curPageId);
    }
    ActiveShapeManager.removeShape(removeKey);
    ShapeModel.removePage(removeKey);

    this.refreshDRDS();

    const curPage = ActivePageManaager.getPage(this.curPageId);
    if (curPage) {
      const scale = curPage.getScale();
      this.setDRDSScale(scale);
    }
  }

  /**
   * onPaste
   * @param {Object} - clipBoardData
   */
  onPaste(clipBoardData = []) {
    clipBoardData.forEach((data) => {
      const {
        groupKey,
        componentKey,
        pageId,
        componentId,
        property,
        left,
        top,
        width,
        height,
        active,
      } = data;

      const handler = active ? this.createActiveShape : this.createShape;

      handler.call(this, {
        groupKey,
        componentKey,
        pageId,
        componentId,
        property,
        renderHandler: (el) => {
          const innerEl = el.firstElementChild;
          innerEl.style.position = 'absolute';

          // innerEl.style.left = `${left + PAST_XPOSITION_STEP}px`;
          // innerEl.style.top = `${top + PAST_YPOSITION_STEP}px`;
          // innerEl.style.width = `${width}px`;
          // innerEl.style.height = `${height}px`;

          const shape = ShapeModel.getShape({ pageId, componentId });
          const { style } = shape.getProperty();
          style.position.left = Math.floor(left + PAST_XPOSITION_STEP);
          style.position.top = Math.floor(top + PAST_YPOSITION_STEP);
          style.dimension.width = width;
          style.dimension.height = height;
          shape.setPropertyByProps('style', style, () => {
            this.getPageEl(pageId).appendChild(el);
          });
        },
      });
    });
  }

  /**
   * onSelectAll
   * @param {Array<HTMLElement>} - els
   */
  onSelectAll(els) {
    this.clearRangeSelect();
    this.clearCurPageActiveShape();
    this.rangeSelectActive(els);
    this.createRangeSelect(els);
  }

  /**
   * onMouseWheel
   */
  onMouseWheel(scale) {
    this.setDRDSScale(scale);
  }

  /**
   * onRemoveShape
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onRemoveShape({ pageId, componentId }) {
    this.clearRangeSelect();
    this.clearCurPageActiveShape();
  }

  /**
   * onComponentActive
   * @param {String} - from
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onComponentActive({ from, pageId, componentId }) {
    if (from !== SummaryPanelSelectPrefix) return false;
    AppSplitManager.setVEnable();
    AppSplitManager.setHEnable();
    AppDroppableManager.setEnable();
    AppSelectableManager.setEnable();

    // 如果拖动的是一个节点
    this.clearRangeSelect();
    this.componentActive({ pageId, componentId });
  }

  /**
   * onUnComponentActive
   * @param {String} - from
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onUnComponentActive({ from, pageId, componentId }) {
    if (from !== SummaryPanelSelectPrefix) return false;
    this.clearRangeSelect();
    this.clearCurPageActiveShape();
  }

  /**
   * render
   * @return {ReactElement}
   */
  render() {
    return (
      <div
        className="App ct-split g-flex vertical"
        ref={(el) => {
          this.el = el;
        }}
      >
        <div className="ct-split-top g-flex-fixed">
          {/* 菜单栏 */}
          <SystemMenuBar />
          {/* 工具栏 */}
          <SystemToolBar />
        </div>

        <div
          className="ct-split ct-split-main g-flex-auto g-flex horizontal"
          ref={(el) => {
            this.subEl = el;
          }}
        >
          <div className="g-flex-fixed ct-split-left">
            {/* 左侧 */}
            <FunctionalPanel />
          </div>
          <div
            className="g-flex-auto ct-split-main"
            ref={(el) => {
              this.canvasEl = el;
            }}
          >
            {/* Main */}
            <CanvasPanel />
          </div>
          <div className="g-flex-fixed ct-split-right">
            {/* 右侧 */}
            <PropertyPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
