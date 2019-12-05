import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './HlineProperty.less';

/**
 * HlineProperty
 * @class HlineProperty
 * @classdesc HlineProperty
 */
class HlineProperty extends React.PureComponent {
  render() {
    return (
      <div>HlineProperty</div>
    );
  }
}

HlineProperty.defaultProps = {

};

HlineProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(HlineProperty);
