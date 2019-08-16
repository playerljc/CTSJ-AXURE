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
  }

  componentDidMount() {
    this.initEvents();
    this.initSplit();
    this.initDroppable();
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.remove(Actions.components.business.canvaspanel.tabchange, this.onChangeTab);
  }

  initEvents() {
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.tabchange, this.onChangeTab);
  }

  initSplit() {
    /**
     * 初始化Split vertical
     */
    SplitFactory.create(this.el, {
      direction: 'vertical',
    });

    /**
     * 初始化Split horizontal
     */
    SplitFactory.create(this.subEl, {
      direction: 'horizontal',
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
            getInstance={(ins) => {
              Modal.add(pageId, ins);
            }}
          />, el
        );

        naturalRelease.fn.call(
          naturalRelease.context,
          targetEls[0].querySelector('.CanvasPanel-TabScroll'),
          el.firstElementChild
        );
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
        // const demo5ScrollEl = this.demo5Scroll;
        // scroll(condition, demo5ScrollEl);
        scroll(condition, targetEls[0]);
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

  onAddTab() {
    this.droppable.refresh();

    const dragEls = Array.from(this.canvasEl.querySelectorAll('.ct-drag'));
    dragEls.forEach((el) => {
      DragFactory.create(el, {
        mode: 'clone',
        showMap: true,
        moveStep: 1,
      });
    });
  }

  onChangeTab() {
    this.droppable.refresh();
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
