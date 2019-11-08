import React from 'react';
import PropTypes from 'prop-types';

import './LineHeight.less';

const selectorPrefix = 'ComponentPropertyStyleTab-LineHeight';

class LineHeight extends React.PureComponent {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        LineHeight
      </div>
    );
  }
}

LineHeight.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
};

export default LineHeight;
