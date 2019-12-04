import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './EllipseProperty.less';

/**
 * EllipseProperty
 * @class EllipseProperty
 * @classdesc EllipseProperty
 */
class EllipseProperty extends React.PureComponent {
  render() {
    return (
      <div>EllipseProperty</div>
    );
  }
}

EllipseProperty.defaultProps = {

};

EllipseProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(EllipseProperty);
