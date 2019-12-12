import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import ComponentFocusHOC from '../../ComponentFocusHOC';
import DRSHOC from '../../DRSHOC';

import './TextAreaComponent.less';

/**
 * TextAreaComponent
 * @class TextAreaComponent
 * @classdesc TextAreaComponent
 */
class TextAreaComponent extends React.PureComponent {
  componentDidMount() {
    const {
      property: {
        prop: {
          value = '',
        },
      },
    } = this.props;

    this.el.value = value;
  }

  componentWillReceiveProps(nextProps) {
    const {
      property: {
        prop: {
          value = '',
        },
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
          placeholder = '',
          maxlength = 50,
          autofocus = false,
          readonly = false,
          disabled = false,
          required = false,
          cols = 20,
          rows = 20,
        },
      },
      style: {
        alignStyle,
      },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey} ${required ? 'require' : ''}`}
        style={alignStyle}
      >
        <textarea
          ref={(el) => {
            this.el = el;
          }}
          readOnly={readonly}
          disabled={disabled}
          placeholder={placeholder}
          title={tooltip}
          maxLength={maxlength}
          autoFocus={autofocus}
          cols={cols}
          rows={rows}
          className={`${selectorPrefix}-${groupKey}-${componentKey}-input`}
        />
        <div
          className={`${selectorPrefix}-${groupKey}-${componentKey}-mask `}
        />
      </div>
    );
  }
}

TextAreaComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

TextAreaComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(ComponentFocusHOC(TextAreaComponent), {
  groupKey: 'form',
  componentKey: 'TextArea',
}));
