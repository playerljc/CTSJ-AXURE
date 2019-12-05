import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './HotAreaProperty.less';

/**
 * HotAreaProperty
 * @class HotAreaProperty
 * @classdesc HotAreaProperty
 */
class HotAreaProperty extends React.PureComponent {
  render() {
    return (
      <div>HotAreaProperty</div>
    );
  }
}

HotAreaProperty.defaultProps = {

};

HotAreaProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(HotAreaProperty);
