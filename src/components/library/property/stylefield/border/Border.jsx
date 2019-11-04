import React from 'react';
import PropTypes from 'prop-types';

import './Border.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Border';

class Border extends React.Component {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        Border
      </div>
    );
  }
}

Border.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Border;
