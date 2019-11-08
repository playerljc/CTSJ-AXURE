import React from 'react';
import PropTypes from 'prop-types';
import ComponentBaseHOC from '../../ComponentBaseHOC';
import ComponentFocusHOC from '../../ComponentFocusHOC';
import DRSHOC from '../../DRSHOC';
import './TextFieldComponent.less';

/**
 * TextFieldComponent
 * @class TextFieldComponent
 * @classdesc TextFieldComponent
 */
class TextFieldComponent extends React.PureComponent {
  /**
   * getStyle
   * @return {Object}
   */
  getStyle() {
    const {
      property: {
        style: {
          fill: {
            backgroundColor,
          },
        },
      },
    } = this.props;

    return {
      backgroundColor,
    };
  }

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
          style={this.getStyle()}
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

export default ComponentBaseHOC(DRSHOC(ComponentFocusHOC(TextFieldComponent), {
  groupKey: 'form',
  componentKey: 'TextField',
}));
