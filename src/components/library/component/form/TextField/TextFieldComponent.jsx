import React from 'react';
import PropTypes from 'prop-types';
import ComponentBaseHOC from '../../ComponentBaseHOC';
import ComponentFocusHOC from '../../ComponentFocusHOC';
import DragResizeHOC from '../../DragResizeHOC';
import './TextFieldComponent.less';

/**
 * TextFieldComponent
 * @class TextFieldComponent
 * @classdesc TextFieldComponent
 */
class TextFieldComponent extends React.Component {
  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <input
          ref={(el) => {
            this.el = el;
          }}
          type="text"
          disabled
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

export default ComponentBaseHOC(DragResizeHOC(ComponentFocusHOC(TextFieldComponent), {
  groupKey: 'form',
  componentKey: 'TextField',
}));
