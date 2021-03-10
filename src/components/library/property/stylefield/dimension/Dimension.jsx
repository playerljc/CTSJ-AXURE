import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../global/CT-UI-Form/input';

import './Dimension.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Dimension';

/**
 * Dimension
 * @class Dimension
 * @classdesc 尺寸
 */
class Dimension extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      ...value,
    };

    this.onChangeWidth = this.onChangeWidth.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { value } = props;
  //
  //   return {
  //     ...value,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    this.setState({
      ...value,
    });
  }

  /**
   * onChangeWidth
   * @param {Event} - e
   */
  onChangeWidth(e) {
    this.setState(
      {
        width: Math.floor(e.target.value),
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange({
            ...this.state,
          });
        }
      },
    );
  }

  /**
   * onChangeHeight
   * @param {Event} - e
   */
  onChangeHeight(e) {
    this.setState(
      {
        height: Math.floor(e.target.value),
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange({
            ...this.state,
          });
        }
      },
    );
  }

  render() {
    const { width, height } = this.state;
    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-item`}>
          <Input type="number" value={width} onChange={this.onChangeWidth} />
          <div>Width:</div>
        </div>
        <div className={`${selectorPrefix}-item`}>
          <Input type="number" value={height} onChange={this.onChangeHeight} />
          <div>Height:</div>
        </div>
      </div>
    );
  }
}

Dimension.propTypes = {
  /**
   * 默认值
   * {
   *   width
   *   height
   * }
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /**
   * onChange
   */
  onChange: PropTypes.func,
};

export default Dimension;
