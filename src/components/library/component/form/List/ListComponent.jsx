import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './ListComponent.less';

/**
 * ListComponent
 * @class ListComponent
 * @classdesc ListComponent
 */
class ListComponent extends React.PureComponent {
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
          size = 20,
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
          className={`${selectorPrefix}-${groupKey}-${componentKey}-list`}
          ref={(el) => {
            this.el = el;
          }}
          disabled={disabled}
          placeholder={placeholder}
          size={size}
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

ListComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

ListComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(ListComponent, {
  groupKey: 'form',
  componentKey: 'List',
}));
