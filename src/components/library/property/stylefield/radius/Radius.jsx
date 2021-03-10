import React from 'react';
import PropTypes from 'prop-types';

import RadiusPicker from '../../../../global/CT-UI-RadiusPicker/RadiusPicker';

import './Radius.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Radius';

/**
 * Radius
 * @class Radius
 * @classdesc 圆角
 */
class Radius extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = { ...value };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     value,
  //   } = props;
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

  render() {
    const { onChange } = this.props;

    return (
      <div className={`${selectorPrefix}`}>
        <RadiusPicker
          {...this.state}
          onChange={(radius) => {
            if (onChange) {
              onChange(radius);
            }
          }}
        />
      </div>
    );
  }
}

Radius.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
};

export default Radius;
