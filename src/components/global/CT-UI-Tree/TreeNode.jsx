import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { TreeContext } from './Context';
import Click from '../../../util/Click';
import { Immutable } from '../../../util/CTMobile-UI-Util';

import './TreeNode.less';

const selectorPrefix = 'CT-UI-TreeNode';

/**
 * TreeNode
 * @class TreeNode
 * @classdesc TreeNode
 */
class TreeNode extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickAdapter = Click(
      (count) => {
        if (count === 1) this.onClick();
        if (count === 2) this.onDoubleClick();
      },
      (e) => {
        e.preventDefault();
      },
    );
  }

  /**
   * onClick
   */
  onClick() {
    const { id, onActive, attributes } = this.props;
    if (onActive) {
      onActive({
        id,
        attributes,
      });
    }
  }

  /**
   * onDoubleClick
   */
  onDoubleClick() {
    const { name = '', leaf = false, id, attributes, onActive, onDBClick } = this.props;

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

  /**
   * onContextMenuCapture
   * @param {Event} - e
   */
  onContextMenuCapture(e) {
    const { icon = '', name = '', leaf = false, id, attributes, onContextMenu } = this.props;

    e.preventDefault();
    onContextMenu(e, {
      icon,
      name,
      leaf,
      id,
      attributes,
    });
  }

  /**
   * onRenderNode
   * @param {Function} - onRenderNode
   * @return {ReactElement}
   */
  renderSummary(onRenderNode) {
    const { active = false } = this.props;

    return (
      <summary className={`${selectorPrefix}-Summary ${active ? 'active' : ''}`}>
        {this.renderBcHook()}
        {this.renderInner(onRenderNode)}
      </summary>
    );
  }

  /**
   * renderBcHook
   * @return {ReactElement | null}
   */
  renderBcHook() {
    const { active = false } = this.props;

    return active ? (
      <div
        className={`${selectorPrefix}-Summary-bcHook`}
        ref={(el) => {
          if (el && el.parentElement) {
            el.style.top = `${el.parentElement.offsetTop}px`;
            el.style.height = `${el.parentElement.offsetHeight}px`;
          }
        }}
      />
    ) : null;
  }

  /**
   * onRenderNode
   * @param {Function} - onRenderNode
   * @return {ReactElement}
   */
  renderInner(onRenderNode) {
    const { icon = '' } = this.props;

    return (
      <div
        className={`${selectorPrefix}-Summary-Inner`}
        onClick={this.onClickAdapter}
        onContextMenuCapture={::this.onContextMenuCapture}
      >
        {icon ? <span className={`${selectorPrefix}-Icon ${icon}`} /> : null}
        <span className={`${selectorPrefix}-Name`}>{this.renderName(onRenderNode)}</span>
      </div>
    );
  }

  /**
   * renderName
   * @param {Function} - onRenderNode
   * @return {ReactElement}
   */
  renderName(onRenderNode) {
    const { name = '' } = this.props;

    return onRenderNode ? onRenderNode(this.getOther()) : name;
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
            <TreeNode
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

  /**
   * getOther
   * @return {Object}
   */
  getOther() {
    const { onActive, onDBClick, onContextMenu, ...other } = this.props;

    return Immutable.cloneDeep(other);
  }

  render() {
    const { leaf = false, id } = this.props;

    return (
      <TreeContext.Consumer>
        {({ activeKey, onRenderNode }) => {
          return (
            <details
              className={`${selectorPrefix} ${leaf ? 'Leaf' : ''} ${
                activeKey && activeKey === id ? 'Active' : ''
              }`}
              open
            >
              {this.renderSummary(onRenderNode)}
              {this.renderChildren()}
            </details>
          );
        }}
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
