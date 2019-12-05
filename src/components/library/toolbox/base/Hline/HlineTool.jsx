import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './HlineTool.less';

/**
 * HlineTool
 * @class HlineTool
 * @classdesc HlineTool
 */
class HlineTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-hline`}>
          <span className={`${selectorPrefix}-base-hline-inner`} />
        </div>
      </React.Fragment>
    );
  }
}

HlineTool.defaultProps = {
  selectorPrefix: '',
};

HlineTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(HlineTool, {
  groupKey: 'base',
  componentKey: 'Hline',
});
