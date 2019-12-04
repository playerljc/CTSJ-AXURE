import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './ButtonProperty.less';

/**
 * ButtonProperty
 * @class ButtonProperty
 * @classdesc ButtonProperty
 */
class ButtonProperty extends React.PureComponent {
  render() {
    return (
      <div>ButtonProperty</div>
    );
  }
}

ButtonProperty.defaultProps = {

};

ButtonProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(ButtonProperty);
