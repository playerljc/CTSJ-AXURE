import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import ToolTip from '../../propertyfield/tooltip/ToolTip';
import VMenuTree from '../../propertyfield/vmenutree/VMenuTree';

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
    const {
      shape,
    } = this.props;

    const {
      tooltip = '',
      vmenu: {
        data,
      },
    } = shape.getProperty().prop;

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
              const prop = shape.getProperty().prop;
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
          <VMenuTree
            value={{
              data: data.map(t => (Object.assign(t, {
                leaf: t.separation || !(t.children && t.children.length !== 0),
                childrendata: t.children,
              }))),
            }}
            onChange={(v) => {
              const prop = shape.getProperty().prop;
              debugger
              prop.vmenu = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
    ];
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className={selectorPrefix}>
        {children(this.getConfig())}
      </div>
    );
  }
}

VMenuProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(VMenuProperty);
