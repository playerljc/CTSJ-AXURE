import React from 'react';
import PropTypes from 'prop-types';
import './TextAreaProperty.less';

/**
 * TextAreaProperty
 * @class TextAreaProperty
 * @classdesc TextAreaProperty
 */
class TextAreaProperty extends React.Component {
  render() {
    return (
      <div>TextAreaProperty</div>
    );
  }
}

TextAreaProperty.defaultProps = {

};

TextAreaProperty.propTypes = {
  shape: PropTypes.object,
};

export default TextAreaProperty;
