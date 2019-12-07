import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './HMenuProperty.less';

/**
 * HMenuProperty
 * @class HMenuProperty
 * @classdesc HMenuProperty
 */
class HMenuProperty extends React.PureComponent {
  render() {
    return (
      <div>HMenuProperty</div>
    );
  }
}

HMenuProperty.defaultProps = {

};

HMenuProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(HMenuProperty);
