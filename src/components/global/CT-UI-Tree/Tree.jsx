import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import TreeNode from './TreeNode';
import { TreeContext } from './Context';

import './Tree.less';

const selectorPrefix = 'CT-UI-Tree';

/**
 * Tree
 * @class Tree
 * @classdesc Tree
 */
class Tree extends React.PureComponent {
  /**
   * renderChildren
   * @param {Array} - data
   * @return {Array<ReactElement>}
   */
  renderChildren(data = []) {
    const { onDBClick, onActive, onContextMenu } = this.props;
    return data.map((t) => {
      return (
        <TreeNode
          key={t.id || uuidv1()}
          onActive={onActive}
          onDBClick={onDBClick}
          onContextMenu={onContextMenu}
          {...t}
        />
      );
    });
  }

  render() {
    const { className = '', data = [] } = this.props;
    return (
      <TreeContext.Provider value={this.props}>
        <div className={`${selectorPrefix} ${className}`}>{this.renderChildren(data)}</div>
      </TreeContext.Provider>
    );
  }
}

Tree.defaultProps = {
  className: '',
  activeKey: '',
  data: [],
};

Tree.propTypes = {
  className: PropTypes.string,
  activeKey: PropTypes.string,
  data: PropTypes.array,
  onActive: PropTypes.func,
  onDBClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  // 编辑完成时
  onEditorModify: PropTypes.func,
  // 节点渲染
  onRenderNode: PropTypes.func,
};

export default Tree;
