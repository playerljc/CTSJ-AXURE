import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import ToolTip from '../../propertyfield/tooltip/ToolTip';
import VMenu from '../../propertyfield/vmenu/VMenu';

import './VMenuProperty.less';

const selectorPrefix = 'VMenuProperty';

/**
 * VMenuProperty
 * @class VMenuProperty
 * @classdesc VMenuProperty
 */
class VMenuProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const { shape } = this.props;

    const { tooltip = '', vmenu } = shape.getProperty().prop;

    return [
      {
        key: 'Interaction',
        name: 'Interaction',
        Component: null,
      },
      {
        key: 'ToolTip',
        name: 'ToolTip',
        Component: (
          <ToolTip
            value={tooltip}
            onChange={(value) => {
              const {prop} = shape.getProperty();
              prop.tooltip = value;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'VMenu',
        name: 'VMenu',
        Component: (
          <VMenu
            value={vmenu}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.vmenu = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
    ];
  }

  render() {
    const { children } = this.props;

    return <div className={selectorPrefix}>{children(this.getConfig())}</div>;
  }
}

VMenuProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(VMenuProperty);
