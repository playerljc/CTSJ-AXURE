import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './TreeProperty.less';

/**
 * TreeProperty
 * @class TreeProperty
 * @classdesc TreeProperty
 */
class TreeProperty extends React.PureComponent {
  render() {
    return (
      <div>TreeProperty</div>
    );
  }
}

TreeProperty.defaultProps = {

};

TreeProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(TreeProperty);
