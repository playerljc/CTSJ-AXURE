import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './PrimaryButtonProperty.less';

/**
 * PrimaryButtonProperty
 * @class PrimaryButtonProperty
 * @classdesc PrimaryButtonProperty
 */
class PrimaryButtonProperty extends React.PureComponent {
  render() {
    return (
      <div>PrimaryButtonProperty</div>
    );
  }
}

PrimaryButtonProperty.defaultProps = {

};

PrimaryButtonProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(PrimaryButtonProperty);
