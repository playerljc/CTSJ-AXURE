import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './ButtonComponent.less';

/**
 * ButtonComponent
 * @class ButtonComponent
 * @classdesc ButtonComponent
 */
class ButtonComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          text,
          tooltip,
          disabled,
        },
      },
      style: {
        alignStyle,
      },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey} ${disabled ? 'Disabled' : ''}`}
        style={alignStyle}
        title={tooltip}
      >
        {text}
      </div>
    );
  }
}

ButtonComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

ButtonComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
  style: PropTypes.object,
};

export default ComponentBaseHOC(DRSHOC(ButtonComponent, {
  groupKey: 'base',
  componentKey: 'Button',
}));
