import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBaseHOC';
import Drag from '../../DragResizeHOC';
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
  groupKey: 'form',
  componentKey: 'TextField',
}));
