import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import MenuTree from '../../../../global/CT-UI-Tree/MenuTree';

import './VMenuComponent.less';

/**
 * VMenuComponent
 * @class VMenuComponent
 * @classdesc VMenuComponent
 */
class VMenuComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          tooltip = '',
          vmenu,
        },
      },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        title={tooltip}
      >
        <MenuTree
          {...Object.assign(vmenu, {
            data: vmenu.data.map(t => (Object.assign(t, {
              leaf: t.separation || !(t.children && t.children.length !== 0),
              childrendata: t.children,
            }))),
          })}
        />
      </div>
    );
  }
}

VMenuComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

VMenuComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(VMenuComponent, {
  groupKey: 'menutable',
  componentKey: 'VMenu',
}));
