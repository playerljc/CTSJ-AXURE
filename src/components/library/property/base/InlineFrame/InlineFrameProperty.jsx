import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './InlineFrameProperty.less';

/**
 * InlineFrameProperty
 * @class InlineFrameProperty
 * @classdesc InlineFrameProperty
 */
class InlineFrameProperty extends React.PureComponent {
  render() {
    return (
      <div>InlineFrameProperty</div>
    );
  }
}

InlineFrameProperty.defaultProps = {

};

InlineFrameProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(InlineFrameProperty);
