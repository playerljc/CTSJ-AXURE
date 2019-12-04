import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './H1Property.less';

/**
 * H1Property
 * @class H1Property
 * @classdesc H1Property
 */
class H1Property extends React.PureComponent {
  render() {
    return (
      <div>H1Property</div>
    );
  }
}

H1Property.defaultProps = {

};

H1Property.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(H1Property);
