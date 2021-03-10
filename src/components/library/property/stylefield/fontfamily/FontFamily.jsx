import React from 'react';
import PropTypes from 'prop-types';

import FontFamilyPicker from '../../../../global/CT-UI-FontFamilyPicker/FontFamilyPicker';

import './FontFamily.less';

const selectorPrefix = 'ComponentPropertyStyleTab-FontFamily';

/**
 * FontFamily
 * @class FontFamily
 * @classdesc 字体
 */
class FontFamily extends React.PureComponent {
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
        <FontFamilyPicker
          {...this.state}
          onChange={(fontfamily) => {
            if (onChange) {
              onChange(fontfamily);
            }
          }}
        />
      </div>
    );
  }
}

FontFamily.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
};

export default FontFamily;
