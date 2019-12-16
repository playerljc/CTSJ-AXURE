import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import ComponentFocusHOC from '../../ComponentFocusHOC';
import DRSHOC from '../../DRSHOC';

import './RadioComponent.less';

/**
 * RadioComponent
 * @class RadioComponent
 * @classdesc RadioComponent
 */
class RadioComponent extends React.PureComponent {
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
          type="radio"
          disabled={disabled}
          title={tooltip}
          className={`${selectorPrefix}-${groupKey}-${componentKey}-radio`}
        />
        <span className={`${selectorPrefix}-${groupKey}-${componentKey}-radio-label`}>
          {label}
        </span>
      </div>
    );
  }
}

RadioComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

RadioComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(ComponentFocusHOC(RadioComponent), {
  groupKey: 'form',
  componentKey: 'Radio',
}));
