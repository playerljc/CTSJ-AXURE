import React from 'react';
import PropTypes from 'prop-types';
import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './Rect1Property.less';

/**
 * Rect1Property
 * @class Rect1Property
 * @classdesc Rect1Property
 */
class Rect1Property extends React.PureComponent {
  render() {
    return (
      <div>Rect1Property</div>
    );
  }
}

Rect1Property.defaultProps = {

};

Rect1Property.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(Rect1Property);
