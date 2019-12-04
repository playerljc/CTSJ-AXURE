import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './LinkButtonTool.less';

/**
 * LinkyButtonTool
 * @class LinkyButtonTool
 * @classdesc LinkyButtonTool
 */
class LinkyButtonTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-linkbutton`}>BUTTON</div>
      </React.Fragment>
    );
  }
}

LinkyButtonTool.defaultProps = {
  selectorPrefix: '',
};

LinkyButtonTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(LinkyButtonTool, {
  groupKey: 'base',
  componentKey: 'LinkButton',
});
