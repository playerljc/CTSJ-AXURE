import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './SelectComponent.less';

/**
 * SelectComponent
 * @class SelectComponent
 * @classdesc SelectComponent
 */
class SelectComponent extends React.PureComponent {
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

  renderOptions() {
    const {
      property: {
        prop: {
          data = [],
        },
      },
    } = this.props;

    return data.map(({ label, value }) => <option key={value} value={value}>{label}</option>);
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
        <select
          className={`${selectorPrefix}-${groupKey}-${componentKey}-select`}
          ref={(el) => {
            this.el = el;
          }}
          disabled={disabled}
          placeholder={placeholder}
          title={tooltip}
        >
          {this.renderOptions()}
        </select>
        <div
          className={`${selectorPrefix}-${groupKey}-${componentKey}-mask `}
        />
      </div>
    );
  }
}

SelectComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

SelectComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(SelectComponent, {
  groupKey: 'form',
  componentKey: 'Select',
}));
