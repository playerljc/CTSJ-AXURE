import React from 'react';
import PropTypes from 'prop-types';
import ComponentPropertyHOC from '../../ComponentPropertyHOC';
import './TextAreaProperty.less';

/**
 * TextAreaProperty
 * @class TextAreaProperty
 * @classdesc TextAreaProperty
 */
class TextAreaProperty extends React.PureComponent {
  render() {
    return (
      <div>TextAreaProperty</div>
    );
  }
}

TextAreaProperty.defaultProps = {

};

TextAreaProperty.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyHOC(TextAreaProperty);
