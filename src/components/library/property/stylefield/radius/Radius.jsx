import React from 'react';
import PropTypes from 'prop-types';

import './Radius.less';

const selectorPrefix = 'ComponentPropertyStyleTab-Radius';

class Radius extends React.PureComponent {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        Radius
      </div>
    );
  }
}

Radius.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default Radius;
