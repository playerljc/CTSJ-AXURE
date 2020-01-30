import React from 'react';
import PropTypes from 'prop-types';

import Table from '../CT-UI-Table/Table';

import './HMenu.less';

const selectorPrefix = 'CT-UI-HMenu';

/**
 * HMenu
 * @class HMenu
 * @classdesc HMenu
 */
class HMenu extends React.PureComponent {
  render() {
    return (
      <div className={`${selectorPrefix}`}>
        <Table columns={this.props.columns} />
      </div>
    );
  }
}

HMenu.propTypes = {
  columns: PropTypes.array,
};

export default HMenu;
