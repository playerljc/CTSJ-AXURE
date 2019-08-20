import React from 'react';
import PropTypes from 'prop-types';
import './TextFieldProperty.less';

/**
 * TextFieldProperty
 * @class TextFieldProperty
 * @classdesc TextFieldProperty
 */
class TextFieldProperty extends React.Component {
  render() {
    return (
      <div>TextFieldProperty</div>
    );
  }
}

TextFieldProperty.defaultProps = {

};

TextFieldProperty.propTypes = {
  shape: PropTypes.object,
};

export default TextFieldProperty;
