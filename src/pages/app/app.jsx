import React from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';
import SystemMenuBar from '../../components/business/SystemMenuBar/SystemMenuBar';
import SystemToolBar from '../../components/business/SystemToolBar/SystemToolBar';
import FunctionalPanel from '../../components/business/FunctionalPanel/FunctionalPanel';
import PropertyPanel from '../../components/business/PropertyPanel/PropertyPanel';
import CanvasPanel from '../../components/business/CanvasPanel/CanvasPanel';

import SplitFactory from '../../components/global/CT-UI-Split/split';
import DroppableFactory from '../../components/global/CT-UI-Droppable/droppable';
import DragFactory from '../../components/global/CT-UI-Drag/drag';
import ResizeableFactory from '../../components/global/CT-UI-Resizeable/resizeable';

import Actions from '../../util/Actions';
import Emitter from '../../util/Emitter';
import { Dom6 } from '../../util/CTMobile-UI-Util';
import Model from '../../model/Model';
import Register from '../../components/library/Register';

import './app.less';

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
    this.onLibraryComponentActive = this.onLibraryComponentActive.bind(this);

    // 存储每一个页面active的Shape实例
    this.pageActiveShapeMap = new Map();

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
  }

  /**
   * componentWillUnMount
   */
  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.remove(Actions.components.business.canvaspanel.tabchange, this.onChangeTab);
    Emitter.remove(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
    Emitter.remove(Actions.components.library.component.active, this.onLibraryComponentActive);
  }

  /**
   * initEvents
   */
  initEvents() {
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.tabchange, this.onChangeTab);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
    Emitter.on(Actions.components.library.component.active, this.onLibraryComponentActive);
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
        // this.resizeable.setDisable(true);
        this.activeShapeEnable();
      },
      onSuccess: () => {
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
        this.activeShapeEnable();
        // this.resizeable.setDisable(false);
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
        this.resizeable.setDisable(true);
      },
      onSuccess: () => {
        this.splitV.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
        this.resizeable.setDisable(false);
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
       * @param params
       * @return {boolean}
       */
      onPutSuccess: ({
        cloneSourceEl,
        naturalRelease,
        // rect,
        // sourceEl,
        targetEls,
      }) => {
        const groupKey = cloneSourceEl.dataset.groupkey;
        const componentKey = cloneSourceEl.dataset.componentkey;
        const componentId = uuidv1();
        const pageId = this.curPageId;// targetEls[0].dataset.pageid;
        const el = Dom6.createElement('<div></div>');
        const Component = Register.get(groupKey).get(componentKey);
        ReactDOM.render(
          <Component.Component
            // groupKKey={groupKey}
            // componentKey={componentKey}
            pageId={pageId}
            componentId={componentId}
            number={Model.getShapesByPage(pageId).length + 1}
            getInstance={(ins) => {
              Model.add(ins);
            }}
          />, el
        );

        const targetEl = targetEls[0].querySelector('.CanvasPanel-TabScroll');
        const sourceEl = el.firstElementChild;
        naturalRelease.fn.call(
          naturalRelease.context,
          targetEl,
          sourceEl
        );

        const resizeGroup = this.resizeable.getGroup(targetEl);
        resizeGroup.refresh();

        Emitter.trigger(Actions.components.library.component.active, {
          pageId,
          componentId,
        });

        return true;
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
        this.splitH.setDisable(true);
        this.splitV.setDisable(true);
        this.drag.setDisable(true);
        this.resizeable.setDisable(true);
      },
      onEnd: () => {
        this.splitH.setDisable(false);
        this.splitV.setDisable(false);
        this.drag.setDisable(false);
        // this.resizeable.setDisable(false);
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
    this.drag = DragFactory.create(this.subEl, {
      mode: 'clone',
      showMap: true,
      moveStep: 1,
      onStart: (el, sourceEl) => {
        if (!el || !sourceEl) return false;
        // drag点击
        console.log('drag', 'onStart');
        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.resizeable.setDisable(true);
      },
      onEnd: (el, sourceEl) => {
        if (!el || !sourceEl) return false;
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);

        // this.resizeable.setDisable(false);

        const pageId = this.curPageId;// sourceEl.dataset.pageid;
        const componentId = sourceEl.dataset.componentid;
        Emitter.trigger(Actions.components.library.component.active, {
          pageId,
          componentId,
        });
      },
    });
  }

  /**
   * initResizeable
   */
  initResizeable() {
    this.resizeable = ResizeableFactory.create(this.subEl, {
      onStart: () => {
        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.drag.setDisable(true);
      },
      onEnd: () => {
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
      },
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
    const preActiveShape = this.pageActiveShapeMap.get(pageId);
    if (preActiveShape) {
      // 取消样式
      preActiveShape.unActive();
      // preActiveShape不能resize
      const resize = this.getResizeByPageIdAndShape({ pageId, shape: preActiveShape });
      if (resize) {
        resize.setDisable(true);
      }
    }
  }

  /**
   * activeShapeEnable
   * @param {String} - pageId
   */
  activeShapeEnable() {
    const pageId = this.curPageId;
    const preActiveShape = this.pageActiveShapeMap.get(pageId);
    if (preActiveShape) {
      const groupEl = document.getElementById(pageId);
      const resizeGroup = this.resizeable.getGroup(groupEl);
      resizeGroup.setDisable(false, false);

      const resize = this.getResizeByPageIdAndShape({ pageId, shape: preActiveShape });
      if (resize) {
        resize.setDisable(false);
      }
    }
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
  }

  /**
   * onChangeTab
   * 切换一个页面
   */
  onChangeTab(pageId) {
    this.curPageId = pageId;
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
  }

  /**
   * onRemoveTab
   * 删除一个页面
   * @param {String} - removeKey
   * @param {String} - activeKey
   */
  onRemoveTab({ removeKey, activeKey }) {
    this.curPageId = activeKey;
    this.pageActiveShapeMap.delete(removeKey);
    Model.removePage(removeKey);
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
  }

  /**
   * onLibraryComponentActive
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onLibraryComponentActive({ pageId, componentId }) {
    const Shape = Model.getShape({ pageId, componentId });

    // preShape进行unActive的操作
    this.acitveShapeUnActive(pageId);

    // 一下三个调用Shape的active方法实现
    // .元素边框的变化
    // .属性面板初始化
    // .概要面板初始化
    if (Shape) {
      Shape.active();
      this.pageActiveShapeMap.set(pageId, Shape);
    }

    // .当前resize的group也可以resize
    const groupEl = document.getElementById(pageId);
    const resizeGroup = this.resizeable.getGroup(groupEl);
    resizeGroup.setDisable(false, false);
    // .可以当前激活的Shape的el可以resize
    const resize = this.getResizeByPageIdAndShape({ pageId, shape: Shape });
    if (resize) {
      resize.setDisable(false);
    }
  }

  /**
   * render
   * @return {*}
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
