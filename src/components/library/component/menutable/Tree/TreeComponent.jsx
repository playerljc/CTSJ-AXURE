import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import Tree from '../../../../global/CT-UI-Tree/Tree';

import './TreeComponent.less';

/**
 * TreeComponent
 * @class TreeComponent
 * @classdesc TreeComponent
 */
class TreeComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          tooltip = '',
          tree,
        },
      },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        title={tooltip}
      >
        <Tree
          {...tree}
        />
      </div>
    );
  }
}

TreeComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

TreeComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(TreeComponent, {
  groupKey: 'menutable',
  componentKey: 'Tree',
}));
