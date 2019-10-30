import React from 'react';

import Tree from '../../../global/CT-UI-Tree/Tree';

import Emitter from '../../../../util/Emitter';
import Actions from '../../../../util/Actions';

import ShapeModel from '../../../../model/ShapeModel';
import PageModel from '../../../../model/PageModel';

import Register from '../../../../components/library/Register';

import './SummaryPanel.less';

const { Component } = React;

const selectPrefix = 'SummaryPanel';

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
  }

  componentDidMount() {
    Emitter.on(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.on(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);

    Emitter.on(Actions.components.business.canvaspanel.addshape, this.onAddShape);
    Emitter.on(Actions.components.business.canvaspanel.removeshape, this.onRemoveShape);
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.addtab, this.onAddTab);
    Emitter.remove(Actions.components.business.canvaspanel.changetab, this.onChangeTab);
    Emitter.remove(Actions.components.business.canvaspanel.removetab, this.onRemoveTab);

    Emitter.remove(Actions.components.business.canvaspanel.addshape, this.onAddShape);
    Emitter.remove(Actions.components.business.canvaspanel.removeshape, this.onRemoveShape);
  }

  getData() {
    const data = [];
    const { curPageId } = this.state;
    const page = PageModel.get(curPageId);
    const shapes = ShapeModel.getShapesByPage(curPageId);

    if (page) {
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
        const Component = Register.get(groupKey).get(componentKey);
        const name = Shape.getProperty().prop.name;
        childrendata.push({
          name: <Component.SummaryTool name={name} />,
          leaf: true,
          id: Shape.getComponentId(),
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

  onAddShape({ pageId, componentId }) {
    this.setState({
      curPageId: pageId,
    });
  }

  onRemoveShape({ pageId, componentId }) {
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
