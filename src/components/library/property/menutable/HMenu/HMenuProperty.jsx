import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import ToolTip from '../../propertyfield/tooltip/ToolTip';
import HMenu from '../../propertyfield/hmenu/HMenu';

import './HMenuProperty.less';

const selectorPrefix = 'HMenuProperty';

/**
 * HMenuProperty
 * @class HMenuProperty
 * @classdesc HMenuProperty
 */
class HMenuProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const { shape } = this.props;

    const { tooltip = '', hmenu } = shape.getProperty().prop;

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
        key: 'HMenu',
        name: 'HMenu',
        Component: (
          <HMenu
            value={hmenu}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.hmenu = v;
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

HMenuProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(HMenuProperty);
