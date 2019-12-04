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
class TreeNode extends React.PureComponent {
  onClick() {
    const { id, onActive, attributes } = this.props;
    if (onActive) {
      onActive({
        id,
        attributes,
      });
    }
  }

  onDoubleClick() {
    const {
      name = '',
      leaf = false,
      id,
      attributes,
      onActive,
      onDBClick,
    } = this.props;

    if (onActive) {
      onActive({
        id,
        attributes,
      });
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
    const { childrendata = [], onActive, onDBClick, onContextMenu } = this.props;
    return childrendata.map((t) => {
      return (<TreeNode
        key={uuidv1()}
        onActive={onActive}
        onDBClick={onDBClick}
        onContextMenu={onContextMenu}
        {...t}
      />);
    });
  }

  render() {
    const {
      icon = '',
      name = '',
      leaf = false,
      id,
      active = false,
      attributes,
      onContextMenu,
    } = this.props;

    return (
      <TreeContext.Consumer>
        {
          ({ activeKey }) => {
            return (
              <details
                className={`${selectorPrefix} ${leaf ? 'Leaf' : ''} ${activeKey && activeKey === id ? 'Active' : ''}`}
                open
              >
                <summary className={`${selectorPrefix}-Summary ${active ? 'active' : ''}`}>
                  {active ? (
                    <div
                      className={`${selectorPrefix}-Summary-bcHook`}
                      ref={(el) => {
                        if (el && el.parentElement) {
                          el.style.top = `${el.parentElement.offsetTop}px`;
                          el.style.height = `${el.parentElement.offsetHeight}px`;
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={`${selectorPrefix}-Summary-Inner`}
                    onClick={
                      Click((count) => {
                        if (count === 1) this.onClick();
                        if (count === 2) this.onDoubleClick();
                      }, (e) => {
                        e.preventDefault();
                      })
                    }
                    onContextMenuCapture={(e) => {
                      e.preventDefault();
                      onContextMenu(e, {
                        icon,
                        name,
                        leaf,
                        id,
                        attributes,
                      });
                    }}
                  >
                    {icon ? (<span className={`${selectorPrefix}-Icon fa fa-${icon}`} />) : null}
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
  // icon: 'file-o',
  name: '',
  childrendata: [],
  leaf: true,
  open: true,
  active: false,
  id: '',
  attributes: {},
};


TreeNode.propTypes = {
  name: PropTypes.node,
  leaf: PropTypes.bool,
  icon: PropTypes.string,
  childrendata: PropTypes.array,
  open: PropTypes.bool,
  active: PropTypes.bool,
  id: PropTypes.string,
  attributes: PropTypes.object,
  onActive: PropTypes.func,
  onDBClick: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default TreeNode;
