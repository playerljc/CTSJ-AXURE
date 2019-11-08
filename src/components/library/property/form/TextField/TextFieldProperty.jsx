import React from 'react';
import PropTypes from 'prop-types';
import ComponentPropertyHOC from '../../ComponentPropertyHOC';
import './TextFieldProperty.less';

/**
 * TextFieldProperty
 * @class TextFieldProperty
 * @classdesc TextFieldProperty
 */
class TextFieldProperty extends React.PureComponent {
  render() {
    return (
      <div>TextFieldProperty</div>
    );
  }
}

TextFieldProperty.defaultProps = {

};

TextFieldProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(TextFieldProperty);
