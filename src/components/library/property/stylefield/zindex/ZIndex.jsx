import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../global/CT-UI-Form/input';

import './ZIndex.less';

const selectorPrefix = 'ComponentPropertyStyleTab-ZIndex';

/**
 * ZIndex
 * @class ZIndex
 * @classdesc 层级
 */
class ZIndex extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      value,
    } = props;

    this.state = {
      value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      value,
    } = props;

    return {
      value,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     value,
  //   } = nextProps;
  //
  //   this.setState({
  //     value,
  //   });
  // }

  render() {
    const { value } = this.state;
    const { onChange } = this.props;

    return (
      <div className={`${selectorPrefix}`}>
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const zindex = e.target.value;
            if (onChange) {
              onChange(zindex);
            }
          }}
        />
      </div>
    );
  }
}

ZIndex.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default ZIndex;
