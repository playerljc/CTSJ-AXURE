import React from 'react';
import PropTypes from 'prop-types';

import './FontFamily.less';

const selectorPrefix = 'ComponentPropertyStyleTab-FontFamily';

class FontFamily extends React.PureComponent {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        FontFamily
      </div>
    );
  }
}

FontFamily.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default FontFamily;
