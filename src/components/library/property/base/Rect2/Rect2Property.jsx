import React from 'react';
import PropTypes from 'prop-types';
import ComponentPropertyHOC from '../../ComponentPropertyHOC';
import './Rect2Property.less';

/**
 * Rect2Property
 * @class Rect2Property
 * @classdesc Rect2Property
 */
class Rect2Property extends React.PureComponent {
  render() {
    return (
      <div>Rect2Property</div>
    );
  }
}

Rect2Property.defaultProps = {

};

Rect2Property.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(Rect2Property);
