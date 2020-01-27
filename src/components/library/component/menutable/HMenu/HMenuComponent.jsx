import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import HMenu from '../../../../global/CT-UI-HMenu/HMenu';

import './HMenuComponent.less';

/**
 * HMenuComponent
 * @class HMenuComponent
 * @classdesc HMenuComponent
 */
class HMenuComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          tooltip = '',
          hmenu,
        },
      },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        title={tooltip}
      >
        <HMenu
          {...hmenu}
        />
      </div>
    );
  }
}

HMenuComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

HMenuComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(HMenuComponent, {
  groupKey: 'menutable',
  componentKey: 'HMenu',
}));
