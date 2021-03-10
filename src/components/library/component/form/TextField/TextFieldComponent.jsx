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
  componentDidMount() {
    const {
      property: {
        prop: { value = '' },
      },
    } = this.props;

    this.el.value = value;
  }

  componentWillReceiveProps(nextProps) {
    const {
      property: {
        prop: { value = '' },
      },
    } = nextProps;

    this.el.value = value;
  }

  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          tooltip = '',
          type = 'text',
          placeholder = '',
          maxlength = 50,
          autofocus = false,
          readonly = false,
          disabled = false,
          required = false,
        },
      },
      style: { alignStyle },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey} ${required ? 'require' : ''}`}
        style={alignStyle}
      >
        <input
          ref={(el) => {
            this.el = el;
          }}
          type={type}
          readOnly={readonly}
          disabled={disabled}
          placeholder={placeholder}
          title={tooltip}
          maxLength={maxlength}
          autoFocus={autofocus}
          className={`${selectorPrefix}-${groupKey}-${componentKey}-input`}
        />
        <div className={`${selectorPrefix}-${groupKey}-${componentKey}-mask `} />
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

export default ComponentBaseHOC(
  DRSHOC(ComponentFocusHOC(TextFieldComponent), {
    groupKey: 'form',
    componentKey: 'TextField',
  }),
);
