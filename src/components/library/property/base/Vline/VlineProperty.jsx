import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './VlineProperty.less';

/**
 * VlineProperty
 * @class VlineProperty
 * @classdesc VlineProperty
 */
class VlineProperty extends React.PureComponent {
  render() {
    return (
      <div>VlineProperty</div>
    );
  }
}

VlineProperty.defaultProps = {

};

VlineProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(VlineProperty);
