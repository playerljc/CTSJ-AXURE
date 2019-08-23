import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { TabContext } from './Context';
import './Tab.less';

const selectorPrefix = 'AX-Tab';

/**
 * Tab
 * @class Tab
 * @classdesc Tab
 */
class Tab extends React.Component {
  constructor(props) {
    super(props);

    const { defaultActiveKey, activeKey } = this.props;
    this.state = {
      activeKey: defaultActiveKey || activeKey,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activeKey } = this.props;
    if (nextProps.activeKey !== activeKey) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    }
  }

  onTabItemClick(key) {
    const { onChange } = this.props;
    this.setState({
      activeKey: key,
    }, () => {
      if (onChange) {
        onChange(key);
      }
    });
  }

  onTabRemove(key) {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove(key);
    }
  }

  assignChildren() {
    let { children } = this.props;
    children = children.map((t) => {
      const Props = Object.assign({}, t.props, { code: t.key });
      return Object.assign({}, t, { props: Props });
    });
    return children;
  }

  renderBar() {
    const { children = [], canRemove = true } = this.props;
    const { activeKey } = this.state;
    return children.map((t) => {
      const { key, props: { name } } = t;
      return (
        <div
          key={uuidv1()}
          className={`${selectorPrefix}-Bar-Item ${key === activeKey ? 'Active' : ''}`}
          onClick={() => {
            this.onTabItemClick(key);
          }}
        >
          <div className={`${selectorPrefix}-Bar-Item-Inner`}>{name}</div>
          {canRemove ? (
            <span
              className={`${selectorPrefix}-Bar-Item-Trigger fa fa-close`}
              onClick={(e) => {
                e.stopPropagation();
                this.onTabRemove(key);
              }}
            />
          ) : null }
        </div>
      );
    });
  }

  render() {
    const { className = '' } = this.props;
    let { children } = this.props;
    children = this.assignChildren();

    return (
      <TabContext.Provider value={this.state}>
        <div className={`${selectorPrefix} ${className}`}>
          <div className={`${selectorPrefix}-Bar`}>
            <div className={`${selectorPrefix}-Bar-Inner`}>
              {this.renderBar()}
            </div>
            <div className={`${selectorPrefix}-Bar-Trigger`} >
              <span className="fa fa-caret-down" />
            </div>
          </div>

          <div className={`${selectorPrefix}-Content`}>
            {children}
          </div>
        </div>
      </TabContext.Provider>
    );
  }
}

Tab.defaultProps = {
  className: '',
  defaultActiveKey: '',
  activeKey: '',
  canRemove: true,
  onChange: () => {},
  onRemove: () => {},
};

Tab.propTypes = {
  className: PropTypes.string,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  canRemove: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default Tab;
