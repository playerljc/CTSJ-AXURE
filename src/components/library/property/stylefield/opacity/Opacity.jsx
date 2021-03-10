import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../global/CT-UI-Form/input';

import './Opacity.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Opacity';

/**
 * Opacity
 * @class Opacity
 * @classdesc 透明度
 */
class Opacity extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      value,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     value,
  //   } = props;
  //
  //   return {
  //     value,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    this.setState({
      value,
    });
  }

  render() {
    const { value } = this.state;
    const { onChange } = this.props;

    return (
      <div className={`${selectorPrefix}`}>
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            let opacity = e.target.value;
            opacity = opacity < 0 ? 0 : opacity > 100 ? 100 : opacity;
            if (onChange) {
              onChange(opacity);
            }
          }}
        />
        %
      </div>
    );
  }
}

Opacity.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
};

export default Opacity;
