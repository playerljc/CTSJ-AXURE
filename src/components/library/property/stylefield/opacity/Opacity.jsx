import React from 'react';
import PropTypes from 'prop-types';

import './Opacity.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Opacity';

class Opacity extends React.Component {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        Opacity
      </div>
    );
  }
}

Opacity.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Opacity;
