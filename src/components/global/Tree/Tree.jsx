import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import TreeNode from './TreeNode';
import { TreeContext } from './Context';
import './Tree.less';

const selectorPrefix = 'AX-Tree';

/**
 * Tree
 * @class Tree
 * @classdesc Tree
 */
class Tree extends React.Component {
  renderChildren(data = []) {
    const { onDBClick, onActive } = this.props;
    return data.map((t) => {
      return (<TreeNode
        key={t.id || uuidv1()}
        onActive={onActive}
        onDBClick={onDBClick}
        {...t}
      />);
    });
  }

  render() {
    const { className = '', data = [] } = this.props;
    return (
      <TreeContext.Provider value={this.props}>
        <div className={`${selectorPrefix} ${className}`}>
          {this.renderChildren(data)}
        </div>
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
  onDBClick: PropTypes.func,
  onActive: PropTypes.func,
};

export default Tree;
