import React from 'react';
import uuidv1 from 'uuid/v1';

import MenuTreeNode from './MenuTreeNode';

import Tree from './Tree';

/**
 * MenuTree
 * @class MenuTree
 * @classdesc MenuTree
 */
class MenuTree extends Tree {
  /**
   * renderChildren
   * @param {Array} - data
   * @return {Array<ReactElement>}
   */
  renderChildren(data = []) {
    const { onDBClick, onActive, onContextMenu } = this.props;
    return data.map((t) => {
      return (
        <MenuTreeNode
          key={t.id || uuidv1()}
          onActive={onActive}
          onDBClick={onDBClick}
          onContextMenu={onContextMenu}
          {...t}
        />
      );
    });
  }
}

export default MenuTree;
