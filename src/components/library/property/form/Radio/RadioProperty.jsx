import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './RadioProperty.less';

/**
 * RadioProperty
 * @class RadioProperty
 * @classdesc RadioProperty
 */
class RadioProperty extends React.PureComponent {
  render() {
    return (
      <div>RadioProperty</div>
    );
  }
}

RadioProperty.defaultProps = {

};

RadioProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(RadioProperty);
