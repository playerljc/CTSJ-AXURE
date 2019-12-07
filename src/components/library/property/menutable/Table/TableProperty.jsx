import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './TableProperty.less';

/**
 * TableProperty
 * @class TableProperty
 * @classdesc TableProperty
 */
class TableProperty extends React.PureComponent {
  render() {
    return (
      <div>TableProperty</div>
    );
  }
}

TableProperty.defaultProps = {

};

TableProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(TableProperty);
