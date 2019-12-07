import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './VMenuProperty.less';

/**
 * VMenuProperty
 * @class VMenuProperty
 * @classdesc VMenuProperty
 */
class VMenuProperty extends React.PureComponent {
  render() {
    return (
      <div>VMenuProperty</div>
    );
  }
}

VMenuProperty.defaultProps = {

};

VMenuProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(VMenuProperty);
