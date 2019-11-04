import React from 'react';
import PropTypes from 'prop-types';

import './Fill.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Fill';

class Fill extends React.Component {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        Fill
      </div>
    );
  }
}

Fill.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Fill;
