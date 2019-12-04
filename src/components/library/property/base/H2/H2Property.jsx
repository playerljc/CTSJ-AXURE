import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './H2Property.less';

/**
 * H2Property
 * @class H2Property
 * @classdesc H2Property
 */
class H2Property extends React.PureComponent {
  render() {
    return (
      <div>H2Property</div>
    );
  }
}

H2Property.defaultProps = {

};

H2Property.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(H2Property);
