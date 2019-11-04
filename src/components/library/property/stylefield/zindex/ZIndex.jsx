import React from 'react';
import PropTypes from 'prop-types';

import './ZIndex.less';

const selectorPrefix = 'ComponentPropertyStyleTab-ZIndex';

class ZIndex extends React.Component {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        ZIndex
      </div>
    );
  }
}

ZIndex.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default ZIndex;
