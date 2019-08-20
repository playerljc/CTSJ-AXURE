import React from 'react';
import PropTypes from 'prop-types';
import './Rect1Property.less';

/**
 * Rect1Property
 * @class Rect1Property
 * @classdesc Rect1Property
 */
class Rect1Property extends React.Component {
  render() {
    return (
      <div>Rect1Property</div>
    );
  }
}

Rect1Property.defaultProps = {

};

Rect1Property.propTypes = {
  shape: PropTypes.object,
};

export default Rect1Property;
