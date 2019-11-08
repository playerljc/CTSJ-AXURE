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
class Position extends React.PureComponent {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      ...value,
    };

    this.onChangeX = this.onChangeX.bind(this);
    this.onChangeY = this.onChangeY.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    this.setState({
      ...value,
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
      if (onChange) {
        onChange({
          ...this.state,
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
      if (onChange) {
        onChange({
          ...this.state,
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
