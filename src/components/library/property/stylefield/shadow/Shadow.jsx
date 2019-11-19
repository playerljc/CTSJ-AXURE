import React from 'react';
import PropTypes from 'prop-types';

import BorderShadowPicker from '../../../../global/CT-UI-ShadowPicker/BorderShadowPicker';

// const selectorPrefix = 'ComponentPropertyStyleTab-Shadow';

/**
 * Shadow
 * @class ShadowBack
 * @classdesc 阴影
 */
class ShadowBack extends React.PureComponent {
  render() {
    const { value, onChange } = this.props;
    return (
      <BorderShadowPicker
        value={value}
        onChange={(shadow) => {
          onChange(shadow);
        }}
      />
    );
  }
}

ShadowBack.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default ShadowBack;
