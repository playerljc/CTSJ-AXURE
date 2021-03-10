import React from 'react';
import PropTypes from 'prop-types';

import Tree from '../CT-UI-Tree/Tree';
import Input from '../CT-UI-Form/input';

import './ChooseTarget.less';

const selectorPrefix = 'CT-UI-ChooseTarget';

/**
 * ChooseTarget
 * @class ChooseTarget
 * @classdesc ChooseTarget
 */
class ChooseTarget extends React.PureComponent {
  constructor(props) {
    super(props);

    const { target, url, page } = props;

    this.state = {
      target,
      url,
      page,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { target, url, page } = nextProps;

    this.setState({
      target,
      url,
      page,
    });
  }

  /**
   * getValue
   * @return {Object}
   */
  getValue() {
    const { page, ...other } = this.state;

    return other;
  }

  onInsideChange(e) {
    const checked = e.target.checked;
    this.setState({
      url: '',
      target: checked ? 'inside' : 'outer',
    });
  }

  onOuterChange(e) {
    const checked = e.target.checked;
    this.setState({
      url: '',
      target: checked ? 'outer' : 'inside',
    });
  }

  onOuterInputChange(e) {
    const value = e.target.value;
    this.setState({
      url: value,
    });
  }

  onTreeActive(node) {
    const id = node.id;
    this.setState({
      url: id,
    });
  }

  getInsideChecked() {
    const { target } = this.state;
    return target === 'inside';
  }

  getOuterChecked() {
    const { target } = this.state;
    return target === 'outer';
  }

  getOuterInputDisabled() {
    const { target } = this.state;
    return target === 'inside';
  }

  getOuterValue() {
    const { target, url } = this.state;
    return target === 'outer' ? url : '';
  }

  renderTreeMask() {
    const { zIndex } = this.props;
    const { target } = this.state;
    return target === 'outer' ? (
      <div className={`${selectorPrefix}-InsideWrap-Tree-Mask`} style={{ zIndex: zIndex + 10 }} />
    ) : null;
  }

  render() {
    const { url, page } = this.state;

    return (
      <form className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-InsideWrap`}>
          <div className={`${selectorPrefix}-InsideWrap-Radio`}>
            <input
              type="radio"
              name="position"
              checked={this.getInsideChecked()}
              onChange={::this.onInsideChange}
            />
            <span>Link to a page of the current project</span>
          </div>
          <div className={`${selectorPrefix}-InsideWrap-Tree`}>
            <Tree data={page} activeKey={url} onActive={::this.onTreeActive} />
            {this.renderTreeMask()}
          </div>
        </div>

        <div className={`${selectorPrefix}-OuterWrap`}>
          <div className={`${selectorPrefix}-OuterWrap-Radio`}>
            <input
              type="radio"
              name="position"
              checked={this.getOuterChecked()}
              onChange={::this.onOuterChange}
            />
            <span>Connect to url e.g .: http://www.google.com</span>
          </div>
          <div className={`${selectorPrefix}-OuterWrap-InputWrap`}>
            <span className={`${selectorPrefix}-OuterWrap-Label`}>link</span>
            <div className={`${selectorPrefix}-OuterWrap-Input`}>
              <Input
                disabled={this.getOuterInputDisabled()}
                type="url"
                value={this.getOuterValue()}
                onChange={::this.onOuterInputChange}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ChooseTarget.propTypes = {
  // 目标 [外部和内部]
  target: PropTypes.oneOf(['inside', 'outer']),
  // 目标值
  url: PropTypes.string,
  // 页面
  page: PropTypes.array,
  zIndex: PropTypes.number,
};

export default ChooseTarget;
