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
  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <input
          ref={(el) => {
            this.el = el;
          }}
          type="checkbox"
          className={`${selectorPrefix}-${groupKey}-${componentKey}-checkbox`}
        />
        <span className={`${selectorPrefix}-${groupKey}-${componentKey}-checkbox-label`}>
          aaaaaaa
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
