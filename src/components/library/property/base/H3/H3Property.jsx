import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './H3Property.less';

/**
 * H3Property
 * @class H3Property
 * @classdesc H3Property
 */
class H3Property extends React.PureComponent {
  render() {
    return (
      <div>H3Property</div>
    );
  }
}

H3Property.defaultProps = {

};

H3Property.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(H3Property);
