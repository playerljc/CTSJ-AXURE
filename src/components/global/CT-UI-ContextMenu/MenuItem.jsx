import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SubMenu from './SubMenu';
import { ProviderContext } from './ContextMenuContext';

import './MenuItem.less';

const selectorPrefix = 'CT-UI-ContextMenu-MenuItem';

/**
 * MenuItem
 * @class MenuItem
 * @classdesc MenuItem
 */
class MenuItem extends React.PureComponent {
  onClick = (e) => {
    e.stopPropagation();
    const {
      data: {
        id,
        attribute,
        children,
        disabled,
      },
    } = this.props;

    const { handler } = this.config;

    if (disabled || children.length > 0) return false;

    if (handler) {
      handler(id, attribute);
      ReactDOM.unmountComponentAtNode(this.el);
    }
  };

  render() {
    const {
      data: {
        name,
        icon,
        separation,
        children,
        disabled = false,
      },
    } = this.props;

    return (
      <ProviderContext.Consumer>{({ config, el }) => {
        this.config = config;
        this.el = el;
        return (
          separation ?
            <li className={`${selectorPrefix}-Separation`} /> :
            <li
              className={`${selectorPrefix} ${disabled ? 'disabled' : ''}`}
              onClick={this.onClick}
            >
              <span className={`${selectorPrefix}-Icon fa fa-${icon}`} />
              <span className={`${selectorPrefix}-Name`}>{name}</span>
              {children.length !== 0 ? <span className={`${selectorPrefix}-More fa fa-caret-right`} /> : null}
              {children.length !== 0 ? <SubMenu data={children} /> : null}
            </li>
        );
      }}
      </ProviderContext.Consumer>
    );
  }
}

MenuItem.propTypes = {
  data: PropTypes.object,
};

export default MenuItem;
