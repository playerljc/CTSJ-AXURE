import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import ToolTip from '../../propertyfield/tooltip/ToolTip';
import Tree from '../../propertyfield/tree/Tree';

import './TreeProperty.less';

const selectorPrefix = 'TreeProperty';

/**
 * TreeProperty
 * @class TreeProperty
 * @classdesc TreeProperty
 */
class TreeProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const { shape } = this.props;

    const { tooltip = '', tree } = shape.getProperty().prop;

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
        key: 'Tree',
        name: 'Tree',
        Component: (
          <Tree
            value={tree}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.tree = v;
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

TreeProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(TreeProperty);
