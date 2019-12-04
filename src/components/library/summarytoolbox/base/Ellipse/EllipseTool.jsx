import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './EllipseTool.less';

/**
 * Ellipse
 * @class EllipseTool
 * @classdesc Ellipse
 */
class EllipseTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-Ellipse`} />
      </React.Fragment>
    );
  }
}

EllipseTool.defaultProps = {
  selectorPrefix: '',
};

EllipseTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(EllipseTool, {
  groupKey: 'base',
  componentKey: 'Ellipse',
});
