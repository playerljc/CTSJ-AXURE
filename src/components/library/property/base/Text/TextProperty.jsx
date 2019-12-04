import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import './TextProperty.less';

/**
 * TextProperty
 * @class TextProperty
 * @classdesc TextProperty
 */
class TextProperty extends React.PureComponent {
  render() {
    return (
      <div>TextProperty</div>
    );
  }
}

TextProperty.defaultProps = {

};

TextProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(TextProperty);
