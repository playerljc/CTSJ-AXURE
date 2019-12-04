import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './LinkButtonProperty.less';

/**
 * LinkButtonProperty
 * @class LinkButtonProperty
 * @classdesc LinkButtonProperty
 */
class LinkButtonProperty extends React.PureComponent {
  render() {
    return (
      <div>LinkButtonProperty</div>
    );
  }
}

LinkButtonProperty.defaultProps = {

};

LinkButtonProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(LinkButtonProperty);
