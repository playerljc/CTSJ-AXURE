import React from 'react';

import ShapeModel from '../../../../model/ShapeModel';
import Register from '../../../library/Register';
import CanvasTabPanelProperty from '../CanvasPanel/property/CanvasTabPanelProperty';
import Emitter from '../../../../util/Emitter';
import Actions from '../../../../util/Actions';
import OpenPageModel from '../../../../model/OpenPageModel';

import './InteractivePanel.less';

const { Component } = React;

const selectorPrefix = 'InteractivePanel';

/**
 * InteractivePanel
 * @class InteractivePanel
 * @classdesc InteractivePanel
 */
class InteractivePanel extends Component {
  constructor(props) {
    super(props);

    // 组件激活事件
    this.onComponentActive = this.onComponentActive.bind(this);
    // 页面添加
    this.onAddTab = this.onAddTab.bind(this);
    // 页面切换
    this.onChangeTab = this.onChangeTab.bind(this);
    // 页面删除
    this.onRemoveTab = this.onRemoveTab.bind(this);
    // 页面激活
    this.onActiveTab = this.onActiveTab.bind(this);

    this.state = {
      pageId: '',
      componentId: '',
    };
  }

  componentDidMount() {
    Emitter.on(Actions.components.library.component.active, this.onComponentActive);
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
    Emitter.on(Actions.components.business.canvaspanel.activetab, this.onActiveTab);
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.library.component.active, this.onComponentActive);
    Emitter.remove(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.remove(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.remove(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);
    Emitter.remove(Actions.components.business.canvaspanel.activetab, this.onActiveTab);
  }

  /**
   * onComponentActive
   * @param {Object} - params
   */
  onComponentActive(params) {
    this.setState({
      ...params,
    });
  }

  /**
   * onAddTab
   * @param pageId
   */
  onAddTab(pageId) {
    this.setState({
      pageId,
      componentId: '',
    });
  }

  /**
   * onChangeTab
   * @param pageId
   */
  onChangeTab(pageId) {
    this.setState({
      pageId,
      componentId: '',
    });
  }

  /**
   * onRemoveTab
   * @param {String} - removeKey
   * @param {String} - activeKey
   */
  onRemoveTab({ activeKey }) {
    this.setState({
      pageId: activeKey,
      componentId: '',
    });
  }

  /**
   * onActiveTab
   * @param pageId
   */
  onActiveTab(pageId) {
    this.setState({
      pageId,
      componentId: '',
    });
  }

  /**
   * getShapeComponent
   * @param shape
   */
  getShapeComponent(shape) {
    const el = shape ? shape.getEl() : null;
    const groupKey = el ? el.dataset.groupkey : null;
    const componentKey = el ? el.dataset.componentkey : null;
    const PropertyComponent =
      groupKey && componentKey ? Register.get(groupKey).get(componentKey) : null;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let Component = null;
    if (PropertyComponent) {
      Component = <PropertyComponent.Property shape={shape} />;
    }

    return Component;
  }

  /**
   * renderComponent
   * @return {ReactElement}
   */
  renderComponent() {
    const { pageId, componentId } = this.state;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    let Component = null;

    if (pageId) {
      if (!componentId) {
        // page
        const page = OpenPageModel.get(pageId);
        if (page) {
          const shape = page.getActiveShape();
          if (!shape) {
            // unActiveShape
            Component = <CanvasTabPanelProperty page={page} />;
          } else {
            // activeShape
            Component = this.getShapeComponent(shape);
          }
        }
      } else {
        // shape
        const shape = ShapeModel.getShape({ pageId, componentId });
        Component = this.getShapeComponent(shape);
      }
    }

    return Component;
  }

  render() {
    return <div className={`${selectorPrefix}`}>{this.renderComponent()}</div>;
  }
}

export default InteractivePanel;
