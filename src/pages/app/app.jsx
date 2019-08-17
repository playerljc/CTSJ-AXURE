import React from 'react';
import ReactDOM from 'react-dom';
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
import Modal from '../../model/Model';
import Register from '../../components/library/Register';

import './app.less';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onAddTab = this.onAddTab.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onRemoveTab = this.onRemoveTab.bind(this);
  }

  componentDidMount() {
    this.initEvents();
    this.initSplit();
    this.initDroppable();
    this.initResizeable();
    this.initDrag();
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.remove(Actions.components.business.canvaspanel.tabchange, this.onChangeTab);
    Emitter.remove(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
  }

  initEvents() {
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.tabchange, this.onChangeTab);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
  }

  initSplit() {
    /**
     * 初始化Split vertical
     */
    this.splitV = SplitFactory.create(this.el, {
      direction: 'vertical',
      onStart: () => {

      },
      onSuccess: () => {

      },
    });

    /**
     * 初始化Split horizontal
     */
    this.splitH = SplitFactory.create(this.subEl, {
      direction: 'horizontal',
      onStart: () => {
        this.droppable.setDisable(true);
        this.drag.setDisable(true);
        this.resizeable.setDisable(true);
      },
      onSuccess: () => {
        this.droppable.setDisable(false);
        this.drag.setDisable(false);
        this.resizeable.setDisable(false);
      },
    });
  }

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
        const groupKKey = cloneSourceEl.dataset.groupkey;
        const componentKey = cloneSourceEl.dataset.componentkey;
        const pageId = targetEls[0].dataset.pageid;
        const el = Dom6.createElement('<div></div>');
        const Component = Register.get(groupKKey).get(componentKey);
        ReactDOM.render(
          <Component.Component
            groupKKey={groupKKey}
            componentKey={componentKey}
            number={Modal.get(pageId).length + 1}
            getInstance={(ins) => {
              Modal.add(pageId, ins);
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
        this.resizeable.setDisable(false);
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

  initDrag() {
    this.drag = DragFactory.create(this.subEl, {
      mode: 'clone',
      showMap: true,
      moveStep: 1,
      onStart: (el, sourceEl) => {
        this.splitV.setDisable(true);
        this.splitH.setDisable(true);
        this.droppable.setDisable(true);
        this.resizeable.setDisable(true);
        // const resizeGroup = this.resizeable.getGroup(el);
        // if (resizeGroup) {
        //   resizeGroup.setDisable(true);
        // }
      },
      onEnd: (el, sourceEl) => {
        this.splitV.setDisable(false);
        this.splitH.setDisable(false);
        this.resizeable.setDisable(false);
        this.droppable.setDisable(false);
        // const resizeGroup = this.resizeable.getGroup(el);
        // if (resizeGroup) {
        //   resizeGroup.setDisable(false);
        // }
      },
    });
  }

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

  onAddTab() {
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
  }

  onChangeTab() {
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
  }

  onRemoveTab({ removeKey, activeKey }) {
    Modal.removePage(removeKey);
    this.droppable.refresh();
    this.drag.refresh();
    this.resizeable.refresh();
  }

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
