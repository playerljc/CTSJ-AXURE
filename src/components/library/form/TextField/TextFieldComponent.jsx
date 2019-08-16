import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBase';
import Drag from '../../Drag';
import './TextFieldComponent.less';

/**
 * TextFieldComponent
 * @class TextFieldComponent
 * @classdesc TextFieldComponent
 */
class TextFieldComponent extends React.Component {
  render() {
    return (
      <div>TextFieldComponent</div>
    );
  }
}

TextFieldComponent.defaultProps = {
  groupKey: '',
  componentKey: '',
};

TextFieldComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
};

export default ComponentBase(Drag(TextFieldComponent, {
  groupKey: 'base',
  componentKey: 'TextField',
}));
