import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './IconTool.less';

/**
 * IconTool
 * @class IconTool
 * @classdesc IconTool
 */
class IconTool extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      attribute: { value },
    } = this.props;

    return (
      <>
        <div className={`${selectorPrefix}-icons-Icon`}>
          <i className={`fas fa-${value}`} />
        </div>
      </>
    );
  }
}

IconTool.defaultProps = {
  selectorPrefix: '',
};

IconTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(IconTool, {
  groupKey: 'icons',
  componentKey: 'Icon',
});
