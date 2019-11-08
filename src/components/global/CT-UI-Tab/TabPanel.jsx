import React from 'react';
import PropTypes from 'prop-types';
import { TabContext } from './Context';
import './TabPanel.less';

const selectorPrefix = 'CT-UI-Tab-Panel';

/**
 * TabPanel
 * @class TabPanel
 * @classdesc TabPanel
 */
class TabPanel extends React.PureComponent {
  render() {
    const { className = '', code = '', children } = this.props;
    return (
      <TabContext.Consumer>
        {({ activeKey = '' }) => {
          return (
            <div className={`${selectorPrefix} ${className} ${activeKey === code ? 'Active' : ''}`}>
              {children}
            </div>
          );
        }}
      </TabContext.Consumer>
    );
  }
}

TabPanel.defaultProps = {
  className: '',
  code: '',
  name: '',
};

TabPanel.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default TabPanel;
