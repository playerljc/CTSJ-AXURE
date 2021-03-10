import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './VlineTool.less';

/**
 * VlineTool
 * @class VlineTool
 * @classdesc VlineTool
 */
class VlineTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-vline`}>
          <span className={`${selectorPrefix}-base-vline-inner`} />
        </div>
      </>
    );
  }
}

VlineTool.defaultProps = {
  selectorPrefix: '',
};

VlineTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(VlineTool, {
  groupKey: 'base',
  componentKey: 'Vline',
});
