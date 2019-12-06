import React from 'react';
import uuid from 'uuid/v1';

import Tree from '../../../global/CT-UI-Tree/Tree';
import Modal from '../../../global/CT-UI-Modal/modal';
import ContextMenu from '../../../global/CT-UI-ContextMenu/ContextMenu';
import Actions from '../../../../util/Actions';
import Emitter from '../../../../util/Emitter';
import { Immutable } from '../../../../util/CTMobile-UI-Util';
import {
  PAGE_TREE_ICON,
  FOLDER_TREE_ICON,
} from '../../../../util/Constant';

import PageModel from '../../../../model/PageModel';

import './PagePanel.less';

const { Component } = React;

const selectorPrefix = 'PagePanel';

/**
 * 上下文菜单数据
 * @return - {Array}
 */
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
        icon: 'folder-o',
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
    icon: PAGE_TREE_ICON,
    open: true,
    id: 't1',
    attributes: {
      type: 'file',
    },
    childrendata: [
      {
        name: '1.1',
        id: 't1.1',
        icon: PAGE_TREE_ICON,
        leaf: false,
        open: true,
        attributes: {
          type: 'file',
        },
        childrendata: [
          {
            name: '1.2',
            id: 't1.2',
            icon: PAGE_TREE_ICON,
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
    icon: PAGE_TREE_ICON,
    attributes: {
      type: 'file',
    },
    childrendata: [
      {
        name: '2.1',
        id: 't2.1',
        icon: PAGE_TREE_ICON,
        leaf: false,
        open: true,
        attributes: {
          type: 'file',
        },
        childrendata: [
          {
            name: '2.2',
            id: 't2.2',
            icon: PAGE_TREE_ICON,
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
    return new Promise((resolve, reject) => {
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
        // data.splice(index + 1, (direction === 'top' ? 0 : 1), newNode);
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
   * setDisableContextMenu
   * move
   *  上移(第一个节点不能上移)
   *  下移(最后一个节点不能下移)
   *  升级(和父亲平级)(没有父亲不能升级)
   *  降级(成为前一个兄弟的孩子)(没有前一个兄弟不能降级)
   * @param {Array<Object>} - menudata
   * @param {Object} - node
   */
  setDisableContextMenu({
    menudata,
    node,
  }) {
    const parentNode = this.findParentById(
      {
        childrendata: Immutable.cloneDeep(this.state.data),
      },
      node.id);
    let children;
    if (parentNode) {
      children = parentNode.childrendata;
    } else {
      children = this.state.data;
    }
    children = Immutable.cloneDeep(children);

    const index = children.findIndex(({ id }) => id === node.id);

    // 上移 降级
    if (index === 0) {
      menudata[1].children[0].disabled = true;
      menudata[1].children[3].disabled = true;
    }
    // 下移
    if (index === children.length - 1) menudata[1].children[1].disabled = true;
    // 升级
    if (!parentNode) menudata[1].children[2].disabled = true;
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
   * onContextMenu - 右键菜单
   * @param {Event} - e
   * @param {Object} - node
   */
  onContextMenu(e, node) {
    const menudata = Immutable.cloneDeep(contextMenuData);

    // 上移(第一个节点不能上移)
    // 下移(最后一个节点不能下移)
    // 升级(和父亲平级)(没有父亲不能升级)
    // 降级(成为前一个兄弟的孩子)(没有前一个兄弟不能降级)
    this.setDisableContextMenu({
      menudata,
      node,
    });

    ContextMenu.open(
      menudata,
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

  /**
   * onActive
   * @param {String} - id
   */
  onActive({ id: key }) {
    this.setState({
      activeKey: key,
    });
  }

  /**
   * onDBClick
   * @param {Object} - t
   * @return {boolean}
   */
  onDBClick(t) {
    const { attributes: { type } } = t;
    if (type === 'folder') return false;
    Emitter.trigger(Actions.components.business.pagepanel.dbclick, t);
  }

  /**
   * activeNodeInsertFolderAfter
   */
  activeNodeInsertFolderAfter() {
    const { activeKey } = this.state;
    const stateClone = Immutable.cloneDeep(this.state.data);
    let activeNode;
    if (activeKey) {
      activeNode = this.findNodeById(stateClone, activeKey);
    } else {
      activeNode = stateClone[stateClone.length - 1];
    }
    this.onContextMenufolder(null, activeNode || { id: '' });
  }

  /**
   * activeNodeInsertFileAfter
   */
  activeNodeInsertFileAfter() {
    const { activeKey } = this.state;
    const stateClone = Immutable.cloneDeep(this.state.data);
    let activeNode;
    if (activeKey) {
      activeNode = this.findNodeById(stateClone, activeKey);
    } else {
      activeNode = stateClone[stateClone.length - 1];
    }
    this.onContextMenuaddpagebelow(null, activeNode || { id: '' });
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
          nodeId: node.id,
          name: value,
          icon: FOLDER_TREE_ICON,
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
          nodeId: node.id,
          name: value,
          icon: PAGE_TREE_ICON,
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
          nodeId: node.id,
          name: value,
          icon: PAGE_TREE_ICON,
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
            icon: PAGE_TREE_ICON,
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
   * 上移
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenumoveup(menuItemAttribute, node) {
    const stateClone = Immutable.cloneDeep(this.state.data);
    const parentNode = this.findParentById({
      childrendata: stateClone,
    }, node.id);

    let children;
    if (parentNode) {
      children = parentNode.childrendata;
    } else {
      children = stateClone;
    }

    const index = children.findIndex(({ id }) => id === node.id);
    children.splice(index - 1, 0, children[index]);
    children.splice(index + 1, 1);
    this.setState({
      data: stateClone,
    });
  }

  /**
   * 下移
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenumovedown(menuItemAttribute, node) {
    const stateClone = Immutable.cloneDeep(this.state.data);
    const parentNode = this.findParentById({
      childrendata: stateClone,
    }, node.id);

    let children;
    if (parentNode) {
      children = parentNode.childrendata;
    } else {
      children = stateClone;
    }

    const index = children.findIndex(({ id }) => id === node.id);
    children.splice(index, 0, children[index + 1]);
    children.splice(index + 2, 1);
    this.setState({
      data: stateClone,
    });
  }

  /**
   * 升级 - (和父亲平级)(没有父亲不能升级)
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenuupgrade(menuItemAttribute, node) {
    const stateClone = Immutable.cloneDeep(this.state.data);
    const parentNode = this.findParentById({
      childrendata: stateClone,
    }, node.id);

    let children = parentNode.childrendata;
    let index = children.findIndex(({ id }) => id === node.id);
    const curNode = children.splice(index, 1)[0];
    if (children.length === 0) {
      parentNode.leaf = true;
    }

    const ppNode = this.findParentById({
      childrendata: stateClone,
    }, parentNode.id);

    if (ppNode) {
      children = ppNode.childrendata;
    } else {
      children = stateClone;
    }

    index = children.findIndex(({ id }) => id === parentNode.id);
    children.splice(index + 1, 0, curNode);

    this.setState({
      data: stateClone,
    });
  }

  /**
   * 降级 - (成为前一个兄弟的孩子)(没有前一个兄弟不能降级)
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenudowngrade(menuItemAttribute, node) {
    const stateClone = Immutable.cloneDeep(this.state.data);
    const parentNode = this.findParentById({
      childrendata: stateClone,
    }, node.id);

    const children = parentNode.childrendata;
    const index = children.findIndex(({ id }) => id === node.id) - 1;
    // 前一个兄弟
    const preNode = children[index];
    preNode.childrendata.push(children.find(({ id }) => id === node.id));

    this.setState({
      data: stateClone,
    });
  }

  /**
   * delete 删除
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenudelete(menuItemAttribute, node) {
    const page = PageModel.get(node.id);

    function deleteMenu() {
      // 删除菜单项
      const stateClone = Immutable.cloneDeep(this.state.data);
      const parentNode = this.findParentById({
        childrendata: stateClone,
      }, node.id);

      let children;
      if (parentNode) {
        children = parentNode.childrendata;
      } else {
        children = stateClone;
      }
      const index = children.findIndex(({ id }) => id === node.id);
      children.splice(index, 1);
      if (parentNode && children.length === 0) {
        parentNode.leaf = true;
      }

      this.setState({
        data: stateClone,
      });
    }

    if (!page) {
      deleteMenu.call(this);
    } else {
      page.removePage({
        pageId: node.id,
        success: () => {
          deleteMenu.call(this);
        },
      });
    }
  }

  /**
   * rename 重命名
   * @param {Object} - menuItemAttribute 菜单的attribute
   * @param {Object} - node 节点数据
   */
  onContextMenurename(menuItemAttribute, node) {
    function rename(value) {
      return new Promise((resolve) => {
        const stateClone = Immutable.cloneDeep(this.state.data);
        const curNode = this.findNodeById(stateClone, node.id);
        curNode.name = value;
        this.setState({
          data: stateClone,
        }, () => {
          resolve();
        });
      });
    }

    Modal.prompt({
      content: 'rename',
      defaultValue: node.name,
      success: (value) => {
        return new Promise((resolve) => {
          const page = PageModel.get(node.id);
          if (page) {
            page.setName({
              pageId: node.id,
              name: value,
            }, () => {
              rename.call(this, value).then(() => {
                resolve();
              });
            });
          } else {
            rename.call(this, value).then(() => {
              resolve();
            });
          }
        });
      },
    });
  }

  /**
   * extendComponent
   * @param {Function} - onAddFile
   * @param {Function} - onAddFolder
   * @param {Function} - onSearch
   * @return {ReactElement}
   */
  static extendComponent({
    onAddFile,
    onAddFolder,
    onSearch,
  }) {
    return (
      <div className={`${selectorPrefix}-ExtendBar`}>
        <span
          className="fa fa-custom-addfile"
          onClick={(e) => {
            e.preventDefault();
            onAddFile();
          }}
        />
        <span
          className="fa fa-custom-addfolder"
          onClick={(e) => {
            e.preventDefault();
            onAddFolder();
          }}
        />
        <span
          className="fa fa-custom-icon-search"
          onClick={(e) => {
            e.preventDefault();
            onSearch();
          }}
        />
      </div>
    );
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
