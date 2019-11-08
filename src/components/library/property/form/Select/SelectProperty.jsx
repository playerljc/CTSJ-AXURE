import React from 'react';
import PropTypes from 'prop-types';
import ComponentPropertyHOC from '../../ComponentPropertyHOC';
import './SelectProperty.less';

/**
 * SelectProperty
 * @class SelectProperty
 * @classdesc SelectProperty
 */
class SelectProperty extends React.PureComponent {
  render() {
    return (
      <div>SelectProperty</div>
    );
  }
}

SelectProperty.defaultProps = {

};

SelectProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(SelectProperty);
