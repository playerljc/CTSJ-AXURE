import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './CheckboxProperty.less';

/**
 * CheckboxProperty
 * @class CheckboxProperty
 * @classdesc CheckboxProperty
 */
class CheckboxProperty extends React.PureComponent {
  render() {
    return (
      <div>CheckboxProperty</div>
    );
  }
}

CheckboxProperty.defaultProps = {

};

CheckboxProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(CheckboxProperty);
