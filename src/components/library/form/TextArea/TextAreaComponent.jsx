import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBaseHOC';
import Drag from '../../DragResizeHOC';
import './TextAreaComponent.less';

/**
 * TextAreaComponent
 * @class TextAreaComponent
 * @classdesc TextAreaComponent
 */
class TextAreaComponent extends React.Component {
  render() {
    return (
      <div>TextAreaComponent</div>
    );
  }
}

TextAreaComponent.defaultProps = {
  groupKey: '',
  componentKey: '',
};

TextAreaComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
};

export default ComponentBase(Drag(TextAreaComponent, {
  groupKey: 'base',
  componentKey: 'TextArea',
}));
