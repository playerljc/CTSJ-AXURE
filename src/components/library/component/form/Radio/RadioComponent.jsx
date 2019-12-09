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
  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`}>
        <input
          ref={(el) => {
            this.el = el;
          }}
          type="Radio"
          className={`${selectorPrefix}-${groupKey}-${componentKey}-radio`}
        />
        <span className={`${selectorPrefix}-${groupKey}-${componentKey}-radio-label`}>
          aaaaaaa
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
