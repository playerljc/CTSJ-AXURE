import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import TreeNode from './TreeNode';

const selectorPrefix = 'CT-UI-TreeNode';

/**
 * MenuTreeNode
 * @class MenuTreeNode
 * @classdesc MenuTreeNode
 */
class MenuTreeNode extends TreeNode {
  /**
   * onRenderNode
   * @return {ReactElement}
   * @param onRenderNode
   */
  renderSummary(onRenderNode) {
    const { disabled, separation, active = false } = this.props;

    return (
      <summary
        className={`${selectorPrefix}-Summary ${active ? 'active' : ''} ${
          separation ? 'separation' : ''
        } ${disabled ? 'disabled' : ''} `}
      >
        {this.renderBcHook()}
        {this.renderInner(onRenderNode)}
      </summary>
    );
  }

  renderName(onRenderNode) {
    const { disabled, name = '' } = this.props;

    return disabled ? name : super.renderName(onRenderNode);
  }

  onClickAdapter() {
    const { disabled } = this.props;

    if (!disabled) {
      super.onClickAdapter();
    }
  }

  /**
   * onRenderNode
   * @return {ReactElement}
   * @param onRenderNode
   */
  renderInner(onRenderNode) {
    const {
      // disabled,
      separation,
    } = this.props;

    return separation ? (
      <div className={`${selectorPrefix}-Separation`} />
    ) : (
      super.renderInner(onRenderNode)
    );
  }

  /**
   * renderChildren
   * @return {ReactElement | null}
   */
  renderChildren() {
    const { leaf = false, childrendata = [], onActive, onDBClick, onContextMenu } = this.props;

    return !leaf ? (
      <div className={`${selectorPrefix}-Children`}>
        {childrendata.map((t) => {
          return (
            <MenuTreeNode
              key={uuidv1()}
              onActive={onActive}
              onDBClick={onDBClick}
              onContextMenu={onContextMenu}
              {...t}
            />
          );
        })}
      </div>
    ) : null;
  }
}

// 指定 props 的默认值：
MenuTreeNode.defaultProps = {
  disabled: false,
  separation: false,
};

MenuTreeNode.propTypes = {
  disabled: PropTypes.bool,
  separation: PropTypes.bool,
};

export default MenuTreeNode;
