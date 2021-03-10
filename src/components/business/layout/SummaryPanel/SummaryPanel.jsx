import React from 'react';

import Tree from '../../../global/CT-UI-Tree/Tree';

import Emitter from '../../../../util/Emitter';
import Actions from '../../../../util/Actions';

import ShapeModel from '../../../../model/ShapeModel';
import OpenPageModel from '../../../../model/OpenPageModel';

import Register from '../../../../components/library/Register';

import './SummaryPanel.less';

const { Component } = React;

const selectPrefix = 'SummaryPanel';

export { selectPrefix };

/**
 * SummaryPanel
 * @class SummaryPanel
 * @classdesc 概要面板
 */
class SummaryPanel extends Component {
  constructor(props) {
    super(props);

    // 当前激活页面的pageId
    this.state = {
      curPageId: '',
      data: [],
    };

    this.onAddTab = this.onAddTab.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onRemoveTab = this.onRemoveTab.bind(this);

    this.onAddShape = this.onAddShape.bind(this);
    this.onRemoveShape = this.onRemoveShape.bind(this);

    this.onComponentActive = this.onComponentActive.bind(this);
    this.onUnComponentActive = this.onUnComponentActive.bind(this);

    this.onComponentRangeSelectActive = this.onComponentRangeSelectActive.bind(this);
    this.onUnComponentRangeSelectActive = this.onUnComponentRangeSelectActive.bind(this);
  }

  componentDidMount() {
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);

    Emitter.on(Actions.components.business.canvaspanel.addshape, this.onAddShape);
    Emitter.on(Actions.components.business.canvaspanel.removeshape, this.onRemoveShape);

    Emitter.on(Actions.components.library.component.active, this.onComponentActive);
    Emitter.on(Actions.components.library.component.unactive, this.onUnComponentActive);
    Emitter.on(
      Actions.components.library.component.rangeselectactive,
      this.onComponentRangeSelectActive,
    );
    Emitter.on(
      Actions.components.library.component.unrangeselectactive,
      this.onUnComponentRangeSelectActive,
    );
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.remove(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.remove(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);

    Emitter.remove(Actions.components.business.canvaspanel.addshape, this.onAddShape);
    Emitter.remove(Actions.components.business.canvaspanel.removeshape, this.onRemoveShape);

    Emitter.remove(Actions.components.library.component.active, this.onComponentActive);
    Emitter.remove(Actions.components.library.component.unactive, this.onUnComponentActive);
    Emitter.remove(
      Actions.components.library.component.rangeselectactive,
      this.onComponentRangeSelectActive,
    );
    Emitter.remove(
      Actions.components.library.component.unrangeselectactive,
      this.onUnComponentRangeSelectActive,
    );
  }

  /**
   * onNodeClick
   * @param {String} - componentId
   * @return {Boolean}
   */
  onNodeClick(componentId) {
    const { curPageId } = this.state;
    const shape = ShapeModel.getShape({
      pageId: curPageId,
      componentId,
    });
    if (!shape) return false;

    const isActive = shape.isActive();
    const action = isActive
      ? Actions.components.library.component.unactive
      : Actions.components.library.component.active;
    Emitter.trigger(action, {
      pageId: curPageId,
      componentId,
      from: selectPrefix,
    });
  }

  /**
   * getData
   * @return {Array}
   */
  getData() {
    const data = [];
    const { curPageId } = this.state;
    const page = OpenPageModel.get(curPageId);
    const shapes = ShapeModel.getShapesByPage(curPageId);

    if (page) {
      // console.log('getPageName', page.getPageName());
      data.push({
        name: page.getPageName(),
        leaf: false,
        open: true,
        id: curPageId,
        childrendata: [],
      });
    }

    if (shapes && shapes.length !== 0) {
      const root = data[0];
      const { childrendata } = root;
      for (let i = 0; i < shapes.length; i++) {
        const Shape = shapes[i];
        const componentKey = Shape.getComponentKey();
        const groupKey = Shape.getGroupKey();
        const attribute = Shape.getAttribute();
        const Component = Register.get(groupKey).get(componentKey);
        const {name} = Shape.getProperty().prop;
        const isActive = Shape.isActive() || Shape.isRangeSelectActive();

        childrendata.push({
          // TODO: 初始化SummaryTool
          name: <Component.SummaryTool name={name} attribute={attribute} />,
          leaf: true,
          id: Shape.getComponentId(),
          active: isActive,
          onActive: ({ id }) => {
            this.onNodeClick(id);
          },
        });
      }
    }

    /**
     * {
          name: '1',
          leaf: false,
          icon: 'file-o',
          open: true,
          id: 't1',
          childrendata: [{
            name: '1.1',
            id: 't1.1',
            icon: 'file-o',
            leaf: false,
            open: true,
            childrendata: [{
              name: '1.2',
              id: 't1.2',
              icon: 'file-o',
              leaf: true,
            }],
          }],
        }
     */

    return data;
  }

  /**
   * onAddTab
   * @param {String} - pageId
   */
  onAddTab(pageId) {
    this.setState({
      curPageId: pageId,
    });
  }

  /**
   * onChangeTab
   * @param {String} - pageId
   */
  onChangeTab(pageId) {
    this.setState({
      curPageId: pageId,
    });
  }

  /**
   * onRemoveTab
   * @param {String} - removeKey
   * @param {String} - activeKey
   */
  onRemoveTab({ activeKey, removeKey }) {
    this.setState({
      curPageId: activeKey,
    });
  }

  /**
   * onAddShape
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onAddShape({ pageId, componentId }) {
    this.setState({
      curPageId: pageId,
    });
  }

  /**
   * onRemoveShape
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onRemoveShape({ pageId, componentId }) {
    this.setState({
      curPageId: pageId,
    });
  }

  /**
   * onComponentActive
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onComponentActive({ pageId }) {
    this.setState({
      curPageId: pageId,
    });
  }

  /**
   * onUnComponentActive
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onUnComponentActive({ pageId }) {
    this.setState({
      curPageId: pageId,
    });
  }

  /**
   * onComponentRangeSelectActive
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onComponentRangeSelectActive({ pageId }) {
    this.setState({
      curPageId: pageId,
    });
  }

  /**
   * onUnComponentRangeSelectActive
   * @param {String} - pageId
   * @param {String} - componentId
   */
  onUnComponentRangeSelectActive({ pageId }) {
    this.setState({
      curPageId: pageId,
    });
  }

  render() {
    return (
      <div className={`${selectPrefix}`}>
        <Tree
          data={this.getData()}
          // activeKey={activeKey}
          // onActive={(key) => {
          //   this.setState({
          //     activeKey: key,
          //   });
          // }}
        />
      </div>
    );
  }
}

export default SummaryPanel;
