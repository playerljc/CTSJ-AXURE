import React from 'react';
import PropTypes from 'prop-types';
import ComponentPropertyHOC from '../../ComponentPropertyHOC';
import './Rect3Property.less';

/**
 * Rect3Property
 * @class Rect3Property
 * @classdesc Rect3Property
 */
class Rect3Property extends React.PureComponent {
  render() {
    return (
      <div>Rect3Property</div>
    );
  }
}

Rect3Property.defaultProps = {

};

Rect3Property.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(Rect3Property);
