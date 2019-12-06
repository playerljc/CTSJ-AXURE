import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './ListProperty.less';

/**
 * ListProperty
 * @class ListProperty
 * @classdesc ListProperty
 */
class ListProperty extends React.PureComponent {
  render() {
    return (
      <div>ListProperty</div>
    );
  }
}

ListProperty.defaultProps = {

};

ListProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(ListProperty);
