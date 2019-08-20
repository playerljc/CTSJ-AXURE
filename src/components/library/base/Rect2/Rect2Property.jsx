import React from 'react';
import PropTypes from 'prop-types';
import './Rect2Property.less';

/**
 * Rect2Property
 * @class Rect2Property
 * @classdesc Rect2Property
 */
class Rect2Property extends React.Component {
  render() {
    return (
      <div>Rect2Property</div>
    );
  }
}

Rect2Property.defaultProps = {

};

Rect2Property.propTypes = {
  shape: PropTypes.object,
};

export default Rect2Property;
