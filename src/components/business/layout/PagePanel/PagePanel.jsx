import React from 'react';
import uuid from 'uuid/v1';

import Tree from '../../../global/CT-UI-Tree/Tree';
import Actions from '../../../../util/Actions';
import Emitter from '../../../../util/Emitter';
import ContextMenu from '../../../global/CT-UI-ContextMenu/ContextMenu';
import { Immutable } from '../../../../util/CTMobile-UI-Util';

import './PagePanel.less';
import Modal from '../../../global/CT-UI-Modal/modal';

const { Component } = React;

const selectorPrefix = 'PagePanel';

const contextMenuData = [
  {
    name: 'add',
    id: 'add',
    icon: 'plus',
    separation: false,
    attribute: {},
    children: [
      {
        name: 'folder',
        id: 'folder',
        icon: 'folder',
        separation: false,
        attribute: {},
        children: [],
      },
      {
        name: 'Add page above',
        id: 'addpageabove',
        icon: 'file-text-o',
        separation: false,
        attribute: {},
        children: [],
      },
      {
        name: 'Add page below',
        id: 'addpagebelow',
        icon: 'file-text',
        separation: false,
        attribute: {},
        children: [],
      },
      {
        name: 'subpage',
        id: 'subpage',
        icon: 'file-o',
        separation: false,
        attribute: {},
        children: [],
      },
    ],
  },
  {
    name: 'move',
    id: 'move',
    icon: 'arrows-v',
    separation: false,
    attribute: {},
    children: [
      {
        name: 'Move up',
        id: 'moveup',
        icon: 'long-arrow-up',
        separation: false,
        attribute: {},
        children: [],
      },
      {
        name: 'Move down',
        id: 'movedown',
        icon: 'long-arrow-down',
        separation: false,
        attribute: {},
        children: [],
      },
      {
        name: 'upgrade',
        id: 'upgrade',
        icon: 'long-arrow-right',
        separation: false,
        attribute: {},
        children: [],
      },
      {
        name: 'downgrade',
        id: 'downgrade',
        icon: 'long-arrow-left',
        separation: false,
        attribute: {},
        children: [],
      },
    ],
  },
  {
    name: 'delete',
    id: 'delete',
    icon: 'trash-o',
    separation: false,
    attribute: {},
    children: [],
  },
  {
    name: 'rename',
    id: 'rename',
    icon: 'exchange',
    separation: false,
    attribute: {},
    children: [],
  },
];

// 临时的
const treeData = [
  {
    name: '1',
    leaf: false,
    icon: 'file-o',
    open: true,
    id: 't1',
    attributes: {
      type: 'file',
    },
    childrendata: [
      {
        name: '1.1',
        id: 't1.1',
        icon: 'file-o',
        leaf: false,
        open: true,
        attributes: {
          type: 'file',
        },
        childrendata: [
          {
            name: '1.2',
            id: 't1.2',
            icon: 'file-o',
            leaf: true,
            attributes: {
              type: 'file',
            },
          },
        ],
      },
    ],
  },
  {
    name: '2',
    id: 't2',
    leaf: false,
    open: true,
    icon: 'file-o',
    attributes: {
      type: 'file',
    },
    childrendata: [
      {
        name: '2.1',
        id: 't2.1',
        icon: 'file-o',
        leaf: false,
        open: true,
        attributes: {
          type: 'file',
        },
        childrendata: [
          {
            name: '2.2',
            id: 't2.2',
            icon: 'file-o',
            leaf: true,
            attributes: {
              type: 'file',
            },
          },
        ],
      },
    ],
  },
];

/**
 * PagePanel
 * @class PagePanel
 * @classdesc PagePanel
 */
class PagePanel extends Component {
  constructor(pros) {
    super(pros);

    this.state = {
      data: treeData,
      activeKey: '',
    };

    this.onTabChange = this.onTabChange.bind(this);
    this.onTabRemove = this.onTabRemove.bind(this);
  }

  componentDidMount() {
    Emitter.on(Actions.components.business.canvaspanel.changetab, this.onTabChange);
    Emitter.on(Actions.components.business.canvaspanel.removetab, this.onTabRemove);
  }

  componentWillUnMount() {
    Emitter.remove(Actions.components.business.canvaspanel.changetab, this.onTabChange);
    Emitter.remove(Actions.components.business.canvaspanel.removetab, this.onTabRemove);
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

    return node;
  }

  addNode({
    node,
    value,
    icon,
    type,
    direction,
  }) {
    return new Promise((resolve, reject) => {
      const data = Immutable.cloneDeep(this.state.data);

      const curNode = this.findParentById({ childrendata: data }, node.id);

      const newNode = {
        name: value,
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
        const index = curNode.childrendata.findIndex(({ id }) => id === node.id);
        curNode.childrendata.splice(index + (direction === 'top' ? 0 : 1), 0, newNode);
      } else {
        const index = data.findIndex(({ id }) => id === node.id);
        data.splice(index + 1, (direction === 'top' ? 0 : 1), newNode);
      }

      this.setState({
        data,
      }, () => {
        resolve();
      });
    });
  }

  onTabChange(key) {
    this.setState({
      activeKey: key,
    });
  }

  onTabRemove({ removeKey, activeKey }) {
    if (removeKey === activeKey && activeKey === this.state.activeKey) {
      this.setState({
        activeKey: '',
      });
    }
  }

  /**
   * onContextMenu
   * @param {Event} - e
   * @param {Object} - node
   */
  onContextMenu(e, node) {
    const data = Immutable.cloneDeep(contextMenuData);

    ContextMenu.open(
      data,
      {
        width: 200,
        handler: (id, attribute) => {
          // folder 添加目录
          // addpageabove 向上添加页面
          // addpagebelow 向下添加页面
          // subpage 添加子页面

          // delete 删除
          // rename 重命名
          this[`onContextMenu${id}`](attribute, node);
        },
        x: e.clientX,
        y: e.clientY,
        maskClosable: true,
      });
  }

  onActive({ id: key }) {
    this.setState({
      activeKey: key,
    });
  }

  onDBClick(t) {
    const { attributes: { type } } = t;
    if (type === 'folder') return false;
    Emitter.trigger(Actions.components.business.pagepanel.dbclick, t);
  }

  /**
   * folder 添加目录
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenufolder(menuItemAttribute, node) {
    Modal.prompt({
      content: 'folder name',
      defaultValue: 'folder',
      success: (value) => {
        return this.addNode({
          node,
          value,
          icon: 'folder-open',
          type: 'folder',
          direction: 'bottom',
        });
      },
    });
  }

  /**
   * addpageabove 向上添加页面
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenuaddpageabove(menuItemAttribute, node) {
    Modal.prompt({
      content: 'page name',
      defaultValue: 'page',
      success: (value) => {
        return this.addNode({
          node,
          value,
          icon: 'file-o',
          type: 'file',
          direction: 'top',
        });
      },
    });
  }

  /**
   * addpagebelow 向下添加页面
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenuaddpagebelow(menuItemAttribute, node) {
    Modal.prompt({
      content: 'page name',
      defaultValue: 'page',
      success: (value) => {
        return this.addNode({
          node,
          value,
          icon: 'file-o',
          type: 'file',
          direction: 'bottom',
        });
      },
    });
  }

  /**
   * subpage 添加子页面
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenusubpage(menuItemAttribute, node) {
    Modal.prompt({
      content: 'page name',
      defaultValue: 'page',
      success: (value) => {
        return new Promise((resolve, reject) => {
          const data = Immutable.cloneDeep(this.state.data);
          const curNode = this.findNodeById(data, node.id);
          curNode.leaf = false;
          curNode.childrendata = curNode.childrendata || [];
          curNode.childrendata.push({
            name: value,
            leaf: true,
            icon: 'file-o',
            open: true,
            id: uuid(),
            attributes: {
              type: 'file',
            },
          });
          this.setState({
            data,
          }, () => {
            resolve();
          });
        });
      },
    });
  }

  /**
   * delete 删除
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenudelete(menuItemAttribute, node) {

  }

  /**
   * rename 重命名
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenurename(menuItemAttribute, node) {

  }

  render() {
    const { data, activeKey } = this.state;
    return (
      <div className={`${selectorPrefix}`}>
        <Tree
          data={data}
          activeKey={activeKey}
          onActive={::this.onActive}
          onDBClick={::this.onDBClick}
          onContextMenu={::this.onContextMenu}
        />
      </div>
    );
  }
}

export default PagePanel;
