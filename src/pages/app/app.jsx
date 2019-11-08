import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';

import SystemMenuBar from '../../components/business/layout/SystemMenuBar/SystemMenuBar';
import SystemToolBar from '../../components/business/layout/SystemToolBar/SystemToolBar';
import FunctionalPanel from '../../components/business/layout/FunctionalPanel/FunctionalPanel';
import PropertyPanel from '../../components/business/layout/PropertyPanel/PropertyPanel';
import CanvasPanel from '../../components/business/layout/CanvasPanel/CanvasPanel';
import { selectPrefix as SummaryPanelSelectPrefix } from '../../components/business/layout/SummaryPanel/SummaryPanel';

import ActiveShapeManager from '../../components/business/interactions/ActiveShapeManager';
import ActivePageManaager from '../../components/business/interactions/ActivePageManager';
import RangeSelectManager from '../../components/business/interactions/RangeSelectManager';
import ActiveShapeKeyBoardBind from '../../components/business/interactions/ActiveShapeKeyBoardBind';
import ActivePageKeyBoardBind from '../../components/business/interactions/ActivePageKeyBoardBind';
import ActivePageMouseWheelBind from '../../components/business/interactions/ActivePageMouseWheelBind';

import SplitFactory from '../../components/global/CT-UI-Split/split';
import DroppableFactory from '../../components/global/CT-UI-Droppable/droppable';
import DragFactory from '../../components/global/CT-UI-Drag/drag';
import ResizeableFactory from '../../components/global/CT-UI-Resizeable/resizeable';
import SelectableFactory from '../../components/global/CT-UI-Selectable/selectable';

import Register from '../../components/library/Register';
import ComponentToolDragBaseHOC from '../../components/library/toolbox/ComponentToolDragBaseHOC';
import { CreateRangeSelectEl } from '../../components/library/component/RangeSelect';

import Actions from '../../util/Actions';
import Emitter from '../../util/Emitter';
import { Dom6 } from '../../util/CTMobile-UI-Util';
import ClipBoard from '../../util/ClipBoard';
import {
  PAST_XPOSITION_STEP,
  PAST_YPOSITION_STEP,
  DRSWRAPPREFIX,
  RANGESELECTPREFIX,
} from '../../util/Constant';

import ShapeModel from '../../model/ShapeModel';
import PageModel from '../../model/PageModel';

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

    this.onAddTab = this.onAddTab.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onRemoveTab = this.onRemoveTab.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onRemoveShape = this.onRemoveShape.bind(this);

    this.onComponentActive = this.onComponentActive.bind(this);
    this.onUnComponentActive = this.onUnComponentActive.bind(this);

    // 存储每一个页面active的Shape实例,一个page里面有多个ActiveShape
    this.pageActiveShapeMap = ActiveShapeManager;

    // 存储active的CanvasTabPanel
    this.activePageMap = ActivePageManaager;

    // 存储每一个页面的rangeSelect，一个page里面只有一个rangeSelect
    this.rangeSelectMap = RangeSelectManager;

    // 管理页面激活Shape的KeyBoard的bind和unBind
    this.activeShapeKeyBoardBind = ActiveShapeKeyBoardBind;

    // 管理激活Page的KeyBoard的bind和unBind
    this.activePageKeyBoardBind = ActivePageKeyBoardBind;

    // 管理激活Page的MouseWheel的bind和unBind
    this.activePageMouseWheelBind = ActivePageMouseWheelBind;

    // 当前激活页面的pageId
    this.curPageId = '';
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.initEvents();
    this.initSplit();
    this.initDroppable();
    this.initResizeable();
    this.initDrag();
    this.initSelectable();
  }

  /**
   * componentWillUnMount
   */
  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.remove(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.remove(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
    Emitter.remove(Actions.components.business.canvaspanel.paste, this.onPaste);
    Emitter.remove(Actions.components.business.canvaspanel.selectall, this.onSelectAll);
    Emitter.remove(Actions.components.business.canvaspanel.mousewheel, this.onMouseWheel);
    Emitter.remove(Actions.components.business.canvaspanel.removeshape, this.onRemoveShape);

    Emitter.remove(Actions.components.library.component.active, this.onComponentActive);
    Emitter.remove(Actions.components.library.component.unactive, this.onUnComponentActive);
  }

  /**
   * initEvents
   */
  initEvents() {
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
    Emitter.on(Actions.components.business.canvaspanel.paste, this.onPaste);
    Emitter.on(Actions.components.business.canvaspanel.selectall, this.onSelectAll);
    Emitter.on(Actions.components.business.canvaspanel.mousewheel, this.onMouseWheel);
    Emitter.on(Actions.components.business.canvaspanel.removeshape, this.onRemoveShape);

    Emitter.on(Actions.components.library.component.active, this.onComponentActive);
    Emitter.on(Actions.components.library.component.unactive, this.onUnComponentActive);
  }

  /**
   * initSplit
   */
  initSplit() {
    /**
     * 初始化Split vertical
     */
    this.splitV = SplitFactory.create(this.el, {
      direction: 'vertical',
      onStart: () => {
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.drag.setDisable(true);
        this.selectable.setDisable(true);
        this.activeShapeEnable();
      },
      onSuccess: () => {

      },
      onEnd: () => {
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
        this.selectable.setDisable(false);
        this.activeShapeEnable();
      },
    });

    /**
     * 初始化Split horizontal
     */
    this.splitH = SplitFactory.create(this.subEl, {
      direction: 'horizontal',
      onStart: () => {
        this.splitV.setDisable(true);
        this.droppable.setDisable(true);
        this.drag.setDisable(true);
        this.selectable.setDisable(true);
        this.activeShapeEnable();
      },
      onSuccess: () => {

      },
      onEnd: () => {
        this.splitV.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
        this.selectable.setDisable(false);
        this.activeShapeEnable();
      },
    });
  }

  /**
   * initDroppable
   */
  initDroppable() {
    this.droppable = DroppableFactory.create(this.subEl, {
      /**
       * 放置在可滚动的元素内
       * @param {Object} - params
       * @return {boolean}
       */
      onPutSuccess: (params) => {
        return this.onDroppablePutSuccess(params);
      },
      /**
       * onDragClone
       * @param {HTMLElement} - sourceEl
       * @param {Number} - scale
       * @return {HTMLElement}
       */
      onDragClone: (sourceEl, scale) => {
        return this.onDroppableDragClone(sourceEl, scale);
      },
      /**
       * 触碰边缘的时候触发,并且滚动
       */
      onBoundaryDetection: ({
        condition,
        scroll,
        targetEls,
      }) => {
        scroll(condition, targetEls[0]);
      },
      onStart: () => {
        // console.log('Droppable Start');
        this.splitH.setDisable(true);
        this.splitV.setDisable(true);
        this.drag.setDisable(true);
        this.resizeable.setDisable(true);
        this.selectable.setDisable(true);
      },
      onEnd: () => {
        // console.log('Droppable End');
        this.splitH.setDisable(false);
        this.splitV.setDisable(false);
        this.drag.setDisable(false);
        this.selectable.setDisable(false);
      },
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
  }

  /**
   * initDrag
   */
  initDrag() {
    this.drag = DragFactory.create(this.canvasEl, {
      mode: 'clone',
      showMap: true,
      moveStep: 1,
      infinite: true,
      showGuide: true,
      onStart: (el, sourceEl) => {
        // console.log('Drag Start');
        if (!el || !sourceEl) return false;
        // drag点击
        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.resizeable.setDisable(true);
        this.selectable.setDisable(true);
      },
      /**
       * @param e
       * @param el
       * @param sourceEl
       * @return {boolean}
       */
      onEnd: (e, el, sourceEl) => {
        if (!el || !sourceEl) return false;
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.selectable.setDisable(false);

        const { shiftKey = false, path = [] } = e;
        const pageId = this.curPageId;

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
          const shapes = this.pageActiveShapeMap.getShape(pageId) || [];
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

          this.onSelectAll(els);
        } else {
          // @todo 正常Shape点击
          const rangeSelect = this.rangeSelectMap.get(this.curPageId);
          if (componentId) {
            // 如果拖动的是一个节点
            this.clearRangeSelect();
            this.componentActive({ pageId, componentId });
          } else {
            // 如果拖动的是RangeSelect
            if (rangeSelect) {
              // 刷新当前页面ResizeGroup
              this.resizeSelfEnable({
                groupEl: this.getCurPageEl(),
                resizeEl: rangeSelect.el,
              });
            }
          }
        }
      },
    });
  }

  /**
   * initResizeable
   */
  initResizeable() {
    this.resizeable = ResizeableFactory.create(this.canvasEl, {
      onStart: () => {
        // console.log('Resize Start');
        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.drag.setDisable(true);
        this.selectable.setDisable(true);
      },
      onEnd: () => {
        // console.log('Resize End');
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
        this.selectable.setDisable(false);

        const rangeSelect = this.rangeSelectMap.get(this.curPageId);
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
      },
      /**
       * 当resizeable有变化的时候
       * @param {HTMLElement} - curEl
       * @param {number} - incrementWidth
       * @param {number} - incrementHeight
       * @param {Object} - condition
       * @param {Function} - callback
       * @return {boolean}
       */
      onChange: (
        curEl,
        {
          incrementWidth,
          incrementHeight,
          condition,
        },
        {
          handler,
          context,
        }
      ) => {
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

        const rangeSelect = this.rangeSelectMap.get(this.curPageId);
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
      },
    });
  }

  /**
   * initSelectable
   */
  initSelectable() {
    this.selectable = SelectableFactory.create(this.canvasEl, {
      /**
       * 选取中包含的节点
       * @param {Array<HTMLElement>} - els
       */
      moveInclude: (els) => {
        this.rangeSelectActive(els);
      },
      /**
       * 选取中不包含的节点
       * @param {Array<HTMLElement>} - els
       */
      moveExclude: (els) => {
        this.unRangeSelectActive(els);
      },
      /**
       * 选取结束后包含的节点
       * @param {Array<HTMLElement>} - els
       */
      upInclude: (els) => {
        this.createRangeSelect(els);
      },
      /**
       * onStart
       * 开始进行选取
       */
      onStart: () => {
        // console.log('selectStart');
        this.clearRangeSelect();

        // 开始进行选取之前清除掉激活的Shape
        this.clearCurPageActiveShape();

        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.drag.setDisable(true);
        this.resizeable.setDisable(true);
      },
      /**
       * onEnd
       * 选取的结束
       */
      onEnd: () => {
        // console.log('selectEnd');
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
      },
      /**
       * @todo 页面的点击
       */
      onClick: () => {
        // console.log('selectClick');
        this.clearRangeSelect();
        this.clearCurPageActiveShape();
      },
      rangeClasses: ['SelectableRange'],
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
      const resizeGroup = this.resizeable.getGroup(groupEl);
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
    const preActiveShapes = this.pageActiveShapeMap.getShape(pageId);
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
      this.pageActiveShapeMap.removeShape(pageId);
    }
  }

  /**
   * activeShapeEnable
   */
  activeShapeEnable() {
    const pageId = this.curPageId;
    const preActiveShapes = this.pageActiveShapeMap.getShape(pageId);
    if (preActiveShapes && preActiveShapes.length !== 0) {
      const groupEl = this.getPageEl(pageId);
      const resizeGroup = this.resizeable.getGroup(groupEl);
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
    this.pageActiveShapeMap.setShape({ pageId, shape });
    PageModel.get(pageId).setActiveShape(shape);

    // .当前resize的group也可以resize
    const groupEl = this.getPageEl(pageId);
    const resizeGroup = this.resizeable.getGroup(groupEl);
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
    const rangeSelect = this.rangeSelectMap.get(this.curPageId);
    if (rangeSelect) {
      rangeSelect.clear();
      this.rangeSelectMap.delete(this.curPageId);
    }
  }

  /**
   * resizeSelfEnable
   * @package {HtmlElement} - groupEl
   * @param {HTMLElement} - resizeEl
   */
  resizeSelfEnable({ groupEl, resizeEl }) {
    const resizeGroup = this.resizeable.getGroup(groupEl);
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
    PageModel.get(this.curPageId).setActiveShape(null);
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

    const resizeGroup = this.resizeable.getGroup(this.getPageEl(pageId));
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
      this.pageActiveShapeMap.setShape({ pageId, shape });
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
    this.rangeSelectMap.set(this.curPageId, rangeSelect);
    targetEl.appendChild(rangeSelect.el);

    // 刷新当前页面ResizeGroup
    this.resizeSelfEnable({
      groupEl: targetEl,
      resizeEl: rangeSelect.el,
    });
  }

  /**
   * setDRDSScale
   * @param {Number} - scale
   */
  setDRDSScale(scale) {
    this.droppable.setScale(scale);
    this.resizeable.setScale(scale);
    this.drag.setScale(scale);
    this.selectable.setScale(scale);
  }

  /**
   * refreshDRDS
   */
  refreshDRDS() {
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
    this.selectable.refresh();
  }

  /**
   * onDroppablePutSuccess - 组件的添加
   * @param {HTMLElement} - cloneSourceEl
   * @param {Function} - naturalRelease
   * @param {Array<HTMLElement>} - targetEls
   * @param {Object} - rect
   * @param {HTMLElement} - sourceEl
   * @return {boolean}
   */
  onDroppablePutSuccess({
    cloneSourceEl,
    naturalRelease,
    // rect,
    // sourceEl,
    targetEls,
  }) {
    const { groupkey: groupKey, componentkey: componentKey } = cloneSourceEl.dataset;
    const componentId = uuidv1();
    const { curPageId: pageId } = this;
    const property = Register.get(groupKey).get(componentKey).propertyDefaultConfig();

    property.style.zIndex = ShapeModel.getShapesByPage(pageId).length + 1;

    this.createActiveShape({
      groupKey,
      componentKey,
      pageId,
      componentId,
      property,
      renderHandler: (el) => {
        const position = naturalRelease.fn.call(
          naturalRelease.context,
          this.getPageEl(pageId),
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
   * @param {Number} - scale
   * @return {HTMLElement}
   */
  onDroppableDragClone(sourceEl, scale) {
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
   * onAddTab
   * 新增一个页面
   * @param {String} - pageId
   */
  onAddTab(pageId) {
    this.activeShapeKeyBoardBind.unBindKeyBoard(this.curPageId);
    this.activePageKeyBoardBind.unBindKeyBoard(this.curPageId);
    this.activePageMouseWheelBind.unBindMouseWheel(this.curPageId);
    this.activePageMap.removePage(this.curPageId);

    this.curPageId = pageId;
    this.activePageMap.setPage(this.curPageId, PageModel.get(this.curPageId));
    this.activePageKeyBoardBind.bindKeyBoard(this.curPageId);
    this.activePageMouseWheelBind.bindMouseWheel(this.curPageId);

    this.refreshDRDS();

    const scale = this.activePageMap.getPage(this.curPageId).getScale();
    this.setDRDSScale(scale);
  }

  /**
   * onChangeTab
   * 切换一个页面
   * @param {String} - pageId
   */
  onChangeTab(pageId) {
    this.activeShapeKeyBoardBind.unBindKeyBoard(this.curPageId);
    this.activePageKeyBoardBind.unBindKeyBoard(this.curPageId);
    this.activePageMouseWheelBind.unBindMouseWheel(this.curPageId);
    this.activePageMap.removePage(this.curPageId);

    this.activeShapeKeyBoardBind.bindKeyBoard(pageId);

    this.curPageId = pageId;
    this.activePageMap.setPage(this.curPageId, PageModel.get(this.curPageId));
    this.activePageKeyBoardBind.bindKeyBoard(pageId);
    this.activePageMouseWheelBind.bindMouseWheel(pageId);

    this.refreshDRDS();

    const scale = this.activePageMap.getPage(pageId).getScale();
    this.setDRDSScale(scale);
  }

  /**
   * onRemoveTab
   * 删除一个页面
   * @param {String} - removeKey
   * @param {String} - activeKey
   */
  onRemoveTab({ removeKey, activeKey }) {
    this.activeShapeKeyBoardBind.unBindKeyBoard(removeKey);
    this.activePageKeyBoardBind.unBindKeyBoard(removeKey);
    this.activePageMouseWheelBind.unBindMouseWheel(removeKey);
    this.activePageMap.removePage(removeKey);
    ClipBoard.delete(removeKey);

    if (activeKey && this.curPageId !== activeKey) {
      this.activeShapeKeyBoardBind.bindKeyBoard(activeKey);
    }

    this.curPageId = activeKey;
    this.activePageMap.setPage(this.curPageId, PageModel.get(this.curPageId));
    if (activeKey && this.curPageId !== activeKey) {
      this.activePageKeyBoardBind.bindKeyBoard(this.curPageId);
      this.activePageMouseWheelBind.bindMouseWheel(this.curPageId);
    }
    this.pageActiveShapeMap.removeShape(removeKey);
    ShapeModel.removePage(removeKey);

    this.refreshDRDS();

    const curPage = this.activePageMap.getPage(this.curPageId);
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
    this.splitV.setDisable(false);
    this.splitH.setDisable(false);
    this.droppable.setDisable(false);
    this.selectable.setDisable(false);

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
