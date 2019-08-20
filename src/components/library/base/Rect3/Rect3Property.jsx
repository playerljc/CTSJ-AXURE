import React from 'react';
import PropTypes from 'prop-types';
import './Rect3Property.less';

/**
 * Rect3Property
 * @class Rect3Property
 * @classdesc Rect3Property
 */
class Rect3Property extends React.Component {
  render() {
    return (
      <div>Rect3Property</div>
    );
  }
}

Rect3Property.defaultProps = {

};

Rect3Property.propTypes = {
  shape: PropTypes.object,
};

export default Rect3Property;
