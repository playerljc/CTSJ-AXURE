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
  constructor(props) {
    super(props);
  }

  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <input
          type="text"
          className={`${selectorPrefix}-${groupKey}-${componentKey}-input`}
        />
      </div>
    );
  }
}

TextFieldComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

TextFieldComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBase(Drag(TextFieldComponent, {
  groupKey: 'form',
  componentKey: 'TextField',
}));
