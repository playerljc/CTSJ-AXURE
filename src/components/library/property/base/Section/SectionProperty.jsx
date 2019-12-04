import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './SectionProperty.less';

/**
 * SectionProperty
 * @class SectionProperty
 * @classdesc SectionProperty
 */
class SectionProperty extends React.PureComponent {
  render() {
    return (
      <div>SectionProperty</div>
    );
  }
}

SectionProperty.defaultProps = {

};

SectionProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(SectionProperty);
