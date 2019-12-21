import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';
import { ProviderContext } from './ContextMenuContext';
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './SubMenu.less';

const selectorPrefix = 'CT-UI-ContextMenu-SubMenu';

/**
 * Menu
 * @class Menu
 * @classdesc Menu
 */
class Menu extends React.PureComponent {
  getStyle() {
    const { x, y, width } = this.config;
    return {
      width: `${width}px`,
      left: `${x}px`,
      top: `${y}px`,
      zIndex: window.parseInt(getMaxLevelNumber()) * 2 + 1,
    };
  }

  render() {
    const { data = []} = this.props;
    return (
      <ProviderContext.Consumer>{({ config }) => {
        this.config = config;
        return (
          <ul
            className={`${selectorPrefix}`}
            style={this.getStyle()}
          >
            {data.map(item => <MenuItem key={item.id} data={item} />)}
          </ul>
        );
      }}
      </ProviderContext.Consumer>

    );
  }
}

Menu.propTypes = {
  data: PropTypes.array,
};

export default Menu;
