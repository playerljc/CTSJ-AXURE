import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import ToolTip from '../../propertyfield/tooltip/ToolTip';
import Table from '../../propertyfield/table/Table';

import './TableProperty.less';
import { Immutable } from '../../../../../util/CTMobile-UI-Util';

const selectorPrefix = 'TableProperty';

/**
 * TableProperty
 * @class TableProperty
 * @classdesc TableProperty
 */
class TableProperty extends React.PureComponent {
  getTableValue() {
    const {
      shape,
    } = this.props;

    const {
      table,
    } = shape.getProperty().prop;

    const { showNumber } = table;

    if (showNumber) {
      const cloneTable = Immutable.cloneDeep(table);
      cloneTable.columns.shift();
      return cloneTable;
    } else {
      return table;
    }
  }

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
        key: 'Table',
        name: 'Table',
        Component: (
          <Table
            value={this.getTableValue()}
            onChange={(v) => {
              const prop = shape.getProperty().prop;
              prop.table = v;
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

TableProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(TableProperty);
