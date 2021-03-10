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
      <>
        <div className={`${selectorPrefix}-base-linkbutton`}>BUTTON</div>
      </>
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
