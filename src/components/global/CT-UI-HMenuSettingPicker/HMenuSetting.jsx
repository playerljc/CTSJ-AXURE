import React from 'react';
import PropTypes from 'prop-types';

import { Immutable } from '../../../util/CTMobile-UI-Util';
import Table from '../CT-UI-Table/Table';
import Modal from '../CT-UI-Modal/modal';

import './HMenuSetting.less';

const selectorPrefix = 'CT-UI-HMenuSetting';

/**
 * HMenuSetting
 * @class HMenuSetting
 * @classdesc HMenu的设置
 */
class HMenuSetting extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...props.value,
    };

    this.initToolConfig();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.value,
    });
  }

  /**
   * initToolConfig
   *   加节点
   *   加多个节点
   *  上方添加节点
   *  下方添加节点
   *  删除节点
   *  上移
   *  下移
   */
  initToolConfig() {
    this.toolConfig = [
      // 加节点
      {
        key: 'addNode',
        className: () => 'fa fa-plus',
        title: 'add node',
        onClick: () => {
          this.addNode({
            nodeId: '',
            name: 'New Node',
            icon: 'far fa-file',
            type: 'file',
            direction: 'bottom',
          });
        },
      },
      // 加节点(加多个节点)
      {
        key: 'addMulitNode',
        className: () => 'fa fa-server',
        title: 'add mulit node',
        onClick: () => {
          const { zIndex } = this.props;

          Modal.prompt({
            content: 'add mulit node',
            type: 'number',
            defaultValue: 1,
            zIndex: zIndex + 10,
            success: (rowCount) => {
              return new Promise((resolve) => {
                rowCount = window.parseInt(rowCount);
                if (!Number.isNaN(rowCount) && (rowCount > 0)) {
                  this.appendMulitNode(rowCount).then(() => {
                    resolve();
                  });
                }
              });
            },
          });
        },
      },
      // 上方添加节点
      {
        key: 'addNodeAbove',
        className: () => `far fa-caret-square-up ${this.toolConfig.find(t => t.key === 'addNodeAbove').disable() ? 'disable' : ''}`,
        title: 'Add node above',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'addNodeAbove').disable();
          if (disabled) return false;

          const { activeKey } = this.state;

          this.addNode({
            nodeId: activeKey,
            name: 'New Node',
            icon: 'far fa-file',
            type: 'file',
            direction: 'top',
          });
        },
        disable: () => {
          const { activeKey = '' } = this.state;
          return !activeKey;
        },
      },
      // 下方添加节点
      {
        key: 'addNodeBelow',
        className: () => `far fa-caret-square-down ${this.toolConfig.find(t => t.key === 'addNodeBelow').disable() ? 'disable' : ''}`,
        title: 'Add node below',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'addNodeBelow').disable();
          if (disabled) return false;

          const { activeKey } = this.state;

          this.addNode({
            nodeId: activeKey,
            name: 'New Node',
            icon: 'far fa-file',
            type: 'file',
            direction: 'bottom',
          });
        },
        disable: () => {
          const { activeKey = '' } = this.state;
          return !activeKey;
        },
      },
      // 删除节点
      {
        key: 'removeNode',
        className: () => `fa fa-window-close ${this.toolConfig.find(t => t.key === 'removeNode').disable() ? 'disable' : ''}`,
        title: 'remove node',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'removeNode').disable();
          if (disabled) return false;

          const { activeKey, data } = this.state;

          // 删除菜单项
          const cloneData = Immutable.cloneDeep(data);
          const parentNode = this.findParentById({
            childrendata: cloneData,
          }, activeKey);

          let children;
          if (parentNode) {
            children = parentNode.childrendata;
          } else {
            children = cloneData;
          }
          const index = children.findIndex(({ id }) => id === activeKey);
          children.splice(index, 1);
          if (parentNode && children.length === 0) {
            parentNode.leaf = true;
          }

          this.setState({
            data: cloneData,
          });
        },
        disable: () => {
          const { activeKey = '' } = this.state;
          return !activeKey;
        },
      },
      // 上移
      {
        key: 'moveUp',
        className: () => `fa fa-arrow-up ${this.toolConfig.find(t => t.key === 'moveUp').disable() ? 'disable' : ''}`,
        title: 'move up',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'moveUp').disable();
          if (disabled) return false;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const parentNode = this.findParentById({
            childrendata: cloneData,
          }, activeKey);

          let children;
          if (parentNode) {
            children = parentNode.childrendata;
          } else {
            children = cloneData;
          }

          const index = children.findIndex(({ id }) => id === activeKey);
          children.splice(index - 1, 0, children[index]);
          children.splice(index + 1, 1);
          this.setState({
            data: cloneData,
          });
        },
        disable: () => {
          const { activeKey } = this.state;
          return this.getToolDisable(activeKey).moveup;
        },
      },
      // 下移
      {
        key: 'moveDown',
        className: () => `fa fa-arrow-down ${this.toolConfig.find(t => t.key === 'moveDown').disable() ? 'disable' : ''}`,
        title: 'move down',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'moveDown').disable();
          if (disabled) return false;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const parentNode = this.findParentById({
            childrendata: cloneData,
          }, activeKey);

          let children;
          if (parentNode) {
            children = parentNode.childrendata;
          } else {
            children = cloneData;
          }

          const index = children.findIndex(({ id }) => id === activeKey);
          children.splice(index, 0, children[index + 1]);
          children.splice(index + 2, 1);
          this.setState({
            data: cloneData,
          });
        },
        disable: () => {
          const { activeKey } = this.state;
          return this.getToolDisable(activeKey).movedown;
        },
      },
    ];
  }

  /**
   * renderTool
   * @return {*[]}
   */
  renderTool() {
    return this.toolConfig.map(({ key, className, title, onClick }) => {
      return (
        <span
          key={key}
          className={className()}
          title={title}
          onClick={() => {
            onClick();
          }}
        />
      );
    });
  }

  /**
   * renderInner
   * @return {ReactElement}
   */
  renderInner() {
    const props = {
      columns,
      data,
      rowKey: 'id',
      rowSelection,
      onEditorModify,
      isDisplayHead: false,
    };

    return (
      <Table
        {...props}
      />
    );
  }

  /**
   * getToolDisable
   * move
   *  上移(第一个节点不能上移)
   *  下移(最后一个节点不能下移)
   *  升级(和父亲平级)(没有父亲不能升级)
   *  降级(成为前一个兄弟的孩子)(没有前一个兄弟不能降级)
   * @param {String} - nodeId
   */
  getToolDisable(nodeId) {
    if (!nodeId) {
      return {
        // 上移
        moveup: true,
        // 降级
        downgrade: true,
        // 下移
        movedown: true,
        // 升级
        upgrade: true,
      };
    }

    const parentNode = this.findParentById(
      {
        childrendata: Immutable.cloneDeep(this.state.data),
      },
      nodeId);
    let children;
    if (parentNode) {
      children = parentNode.childrendata;
    } else {
      children = this.state.data;
    }
    children = Immutable.cloneDeep(children);

    const index = children.findIndex(({ id }) => id === nodeId);

    return {
      // 上移
      moveup: index === 0,
      // 降级
      downgrade: index === 0,
      // 下移
      movedown: index === children.length - 1,
      // 升级
      upgrade: !parentNode,
    };

    // // 上移 降级
    // if (index === 0) {
    //   // 上移
    //   menudata[1].children[0].disabled = true;
    //   // 降级
    //   menudata[1].children[3].disabled = true;
    // }
    // // 下移
    // if (index === children.length - 1) menudata[1].children[1].disabled = true;
    // // 升级
    // if (!parentNode) menudata[1].children[2].disabled = true;
  }

  /**
   * getValue
   * @return {Object}
   */
  getValue() {
    return Immutable.cloneDeep(this.state);
  }

  render() {
    return (
      <div className={`${selectorPrefix}`}>

        <div className={`${selectorPrefix}-Tool`}>
          {this.renderTool()}
        </div>

        <div className={`${selectorPrefix}-Inner`}>
          {this.renderInner()}
        </div>
      </div>
    );
  }
}

HMenuSetting.propTypes = {
  value: PropTypes.object,
  zIndex: PropTypes.number,
};

export default HMenuSetting;
