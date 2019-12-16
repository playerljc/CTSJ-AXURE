import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import ComponentFocusHOC from '../../ComponentFocusHOC';
import DRSHOC from '../../DRSHOC';

import './CheckboxComponent.less';

/**
 * CheckboxComponent
 * @class CheckboxComponent
 * @classdesc CheckboxComponent
 */
class CheckboxComponent extends React.PureComponent {
  componentDidMount() {
    const {
      property: {
        prop: {
          checked = false,
        },
      },
    } = this.props;

    this.el.checked = checked;
  }

  componentWillReceiveProps(nextProps) {
    const {
      property: {
        prop: {
          checked = false,
        },
      },
    } = nextProps;

    this.el.checked = checked;
  }

  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          tooltip = '',
          label = '',
          disabled = false,
          required = false,
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
        <input
          ref={(el) => {
            this.el = el;
          }}
          type="checkbox"
          disabled={disabled}
          title={tooltip}
          className={`${selectorPrefix}-${groupKey}-${componentKey}-checkbox`}
        />
        <span className={`${selectorPrefix}-${groupKey}-${componentKey}-checkbox-label`}>
          {label}
        </span>
      </div>
    );
  }
}

CheckboxComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

CheckboxComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(ComponentFocusHOC(CheckboxComponent), {
  groupKey: 'form',
  componentKey: 'Checkbox',
}));
