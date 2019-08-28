import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { TreeContext } from './Context';
import Click from '../../../util/Click';
import './TreeNode.less';

const selectorPrefix = 'CT-UI-TreeNode';

/**
 * TreeNode
 * @class TreeNode
 * @classdesc TreeNode
 */
class TreeNode extends React.Component {
  onClick() {
    console.log('onClick');
    const { id, onActive } = this.props;
    if (onActive) {
      onActive(id);
    }
  }

  onDoubleClick() {
    console.log('onDoubleClick');
    const { name = '', leaf = false, id, attributes, onActive, onDBClick } = this.props;
    if (onActive) {
      onActive(id);
    }
    if (onDBClick) {
      onDBClick({
        name,
        leaf,
        id,
        attributes,
      });
    }
  }

  renderChildren() {
    const { childrendata = [], onActive, onDBClick } = this.props;
    return childrendata.map((t) => {
      return (<TreeNode
        key={uuidv1()}
        onActive={onActive}
        onDBClick={onDBClick}
        {...t}
      />);
    });
  }

  render() {
    const { icon = '', name = '', leaf = false, id } = this.props;

    return (
      <TreeContext.Consumer>
        {
          ({ activeKey }) => {
            return (
              <details
                className={`${selectorPrefix} ${leaf ? 'Leaf' : ''} ${activeKey && activeKey === id ? 'Active' : ''}`}
                open
              >
                <summary className={`${selectorPrefix}-Summary`} >
                  <div
                    className={`${selectorPrefix}-Summary-Inner`}
                    onClick={Click((count) => {
                      if (count === 1) this.onClick();
                      if (count === 2) this.onDoubleClick();
                    }, (e) => {
                      e.preventDefault();
                    })}
                  >
                    <span className={`${selectorPrefix}-Icon fa fa-${icon}`} />
                    <span className={`${selectorPrefix}-Name`}>{name}</span>
                  </div>
                </summary>
                {
                  !leaf ?
                    (<div className={`${selectorPrefix}-Children`}>{this.renderChildren()}</div>) : null
                }
              </details>
            );
          }
        }
      </TreeContext.Consumer>
    );
  }
}

// 指定 props 的默认值：
TreeNode.defaultProps = {
  icon: 'file-o',
  name: '',
  childrendata: [],
  leaf: true,
  open: true,
  id: '',
  attributes: {},
};


TreeNode.propTypes = {
  name: PropTypes.string,
  leaf: PropTypes.bool,
  icon: PropTypes.string,
  childrendata: PropTypes.array,
  open: PropTypes.bool,
  id: PropTypes.string,
  attributes: PropTypes.object,
  onActive: PropTypes.func,
  onDBClick: PropTypes.func,
};

export default TreeNode;
