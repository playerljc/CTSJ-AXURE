import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';

import SystemMenuBar from '../../components/business/layout/SystemMenuBar/SystemMenuBar';
import SystemToolBar from '../../components/business/layout/SystemToolBar/SystemToolBar';
import FunctionalPanel from '../../components/business/layout/FunctionalPanel/FunctionalPanel';
import PropertyPanel from '../../components/business/layout/PropertyPanel/PropertyPanel';
import CanvasPanel from '../../components/business/layout/CanvasPanel/CanvasPanel';
import { selectorPrefix as CanvasTabPanelScrollClassName } from '../../components/business/layout/CanvasPanel/CanvasTabPanel';

import ActiveShapManager from '../../components/business/interactions/ActiveShapManager/ActiveShapManager';

import SplitFactory from '../../components/global/CT-UI-Split/split';
import DroppableFactory from '../../components/global/CT-UI-Droppable/droppable';
import DragFactory from '../../components/global/CT-UI-Drag/drag';
import ResizeableFactory from '../../components/global/CT-UI-Resizeable/resizeable';
import SelectableFactory from '../../components/global/CT-UI-Selectable/selectable';

import Register from '../../components/library/Register';
import ComponentToolDragBaseHOC from '../../components/library/toolbox/ComponentToolDragBaseHOC';
import { CreateRangeSelectEl, getRect } from '../../components/library/component/RangeSelect';

import Actions from '../../util/Actions';
import Emitter from '../../util/Emitter';
import { Dom6 } from '../../util/CTMobile-UI-Util';

import ShapeModel from '../../model/ShapeModel';
import PageModel from '../../model/PageModel';


import './app.less';

/**
 * App
 */
class App extends React.Component {
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

    // 存储每一个页面active的Shape实例
    this.pageActiveShapeMap = new ActiveShapManager();

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
  }

  /**
   * initEvents
   */
  initEvents() {
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
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
       * @return {HTMLElement}
       */
      onDragClone: (sourceEl) => {
        return this.onDroppableDragClone(sourceEl);
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
      onStart: (el, sourceEl) => {
        console.log('Drag Start');
        if (!el || !sourceEl) return false;
        // drag点击
        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.resizeable.setDisable(true);
        this.selectable.setDisable(true);
      },
      onEnd: (el, sourceEl) => {
        if (!el || !sourceEl) return false;
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.selectable.setDisable(false);

        const pageId = this.curPageId;// sourceEl.dataset.pageid;
        const componentId = sourceEl.dataset.componentid;
        // 如果拖动的是一个节点
        if (componentId) {
          if (this.rangeSelect) {
            this.rangeSelect.clear();
            this.rangeSelect = null;
          }

          this.componentActive({ pageId, componentId });
        } else {
          // 如果拖动的是RangeSelect
          if (this.rangeSelect) {
            // 刷新当前页面ResizeGroup
            const resizeGroup = this.resizeable.getGroup(document.getElementById(this.curPageId));
            resizeGroup.refresh();
            resizeGroup.setDisable(false, false);
            const resize = resizeGroup.getResize(this.rangeSelect.el);
            if (resize) {
              resize.setDisable(false);
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
        this.selectable.setDisable(true);
        this.drag.setDisable(true);
      },
      onEnd: () => {
        // console.log('Resize End');
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
        this.selectable.setDisable(false);

        if (this.rangeSelect) {
          const { children = [] } = this.rangeSelect;
          this.rangeSelect.children = children.map((t) => {
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
       * @param {number} - incrementWidth
       * @param {number} - incrementHeight
       * @param {Object} - condition
       * @param {Function} - callback
       * @return {boolean}
       */
      onChange: ({ incrementWidth, incrementHeight, condition }, { handler, context }) => {
        if (!this.rangeSelect) return false;

        const { children = [] } = this.rangeSelect;
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
        console.log('选取包含的节点:', els.length);
        Array.from(els).forEach((el) => {
          const { pageid: pageId, componentid: componentId } = el.dataset;
          const shape = ShapeModel.getShape({ pageId, componentId });
          if (shape) {
            shape.rangeSelectActive();
          }
        });
      },
      /**
       * 选取中不包含的节点
       * @param {Array<HTMLElement>} - els
       */
      moveExclude: (els) => {
        console.log('选取不包含的节点:', els.length);
        Array.from(els).forEach((el) => {
          const { pageid: pageId, componentid: componentId } = el.dataset;
          const shape = ShapeModel.getShape({ pageId, componentId });
          if (shape) {
            shape.unRangeSelectActive();
          }
        });
      },
      /**
       * 选取结束后包含的节点
       * @param {Array<HTMLElement>} - els
       */
      upInclude: (els) => {
        console.log('upInclude');
        if (!els || els.length === 0) return false;

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
        console.log('选取结束包含的节点:', els.length);


        // 1.根据els计算出一个Rect
        // 2.赋值Rect的4个值,left,top,width,height

        // Drag的操作
        // 4.放入把克隆的els放入Rect中，并计算位置,隐藏els对象
        // 5.拖动结束删除Rect并更新隐藏的els的位置

        const targetEl = document.getElementById(this.curPageId);
        // 创建RangeSelecl
        this.rangeSelect = CreateRangeSelectEl(getRect(els), els);
        targetEl.appendChild(this.rangeSelect.el);

        // 刷新当前页面ResizeGroup
        const resizeGroup = this.resizeable.getGroup(targetEl);
        resizeGroup.refresh();
        resizeGroup.setDisable(false, false);
        // .可以当前激活的Shape的el可以resize
        const resize = resizeGroup.getResize(this.rangeSelect.el);
        if (resize) {
          resize.setDisable(false);
        }
      },
      /**
       * onStart
       * 开始进行选取
       */
      onStart: () => {
        console.log('selectStart');

        if (this.rangeSelect) {
          this.rangeSelect.clear();
          this.rangeSelect = null;
        }

        // 开始进行选取之前清除掉激活的Shape
        this.acitveShapeUnActive(this.curPageId);
        PageModel.get(this.curPageId).setActiveShape(null);
        Emitter.trigger(Actions.components.business.canvaspanel.activetab, this.curPageId);

        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.resizeable.setDisable(true);
        this.drag.setDisable(true);
      },
      /**
       * onEnd
       * 选取的结束
       */
      onEnd: () => {
        console.log('selectEnd');
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
      },
      /**
       * 页面的点击
       */
      onClick: () => {
        console.log('selectClick');
        if (this.rangeSelect) {
          this.rangeSelect.clear();
          this.rangeSelect = null;
        }

        this.acitveShapeUnActive(this.curPageId);
        PageModel.get(this.curPageId).setActiveShape(null);
        Emitter.trigger(Actions.components.business.canvaspanel.activetab, this.curPageId);
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
    const groupEl = document.getElementById(pageId);
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
   * @param {String} - pageId
   */
  activeShapeEnable() {
    const pageId = this.curPageId;
    const preActiveShapes = this.pageActiveShapeMap.getShape(pageId);
    if (preActiveShapes && preActiveShapes.length !== 0) {
      const groupEl = document.getElementById(pageId);
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
    const groupEl = document.getElementById(pageId);
    const resizeGroup = this.resizeable.getGroup(groupEl);
    resizeGroup.setDisable(false, false);
    // .可以当前激活的Shape的el可以resize
    const resize = this.getResizeByPageIdAndShape({ pageId, shape });
    if (resize) {
      resize.setDisable(false);
    }

    Emitter.trigger(Actions.components.library.component.active, {
      pageId,
      componentId,
    });
  }

  /**
   * onDroppablePutSuccess
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
    const el = Dom6.createElement('<div></div>');
    const ShapePropertyDefaultConfig = Register.get(groupKey).get(componentKey).propertyDefaultConfig();
    const Component = Register.get(groupKey).get(componentKey);
    ReactDOM.render(
      <Component.Component
        pageId={pageId}
        componentId={componentId}
        number={ShapeModel.getShapesByPage(pageId).length + 1}
        property={ShapePropertyDefaultConfig}
        getInstance={(ins) => {
          ShapeModel.add(ins);
        }}
      />, el
    );

    const targetEl = targetEls[0].querySelector(`.${CanvasTabPanelScrollClassName}-Scroll`);
    const sourceEl = el.firstElementChild;
    naturalRelease.fn.call(
      naturalRelease.context,
      targetEl,
      sourceEl
    );

    const resizeGroup = this.resizeable.getGroup(targetEl);
    resizeGroup.refresh();

    // 激活当前Shape
    this.componentActive({ pageId, componentId });

    // 清除rangeSelect
    if (this.rangeSelect) {
      this.rangeSelect.clear();
      this.rangeSelect = null;
    }

    return true;
  }

  /**
   * onDroppableDragClone
   * @param {HTMLElement} - sourceEl
   * @return {HTMLElement}
   */
  onDroppableDragClone(sourceEl) {
    const groupKey = sourceEl.dataset.groupkey;
    const componentKey = sourceEl.dataset.componentkey;
    const el = Dom6.createElement('<div></div>');
    const ShapePropertyDefaultConfig = Register.get(groupKey).get(componentKey).propertyDefaultConfig();
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
    this.curPageId = pageId;
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
    this.selectable.refresh();
  }

  /**
   * onChangeTab
   * 切换一个页面
   * @param {String} - pageId
   */
  onChangeTab(pageId) {
    this.curPageId = pageId;
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
    this.selectable.refresh();
  }

  /**
   * onRemoveTab
   * 删除一个页面
   * @param {String} - removeKey
   * @param {String} - activeKey
   */
  onRemoveTab({ removeKey, activeKey }) {
    this.curPageId = activeKey;
    this.pageActiveShapeMap.removeShape(removeKey);
    ShapeModel.removePage(removeKey);
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
    this.selectable.refresh();
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
          <SystemMenuBar />
          <SystemToolBar />
        </div>

        <div
          className="ct-split ct-split-main g-flex-auto g-flex horizontal"
          ref={(el) => {
            this.subEl = el;
          }}
        >
          <div className="g-flex-fixed ct-split-left">
            <FunctionalPanel />
          </div>
          <div
            className="g-flex-auto ct-split-main"
            ref={(el) => {
              this.canvasEl = el;
            }}
          >
            <CanvasPanel />
          </div>
          <div className="g-flex-fixed ct-split-right">
            <PropertyPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
