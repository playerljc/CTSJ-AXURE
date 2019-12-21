import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import { Immutable } from '../../../util/CTMobile-UI-Util';
import FontAwesomeFreePicker from '../../global/CT-UI-FontAwesomeFree/FontAwesomeFreePicker';
import TreeTextFieldEditor from '../../global/CT-UI-Tree/TreeTextFieldEditor';
import Tree from '../CT-UI-Tree/Tree';
import Modal from '../CT-UI-Modal/modal';

import './TreeSetting.less';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';


const selectorPrefix = 'CT-UI-TreeSettingPicker';

/**
 * TreeSetting
 * @class TreeSetting
 * @classdesc 表格的设置
 */
class TreeSetting extends React.PureComponent {
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
   *  上方添加节点
   *  下方添加节点
   *  添加子节点
   *  删除节点
   *  上移
   *  下移
   *  升级
   *  降级
   *  展开
   *  图标
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
      // 添加子节点
      {
        key: 'addChildNode',
        className: () => `fa fa-indent ${this.toolConfig.find(t => t.key === 'addChildNode').disable() ? 'disable' : ''}`,
        title: 'Add child node',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'addChildNode').disable();
          if (disabled) return false;

          const { activeKey, data } = this.state;

          const cloneData = Immutable.cloneDeep(data);
          const curNode = this.findNodeById(cloneData, activeKey);
          curNode.leaf = false;
          curNode.childrendata = curNode.childrendata || [];
          curNode.childrendata.push({
            name: 'New Node',
            leaf: true,
            icon: 'far fa-file',
            open: true,
            id: uuid(),
            attributes: {
              type: 'file',
            },
          });
          this.setState({
            data: cloneData,
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
      // 升级
      {
        key: 'upgrade',
        className: () => `fa fa-arrow-right ${this.toolConfig.find(t => t.key === 'upgrade').disable() ? 'disable' : ''}`,
        title: 'upgrade',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'upgrade').disable();
          if (disabled) return false;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const parentNode = this.findParentById({
            childrendata: cloneData,
          }, activeKey);

          let children = parentNode.childrendata;
          let index = children.findIndex(({ id }) => id === activeKey);
          const curNode = children.splice(index, 1)[0];
          if (children.length === 0) {
            parentNode.leaf = true;
          }

          const ppNode = this.findParentById({
            childrendata: cloneData,
          }, parentNode.id);

          if (ppNode) {
            children = ppNode.childrendata;
          } else {
            children = cloneData;
          }

          index = children.findIndex(({ id }) => id === parentNode.id);
          children.splice(index + 1, 0, curNode);

          this.setState({
            data: cloneData,
          });
        },
        disable: () => {
          const { activeKey } = this.state;
          return this.getToolDisable(activeKey).upgrade;
        },
      },
      // 降级
      {
        key: 'downgrade',
        className: () => `fa fa-arrow-left ${this.toolConfig.find(t => t.key === 'downgrade').disable() ? 'disable' : ''}`,
        title: 'downgrade',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'downgrade').disable();
          if (disabled) return false;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const parentNode = this.findParentById({
            childrendata: cloneData,
          }, activeKey);

          const children = parentNode.childrendata;
          const index = children.findIndex(({ id }) => id === activeKey) - 1;
          // 前一个兄弟
          const preNode = children[index];
          preNode.childrendata.push(children.find(({ id }) => id === activeKey));

          this.setState({
            data: cloneData,
          });
        },
        disable: () => {
          const { activeKey } = this.state;
          return this.getToolDisable(activeKey).downgrade;
        },
      },
      // 展开/收缩
      {
        key: 'expand-collapse',
        className: () => `fas fa-angle-double-up ${this.toolConfig.find(t => t.key === 'expand-collapse').disable() ? 'disable' : ''}`,
        title: 'expand or collapse',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'expand-collapse').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const node = this.findNodeById(cloneData, activeKey);

          Modal.promptCheckbox({
            content: 'expand or collapse',
            checked: node.open,
            zIndex: zIndex + 10,
            success: (checked) => {
              return new Promise((resolve) => {
                node.open = checked;
                this.setState({
                  data: cloneData,
                }, () => {
                  resolve();
                });
              });
            },
          });
        },
        disable: () => {
          const { activeKey = '' } = this.state;
          return !activeKey;
        },
      },
      // 图标
      {
        key: 'icon',
        className: () => `fa fa-file-image ${this.toolConfig.find(t => t.key === 'icon').disable() ? 'disable' : ''}`,
        title: 'icon',
        onClick: () => {
          const disabled = this.toolConfig.find(t => t.key === 'icon').disable();
          if (disabled) return false;

          const { activeKey, data } = this.state;
          const cloneData = Immutable.cloneDeep(data);
          const node = this.findNodeById(cloneData, activeKey);

          FontAwesomeFreePicker.open({
            zIndex: window.parseInt(getMaxLevelNumber()) + 10,
            value: node.icon.replace(/(fab|far|fas) fa-/, ''),
            onSuccess: (v) => {
              return new Promise((resolve) => {
                node.icon = v;
                this.setState({
                  data: cloneData,
                }, () => {
                  resolve();
                });
              });
            },
          });
        },
        disable: () => {
          const { activeKey = '' } = this.state;
          return !activeKey;
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
   * findNodeById
   * @param {Array<Object>} children
   * @param {String} - id
   * @return {Object}
   */
  findNodeById(children, id) {
    let node;
    for (let i = 0; i < children.length; i++) {
      const n = children[i];
      if (n.id === id) {
        node = n;
        break;
      }

      const { childrendata = [] } = n;
      node = this.findNodeById(childrendata, id);
      if (node) break;
    }

    return node;
  }

  /**
   * findParentById
   * @param {Object} - parent
   * @param {String} - id
   * @return {Object}
   */
  findParentById(parent, id) {
    let node;
    const { childrendata = [] } = parent;
    for (let i = 0; i < childrendata.length; i++) {
      const n = childrendata[i];
      if (n.id === id) {
        node = parent;
        break;
      }

      node = this.findParentById(n, id);
      if (node) break;
    }

    return node && node.id ? node : null;
  }

  /**
   * addNode - 数据添加节点
   * @param {String} - nodeId 目标节点
   * @param {String} - name 节点的名称
   * @param {String} - icon 节点的icon
   * @param {String} - type 节点的类型[file | folder]
   * @param {String} - direction 节点的方向[top | bottom]
   * @return {Promise<any>}
   */
  addNode({
    nodeId,
    name,
    icon,
    type,
    direction,
  }) {
    return new Promise((resolve) => {
      const data = Immutable.cloneDeep(this.state.data);

      const curNode = this.findParentById({ childrendata: data }, nodeId);

      const newNode = {
        name,
        leaf: true,
        icon,
        open: true,
        id: uuid(),
        attributes: {
          type,
        },
      };

      if (curNode) {
        curNode.leaf = false;
        curNode.childrendata = curNode.childrendata || [];
        const index = curNode.childrendata.findIndex(({ id }) => id === nodeId);
        curNode.childrendata.splice(index + (direction === 'top' ? 0 : 1), 0, newNode);
      } else {
        const index = data.findIndex(({ id }) => id === nodeId);
        data.splice(index + (direction === 'top' ? 0 : 1), 0, newNode);
      }

      this.setState({
        data,
      }, () => {
        resolve();
      });
    });
  }

  /**
   * appendMulitNode
   * @param {Number} - rowCount
   */
  appendMulitNode(rowCount) {
    return new Promise((resolve) => {
      const { data = [] } = this.state;
      const cloneData = Immutable.cloneDeep(data);

      for (let i = 0; i < rowCount; i++) {
        cloneData.push({
          name: 'New Node',
          leaf: true,
          icon: 'far fa-file',
          childrendata: [],
          open: false,
          active: false,
          id: uuid(),
          attributes: {},
        });
      }

      this.setState({
        data: cloneData,
      }, () => {
        resolve();
      });
    });
  }

  /**
   * getValue
   * @return {Object}
   */
  getValue() {
    return Immutable.cloneDeep(this.state);
  }

  /**
   * onActive
   * @param {String} - id
   */
  onTreeActive({ id: key }) {
    this.setState({
      activeKey: key,
    });
  }

  onEditorModify({ value, id }) {
    const { data } = this.state;
    const cloneData = Immutable.cloneDeep(data);
    const node = this.findNodeById(cloneData, id);
    node.name = value;
    this.setState({
      data: cloneData,
    });
  }

  onRenderNode(nodeConfig) {
    return (
      <TreeTextFieldEditor {...nodeConfig} value={nodeConfig.name} />
    );
  }

  render() {
    const props = {
      ...this.state,
      onActive: ::this.onTreeActive,
      // 编辑完成时
      onEditorModify: ::this.onEditorModify,
      // 节点渲染
      onRenderNode: ::this.onRenderNode,
    };

    return (
      <div className={`${selectorPrefix}`}>

        <div className={`${selectorPrefix}-Tool`}>
          {this.renderTool()}
        </div>

        <div className={`${selectorPrefix}-Inner`}>
          <Tree
            {...props}
          />
        </div>
      </div>
    );
  }
}

TreeSetting.propTypes = {
  value: PropTypes.object,
  zIndex: PropTypes.number,
};

export default TreeSetting;
