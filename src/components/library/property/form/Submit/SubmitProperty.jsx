import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './SubmitProperty.less';

/**
 * SubmitProperty
 * @class SubmitProperty
 * @classdesc SubmitProperty
 */
class SubmitProperty extends React.PureComponent {
  render() {
    return (
      <div>SubmitProperty</div>
    );
  }
}

SubmitProperty.defaultProps = {

};

SubmitProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(SubmitProperty);
