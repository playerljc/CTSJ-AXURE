import React from 'react';
import PropTypes from 'prop-types';

import './Shadow.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Shadow';

class Shadow extends React.Component {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        Shadow
      </div>
    );
  }
}

Shadow.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Shadow;
