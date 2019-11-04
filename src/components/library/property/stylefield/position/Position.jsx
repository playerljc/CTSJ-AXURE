import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../global/CT-UI-Form/input';

import './Position.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Position';

/**
 * Position
 * @class Position
 * @classdesc 位置
 */
class Position extends React.Component {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);

    const { value: { left, top } } = props;

    this.state = {
      left,
      top,
    };

    this.onChangeX = this.onChangeX.bind(this);
    this.onChangeY = this.onChangeY.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { value: { left, top } } = nextProps;

    this.setState({
      left,
      top,
    });
  }

  /**
   * onChangeX
   * @param {Event} - e
   */
  onChangeX(e) {
    this.setState({
      left: Math.floor(e.target.value),
    }, () => {
      const { onChange } = this.props;
      const { left, top } = this.state;
      if (onChange) {
        onChange({
          left,
          top,
        });
      }
    });
  }

  /**
   * onChangeY
   * @param {Event} - e
   */
  onChangeY(e) {
    this.setState({
      top: Math.floor(e.target.value),
    }, () => {
      const { onChange } = this.props;
      const { left, top } = this.state;
      if (onChange) {
        onChange({
          left,
          top,
        });
      }
    });
  }

  render() {
    const { left, top } = this.state;
    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-item`}>
          <Input
            type="number"
            value={left}
            onChange={this.onChangeX}
          />
          <div>X:</div>
        </div>
        <div className={`${selectorPrefix}-item`}>
          <Input
            type="number"
            value={top}
            onChange={this.onChangeY}
          />
          <div>Y:</div>
        </div>
      </div>
    );
  }
}

Position.propTypes = {
  /**
   * 默认值
   * {
   *   left
   *   top
   * }
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * onChange
   */
  onChange: PropTypes.func,
};

export default Position;
